from fastapi import APIRouter
import requests
import os
from celery import chain
from ...tasks import generate_image_task
from ...tasks import generate_thumbnail
from ...celery_config import celery_app
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
    # Convert complex objects to simple dictionaries before processing
    trigger_data = dict(triggerState)
    actions_data = [dict(action) for action in actionsList]

    response = []
    for action in actions_data:
        print(action['actionType'])
        if action['actionType'] == 'Generate thumbnail':
            task_id = generate_thumbnail.delay(action["thumbnailPrompt"])
            response.append({
                "task_id": str(task_id),  # Ensure task_id is serializable
                "cardId": action["cardId"],
                "status": "PENDING"
            })

    return {"response": response}



@router.get("/result/{task_id}")
async def get_result(task_id: str):
    result = celery_app.AsyncResult(task_id)
    if result.state == "PENDING":
        return {"status": "PENDING"}
    elif result.state == "SUCCESS":
        return {"status": "SUCCESS", "result": result.result}
    else:
        return {"status": f"Task failed or has an unknown state: {result.state}"}
    
