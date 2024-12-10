from fastapi import APIRouter
import requests
import os
from celery import chain
from ...tasks import generate_image_task
from googleapiclient.discovery import build
router = APIRouter()

api_key = os.getenv("DUMPLING_API_KEY")

@router.get("/generate-transcript")
async def generatetranscript():

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    try:
        response = requests.post(
            "https://app.dumplingai.com/api/v1/get-youtube-transcript",
            headers=headers,
            json={
                "videoUrl": "https://www.youtube.com/watch?v=fBHhGqAmcWQ",
                "includeTimestamps": True,
                "language": "en"
            },
        )
        
        response.raise_for_status()
        
        transcript_data = response.json()
        return transcript_data
        
    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch transcript: {str(e)}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}
    

@router.get("/testing")
def testinghandler():

    chain(generate_image_task.s("Two men facing forward with their faces split down the middle, each side showing one man. The left man is an Indian male with a beard and sharp features, the right man is an East Asian male with short hair and rounder features. A dramatic background with glowing hues of green on the left and red on the right, creating a sense of intensity. The split between their faces looks like a cracked tear, adding a competitive and high-stakes vibe. Cinematic lighting with a bold focus on the faces, creating a sharp, high-contrast look"), task1.s()).apply_async()

    return {
        "message": "Tasks queued"
    }

@router.post("/trigger-workflow")
async def triggerworkflow(triggerState: dict, actionsList: list[dict]):
    print(triggerState)
    print(actionsList)  
    return {
        "message": "Workflow triggered"
    }

@router.get("/youtube")
def youtubehandler():

    service = build("youtube", "v3", developerKey = os.getenv("YOUTUBE_DATA_API_KEY"))

    response = service.channels().list(part = "contentDetails", id = "UCWX0cUR2rZcqKei1Vstww-A").execute()

    uploads_playlist_id = response['items'][0]['contentDetails']['relatedPlaylists']['uploads']

    video_titles = []
    next_page_token = None
    
    while True:
        playlist_response = service.playlistItems().list(
            part='snippet',
            playlistId=uploads_playlist_id,
            maxResults=50,
            pageToken=next_page_token
        ).execute()
        
        for item in playlist_response['items']:
            video_titles.append(item['snippet']['title'])
        
        next_page_token = playlist_response.get('nextPageToken')
        if not next_page_token:
            break

    print(video_titles)
    return {
        "message": "Success"
    }