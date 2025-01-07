from fastapi import APIRouter, Query, Request, HTTPException # type: ignore
from xml.etree import ElementTree as ET
from io import BytesIO
from backend.schemas.users import SubscriptionRequest
import httpx # type: ignore

router = APIRouter()


@router.get("/webhook")
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




@router.post("/subscribe")
async def subscribe_to_channel(request: SubscriptionRequest):
    
    PUBSUB_HUB_URL = "https://pubsubhubbub.appspot.com/subscribe"
    payload = {
        "hub.mode": "subscribe",
        "hub.topic": f"https://www.youtube.com/xml/feeds/videos.xml?channel_id={request.channel_id}",
        "hub.callback": request.callback_url,
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
        print(video_data)
        return video_data
    
    return {"message": "No video entry found"}
