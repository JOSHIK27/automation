from fastapi import APIRouter # type: ignore
from backend.schemas.users import User
from backend.celery_config import celery_app
from backend.tasks import generate_image_task
from ....db.db import client


router = APIRouter() 

@router.post("/user")
def add_user(user: User):
    db = client["core"]
    users_collection = db["users"]
    user_id = users_collection.find_one({"email": user.email})
    if user_id:
        return {"message": "User already exists", "user_id": str(user_id["_id"])}   
    user_id = users_collection.insert_one(user.model_dump()).inserted_id
    return {"message": "Success", "user_id": str(user_id)}
 

@router.post("/generate-image")
def generate_image_handler(prompt: str):
    result = generate_image_task.delay(prompt)
    return {"message": "Task started", "task_id": result.id}


@router.get("/generate-image/{task_id}")
def get_generate_image_handler(task_id: str):
    result = celery_app.AsyncResult(task_id)
    return {"status": result.status, "result": result.result}


