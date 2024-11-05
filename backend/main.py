from fastapi import FastAPI
from routers import users, webhooks

app = FastAPI()

app.include_router(users.router)
app.include_router(webhooks.router)




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
