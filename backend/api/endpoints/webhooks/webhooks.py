from fastapi import APIRouter, Query, Request, HTTPException # type: ignore
from xml.etree import ElementTree as ET
from io import BytesIO
from backend.schemas.users import SubscriptionRequest
import httpx # type: ignore
from backend.db.db import client
from backend.api.endpoints.websocket.websocket import get_connected_clients
from bson.objectid import ObjectId
from backend.tasks import generate_seo_title, generate_seo_keywords, generate_summary, generate_timestamps
import asyncio
import os
router = APIRouter()
db = client["core"]

@router.get("/webhook")
async def webhook_verify(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_topic: str = Query(None, alias="hub.topic")
):
    # Return the challenge code to verify the subscription
    if hub_challenge:
        return int(hub_challenge)
    return {"message": "No challenge found"}




@router.post("/subscribe")
async def subscribe_to_channel(request: SubscriptionRequest):

    PUBSUB_HUB_URL = "https://pubsubhubbub.appspot.com/subscribe"
    payload = {
        "hub.mode": "subscribe",
        "hub.topic": f"https://www.youtube.com/xml/feeds/videos.xml?channel_id={request.channel_id}",
        "hub.callback": f"{os.getenv('API_URL')}/webhook",
        "hub.verify": "async",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(PUBSUB_HUB_URL, data=payload)

    if response.status_code == 202:
        return {"message": "Subscribed successfully!"}
    else:
        raise HTTPException(status_code=response.status_code, detail=f"Subscription failed: {response.text}")


@router.post("/webhook")
async def webhook(request: Request):
    body = await request.body()
    
    # Parse XML content
    tree = ET.parse(BytesIO(body))
    root = tree.getroot()
    
    # Extract namespace for proper tag parsing
    ns = {'atom': 'http://www.w3.org/2005/Atom',
          'yt': 'http://www.youtube.com/xml/schemas/2015'}
    
    # Extract video information from the entry
    entry = root.find('atom:entry', ns)
    if entry:
        video_data = {
            'video_id': entry.find('yt:videoId', ns).text,
            'channel_id': entry.find('yt:channelId', ns).text,
            'title': entry.find('atom:title', ns).text,
            'author': entry.find('atom:author/atom:name', ns).text,
            'published': entry.find('atom:published', ns).text,
            'link': entry.find('atom:link', ns).get('href')
        }

        connected_clients = get_connected_clients()

        to_be_processed_workflows = list(db.postproduction_workflow_information.find({
            "channel_id": video_data["channel_id"]
        }))

        for workflow in to_be_processed_workflows:
            workflow_id = workflow["workflow_id"]
            user_id = db.workflows.find_one({
                "_id": ObjectId(workflow_id)
            })["user_id"]


            if workflow["trigger_data"]["channelId"] == video_data["channel_id"]:
                
                actions_data = workflow["actions_data"]

                response = []
                client_state = []
                for action in actions_data:
                    client_state.append({
                        "id": action["cardId"],
                        "startFetching": True
                    })
                    if action["actionType"] == "Generate summary":
                        task_id = generate_summary.delay(video_data["link"])
                        response.append({
                            "task_id": str(task_id),
                            "cardId": action["cardId"],
                            "status": "PENDING"
                        })
                    # elif action["actionType"] == "Generate captions":
                    #     task_id = generate_captions.delay(action["input"])
                    #     response.append({
                    #         "task_id": str(task_id),
                    #         "cardId": action["cardId"],
                    #         "status": "PENDING"
                    #     })
                    elif action["actionType"] == "Generate timestamps":
                        task_id = generate_timestamps.delay(video_data["link"])
                        response.append({
                            "task_id": str(task_id),
                            "cardId": action["cardId"],
                            "status": "PENDING"
                        })
                    elif action["actionType"] == "Generate SEO optimized title":
                        task_id = generate_seo_title.delay(video_data["link"])
                        response.append({
                            "task_id": str(task_id),
                            "cardId": action["cardId"],
                            "status": "PENDING"
                        })
                    elif action["actionType"] == "Generate SEO optimized description":
                        task_id = generate_seo_keywords.delay(video_data["link"])
                        response.append({
                            "task_id": str(task_id),
                            "cardId": action["cardId"],
                            "status": "PENDING"
                        })
                    elif action["actionType"] == "Generate SEO optimized keywords":
                        task_id = generate_seo_keywords.delay(video_data["link"])
                        response.append({
                            "task_id": str(task_id),
                            "cardId": action["cardId"],
                            "status": "PENDING"
                        })
                
                db.task_status.update_one(
                    {"workflow_id": workflow_id},
                    {
                        "$set": {
                            "task_status": [{
                                "task_id": item["task_id"],
                                "status": "PENDING",
                                "cardId": item["cardId"]
                            } for item in response]
                        }
                    },
                    upsert=True
                )

                if user_id in connected_clients:
                    await connected_clients[user_id].send_json({"workflow_id": workflow_id, "client_state": client_state})

        return response
    

    

    
    return {"message": "No video entry found"}
