from fastapi import APIRouter, status # type: ignore
from backend.schemas.users import WorkflowPayload, UpdateWorkflowPayload
from backend.tasks import generate_image_task, generate_content_ideas
from ....db.db import client
from datetime import datetime
from bson.objectid import ObjectId # type: ignore
from typing import Optional


router = APIRouter()

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
            task_id = generate_content_ideas.delay(trigger_data["channelId"])
            response.append({
                "task_id": str(task_id), 
                "cardId": action["cardId"],
                "status": "PENDING"
            })
    return response


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
        "workflow_id": str(workflow_result.inserted_id),
        "name": request.name
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
        "message": "Workflow updated successfully",
        "workflow_id": request.workflow_id,
        "name": request.name
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