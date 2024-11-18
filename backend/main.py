from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.api.endpoints.users import router as users_router
from backend.api.endpoints.webhooks import router as webhooks_router
from backend.db.db import engine
from sqlmodel import SQLModel
from backend.utils.jwt_utils import decode_jwe
import os

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def authenticate_user(request: Request, call_next):
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return JSONResponse(status_code=401, content={"message": "Unauthorised"})
            
        token = auth_header.split(" ")[1]
        
        decoded = decode_jwe(token, os.getenv("JWE_SECRET"))
        if not decoded:
            return JSONResponse(status_code=401, content={"message": "Invalid token"})
        return await call_next(request)
    except Exception as e:
        return JSONResponse(status_code=401, content={"message": str(e)})
    


app.include_router(users_router)
app.include_router(webhooks_router)


SQLModel.metadata.create_all(engine)


