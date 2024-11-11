from backend.celery_config import celery_app
import time
import requests
from dotenv import load_dotenv
import os

load_dotenv()


@celery_app.task
def generate_image_task(prompt: str):
    url = "https://api.ideogram.ai/generate"

    payload = { 
        "image_request": {
        "prompt": prompt,
        "aspect_ratio": "ASPECT_16_9",
            "model": "V_2",
            "magic_prompt_option": "AUTO"
        } 
    }
    headers = {
        "Api-Key": os.getenv("IDEOGRAM_API_KEY"),
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    return response.json()

