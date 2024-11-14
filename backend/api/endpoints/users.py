from fastapi import APIRouter
from backend.schemas.users import User
from sqlmodel import Session
from backend.db.db import engine
from backend.models.user import User as UserModal
from backend.celery_config import celery_app
from backend.tasks import generate_image_task

router = APIRouter() 

@router.get("/")
def sample():
    return {"message": "Hello World"}

@router.post("/user")
def addUser(user: User):
    new_user = UserModal(**user.model_dump())
    with Session(engine) as session:
        session.add(new_user)
        session.commit()
    return {"message": "Success"}
 

@router.post("/generate-image")
def generate_image_handler(prompt: str):
    result = generate_image_task.delay(prompt)
    return {"message": "Task started", "task_id": result.id}

@router.get("/generate-image/{task_id}")
def get_generate_image_handler(task_id: str):
    result = celery_app.AsyncResult(task_id)
    return {"status": result.status, "result": result.result}