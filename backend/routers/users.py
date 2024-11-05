from fastapi import APIRouter
from schemas.users import User

router = APIRouter()


@router.get("/user")
def sample():
    return {"message": "Success"}


@router.post("/user")
def sample2(user: User):
    print(user)
    return {"message": "Success"}