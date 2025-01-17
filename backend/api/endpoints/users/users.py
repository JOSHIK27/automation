from fastapi import APIRouter # type: ignore
from backend.schemas.users import User
from backend.celery_config import celery_app
from backend.tasks import generate_image_task
from ....db.db import client
from bson.objectid import ObjectId # type: ignore



router = APIRouter() 

@router.post("/user")
def add_user(user: User):
    db = client["core"]
    users_collection = db["users"]
    user_id = users_collection.find_one({"email": user.email})
    if user_id:
        return {"message": "User already exists", "user_id": str(user_id["_id"])}   
    user_id = users_collection.insert_one(user.model_dump()).inserted_id
    return {"message": "SUCCESS", "user_id": str(user_id)}
 

@router.get("/user-stats")
def get_user_stats(email: str):
    db = client["core"]
    users_collection = db["users"]
    user_stats = users_collection.find_one({"email": email})
    workflows = list(db["workflows"].find({"user_id": str(ObjectId(user_stats["_id"])) }))
    totalWorkflows = 0
    activeWorkflows = 0
    tasksCompleted = 0
    for workflow in workflows:
        if workflow["running"] == True:
            activeWorkflows += 1
        totalWorkflows += 1
        tasksCompleted += 1

    return {"totalWorkflows": totalWorkflows, "activeWorkflows": activeWorkflows, "tasksCompleted": tasksCompleted, "subscriptionPlan": "free"}
