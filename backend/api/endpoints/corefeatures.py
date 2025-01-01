from fastapi import APIRouter
import requests
import os
from celery import chain
from ...tasks import generate_image_task
from ...tasks import generate_thumbnail
from ...tasks import generate_content_ideas
from ...celery_config import celery_app
from keybert import KeyBERT
from ...schemas.users import WorkflowPayload
from ...db.db import client
from datetime import datetime
from fastapi import status
from fastapi import Request
from backend.dependencies import limiter
import resend
from typing import Dict, Optional
from ...schemas.users import UpdateWorkflowPayload
from bson.objectid import ObjectId
router = APIRouter()

resend.api_key = os.getenv("RESEND_API_KEY")

@router.get("/send-mail")
def send_mail() -> Dict:
    params: resend.Emails.SendParams = {
        "from": "creatorstream@resend.dev",
        "to": ["joshikroshan4021@gmail.com"],
        "subject": "Woahhh!! Here are your workflow results",
        "html": "<strong>it works!</strong>",
    }
    email: resend.Email = resend.Emails.send(params)
    return email


api_key = os.getenv("DUMPLING_API_KEY")

@router.get("/generate-transcript")
@limiter.limit("5/minute")
async def generatetranscript(request: Request):

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    try:
        response = requests.post(
            "https://app.dumplingai.com/api/v1/get-youtube-transcript",
            headers=headers,
            json={
                "videoUrl": "https://www.youtube.com/watch?v=fBHhGqAmcWQ",
                "includeTimestamps": True,
                "language": "en"
            },
        )
        
        response.raise_for_status()
        
        transcript_data = response.json()
        return transcript_data
        
    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch transcript: {str(e)}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}
    


@router.post("/trigger-workflow")
async def triggerworkflow(triggerState: dict, actionsList: list[dict]):
    # Convert complex objects to simple dictionaries before processing
    trigger_data = dict(triggerState)
    actions_data = [dict(action) for action in actionsList]

    response = []
    for action in actions_data:
        print(action['actionType'])
        if action['actionType'] == 'Generate thumbnail':
            task_id = generate_image_task.delay(action["thumbnailPrompt"])
            response.append({
                "task_id": str(task_id),  # Ensure task_id is serializable
                "cardId": action["cardId"],
                "status": "PENDING"
            })
        elif action['actionType'] == 'Analyse my channel videos and generate ideas':
            task_id = generate_content_ideas.delay(trigger_data["triggerInput"])
            response.append({
                "task_id": str(task_id),  # Ensure task_id is serializable
                "cardId": action["cardId"],
                "status": "PENDING"
            })
    return response



@router.get("/result/{task_id}")
async def get_result(task_id: str):
    result = celery_app.AsyncResult(task_id)
    print(result.result)
    if result.state == "PENDING":
        return {"status": "PENDING"}
    elif result.state == "SUCCESS":
        return {"status": "SUCCESS", "result": result.result}
    else:
        return {"status": f"Task failed or has an unknown state: {result.state}"}
    

@router.post("/generate-seo-optimised-keywords")
@limiter.limit("5/minute")
def generatekeywords(request: Request, textContent: str):

    kw_model = KeyBERT()

    keywords = kw_model.extract_keywords(textContent, keyphrase_ngram_range=(1, 2), stop_words=None)

    print(keywords)

    return {
        "message": "Success"
    }

@router.post("/save-workflow", status_code=status.HTTP_201_CREATED)
async def saveworkflow(request: WorkflowPayload):
    print(f"user_id={request.user_id}", f"nodes={request.nodes}", f"edges={request.edges}")
    
    db = client["core"]
    workflows_collection = db["workflows"]
    nodes_collection = db["nodes"]
    edges_collection = db["edges"]
    
    workflow_doc = {
        "user_id": request.user_id,
        "name": request.name,
        "description": request.description,
        "created_at": datetime.utcnow()
    }
    
    workflow_result = workflows_collection.insert_one(workflow_doc)
    
    if request.nodes:
        nodes_data = [node.model_dump() for node in request.nodes]
        for node in nodes_data:
            node["workflow_id"] = str(workflow_result.inserted_id)
        nodes_collection.insert_many(nodes_data)

    if request.edges:
        edges_data = [edge.model_dump() for edge in request.edges]
        for edge in edges_data:
            edge["workflow_id"] = str(workflow_result.inserted_id)
        edges_collection.insert_many(edges_data)
    
    return {
        "message": "Workflow saved successfully",
        "workflow_id": str(workflow_result.inserted_id)
    }


