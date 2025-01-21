from fastapi import APIRouter, Request
from backend.dependencies import limiter
import requests
import os
from keybert import KeyBERT
from backend.celery_config import celery_app
from datetime import datetime

router = APIRouter()

api_key = os.getenv("DUMPLING_API_KEY")

@router.get("/generate-transcript")
@limiter.limit("5/minute")
async def generatetranscript(request: Request):

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
    


@router.post("/generate-seo-optimised-keywords")
@limiter.limit("5/minute")
def generatekeywords(request: Request, textContent: str):

    kw_model = KeyBERT()

    keywords = kw_model.extract_keywords(textContent, keyphrase_ngram_range=(1, 2), stop_words=None)

    return {
        "message": "Success"
    }

@router.get("/result/{task_id}")
async def get_result(task_id: str):
    result = celery_app.AsyncResult(task_id)
    print(result)
    actionType = ""
    if result.result:
        if "url" in result.result:
            actionType = "Generate thumbnail"
        elif "content_ideas" in result.result:
            actionType = "Analyse my channel videos and generate ideas"
        elif "transcript" in result.result:
            actionType = "Generate transcript"
        elif "summary" in result.result:
            actionType = "Generate summary"
        elif "timestamps" in result.result:
            actionType = "Generate timestamps"
        elif "keywords" in result.result:
            actionType = "Generate SEO optimized keywords"
        elif "titles" in result.result:
            actionType = "Generate SEO optimized titles"
    else:
        return {"status": "EXPIRED", "actionType": actionType}

    if result.state != "SUCCESS":
        return {"status": "PENDING", "actionType": actionType}
    else:
        return {"status": "SUCCESS", "result": result.result, "actionType": actionType}
    # else:
    #     return {"status": f"Task failed or has an unknown state: {result.state}"}
    