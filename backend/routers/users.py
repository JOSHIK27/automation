from fastapi import APIRouter
from ..schemas.users import User
from sqlmodel import Session
from ..db.db import engine
from ..models.user import User as UserModal


router = APIRouter()

@router.post("/user")
def addUser(user: User):
    new_user = UserModal(**user.model_dump())
    with Session(engine) as session:
        session.add(new_user)
        session.commit()
    return {"message": "Success"}
 