@router.put("/update-workflow", status_code=200)
def updateworkflow(request: UpdateWorkflowPayload):
    db = client["core"]
    workflows_collection = db["workflows"]
    nodes_collection = db["nodes"]
    edges_collection = db["edges"]

    # Delete existing nodes and edges for this workflow
    nodes_collection.delete_many({"workflow_id": request.workflow_id})
    edges_collection.delete_many({"workflow_id": request.workflow_id})
    
    # Update workflow details
    workflows_collection.update_one(
        {"_id": ObjectId(request.workflow_id)},
        {"$set": {
            "name": request.name,
            "description": request.description,
            "updated_at": datetime.utcnow()
        }}
    )
    
    # Insert new nodes
    if request.nodes:
        nodes_data = [node.model_dump() for node in request.nodes]
        for node in nodes_data:
            node["workflow_id"] = request.workflow_id
        nodes_collection.insert_many(nodes_data)

    # Insert new edges
    if request.edges:
        edges_data = [edge.model_dump() for edge in request.edges]
        for edge in edges_data:
            edge["workflow_id"] = request.workflow_id
        edges_collection.insert_many(edges_data)

    return {
        "message": "Workflow updated successfully"
    }

@router.get("/workflow-history/{userId}", status_code = 200)
def workflowhistory(userId: str, workflowId: Optional[str] = None):

    db = client["core"]
    workflows_collection = db["workflows"]
    nodes_collection = db["nodes"]
    edges_collection = db["edges"]

    print(userId)

    workflows = list(workflows_collection.find({"user_id": userId}))
    print(workflows) 
    workflow_history = []

    for workflow in workflows:
        if workflowId == None:
            workflow_id = str(workflow["_id"])
            nodes = list(nodes_collection.find({"workflow_id": workflow_id}))
            edges = list(edges_collection.find({"workflow_id": workflow_id}))

            # Clean up nodes
            for node in nodes:
                node["_id"] = str(node["_id"])  # Convert ObjectId to string
                del node["_id"]  # Remove _id
                del node["workflow_id"]  # Remove workflow_id

            # Clean up edges
            for edge in edges:
                edge["_id"] = str(edge["_id"])  # Convert ObjectId to string
                del edge["_id"]  # Remove _id
                del edge["workflow_id"]  # Remove workflow_id

            workflow_history.append({
                "name": workflow["name"],
                "description": workflow["description"],
                "created_at": workflow["created_at"],
                "workflow_id": workflow_id,
                "nodes": nodes,
                "edges": edges
            })
        elif workflowId == str(workflow["_id"]):
            workflow_id = str(workflow["_id"])
            nodes = list(nodes_collection.find({"workflow_id": workflow_id}))
            edges = list(edges_collection.find({"workflow_id": workflow_id}))

            # Clean up nodes
            for node in nodes:
                node["_id"] = str(node["_id"])  # Convert ObjectId to string
                del node["_id"]  # Remove _id
                del node["workflow_id"]  # Remove workflow_id


            # Clean up edges
            for edge in edges:
                edge["_id"] = str(edge["_id"])  # Convert ObjectId to string
                del edge["_id"]  # Remove _id
                del edge["workflow_id"]  # Remove workflow_id

            workflow_history.append({
                "name": workflow["name"],
                "description": workflow["description"],
                "created_at": workflow["created_at"],
                "workflow_id": workflow_id,
                "nodes": nodes,
                "edges": edges
            })

    return {
        "workflow_history": workflow_history
    }