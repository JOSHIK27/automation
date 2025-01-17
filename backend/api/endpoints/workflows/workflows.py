from fastapi import APIRouter, status # type: ignore
from backend.schemas.users import WorkflowPayload, UpdateWorkflowPayload, TriggerWorkflowPayload
from backend.tasks import generate_image_task, generate_content_ideas
from ....db.db import client
from datetime import datetime
from bson.objectid import ObjectId # type: ignore
from typing import Optional
from backend.api.endpoints.webhooks.webhooks import subscribe_to_channel
from backend.schemas.users import UpdateTaskStatusPayload
from fastapi.responses import JSONResponse

router = APIRouter()
db = client["core"]

@router.post("/trigger-workflow")
async def triggerworkflow(request: TriggerWorkflowPayload):
    # Convert complex objects to simple dictionaries before processing
    trigger_data = dict(request.triggerState)
    actions_data = [dict(action) for action in request.actionsList]

    workflows_collection = db["workflows"]
    workflows_collection.update_one(
        {"_id": ObjectId(request.workflowId)},
        {
            "$inc": {"runs": 1},
            "$set": {"running": True}
        }
    )

    if(trigger_data["workflowType"] == "Post Production"):
        response = []
        db.postproduction_workflow_information.insert_one({
            "workflow_id": request.workflowId,
            "trigger_data": trigger_data,
            "actions_data": actions_data,
            "channel_id": trigger_data["channelId"],
            "status": "Yet to be processed"
        })
        for action in actions_data:
            response.append({
                "task_id": "",
                "cardId": action["cardId"],
                "status": "Yet to be processed"
            })
        db.task_status.insert_one({
            "workflow_id": request.workflowId,
            "task_status": response
        })
        return response
    
    else:
        response = []
        for action in actions_data:
            action["status"] = "PENDING"
            if action['actionType'] == 'Generate thumbnail':
                task_id = generate_image_task.delay(action["thumbnailPrompt"])
                response.append({
                    "task_id": str(task_id),
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
                
        db.preproduction_workflow_information.insert_one({
            "workflow_id": request.workflowId,
            "trigger_data": trigger_data,
            "actions_data": actions_data,
        })

        db.task_status.insert_one({
            "workflow_id": request.workflowId,
            "task_status": response
        })

        return response

    
    


@router.post("/save-workflow", status_code=status.HTTP_201_CREATED)
async def saveworkflow(request: WorkflowPayload):
    
    workflows_collection = db["workflows"]
    nodes_collection = db["nodes"]
    edges_collection = db["edges"]
    
    workflow_doc = {
        "user_id": request.user_id,
        "name": request.name,
        "description": request.description,
        "created_at": datetime.utcnow(),
        "runs": 0,
        "running": False
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

    workflows = list(workflows_collection.find({"user_id": userId}))
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
                "edges": edges,
                "runs": workflow["runs"],
                "running": workflow["running"]
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
                "edges": edges,
                "runs": workflow["runs"],
                "running": workflow["running"]
            })

    return {
        "workflow_history": workflow_history
    }

@router.post("/update-task-status", status_code=200)
async def update_task_status(request: UpdateTaskStatusPayload):
    db = client["core"]
    
    pre_workflow = db.preproduction_workflow_information.find_one(
        {"workflow_id": request.workflowId}
    )
    
    if pre_workflow:
        pre_workflow_actions = pre_workflow["actions_data"]
        for action in pre_workflow_actions:
            if action["cardId"] == request.cardId:
                action["status"] = "SUCCESS"
                break
        db.preproduction_workflow_information.update_one(
            {"workflow_id": request.workflowId},
            {"$set": {"actions_data": pre_workflow_actions}}
        )
    else:
        post_workflow = db.postproduction_workflow_information.find_one(
            {"workflow_id": request.workflowId}
        )
        post_workflow_actions = post_workflow["actions_data"]
        for action in post_workflow_actions:
            if action["cardId"] == request.cardId:
                action["status"] = "SUCCESS"
                break
        db.postproduction_workflow_information.update_one(
            {"workflow_id": request.workflowId},
            {"$set": {"actions_data": post_workflow_actions}}
        )

    return {"message": "Task status updated successfully"}


@router.get("/task-status/{workflowId}/{cardId}", status_code=200)
async def get_task_status(workflowId: str, cardId: str):

    if cardId == "1":
        return {"status": "SUCCESS"}
        
    db = client["core"]
    task_status = db.task_status.find_one({"workflow_id": workflowId})
    
    if task_status:
        for task in task_status["task_status"]:
            if task["cardId"] == cardId:
                return task
        
    return JSONResponse(status_code=404, content={"message": "Task not found"})
