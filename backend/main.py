from typing import Union

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/webhook")
async def webhook_verify(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_topic: str = Query(None, alias="hub.topic")
):
    # Return the challenge code to verify the subscription

    print(hub_mode, hub_challenge, hub_topic)
    if hub_challenge:
        return int(hub_challenge)
    return {"message": "No challenge found"}


@app.post("/webhook")
async def webhook():
        
    return {"message": "Webhook received"}
