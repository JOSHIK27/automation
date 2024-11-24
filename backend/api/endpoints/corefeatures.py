from fastapi import APIRouter
import requests
import os

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