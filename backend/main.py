from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.endpoints.users import router as users_router
from backend.api.endpoints.webhooks import router as webhooks_router
from backend.db.db import engine
from sqlmodel import SQLModel


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(webhooks_router)


SQLModel.metadata.create_all(engine)


