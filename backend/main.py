from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.users import router as users_router
from .routers.webhooks import router as webhooks_router
from .db.db import engine
from .models.user import User
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





# @app.get("/webhook")
# async def webhook_verify(
#     hub_mode: str = Query(None, alias="hub.mode"),
#     hub_challenge: str = Query(None, alias="hub.challenge"),
#     hub_topic: str = Query(None, alias="hub.topic")
# ):
#     # Return the challenge code to verify the subscription

#     print(hub_mode, hub_challenge, hub_topic)
#     if hub_challenge:
#         return int(hub_challenge)
#     return {"message": "No challenge found"}


# @app.post("/webhook")
# async def webhook():
#     return {"message": "Webhook received"}
