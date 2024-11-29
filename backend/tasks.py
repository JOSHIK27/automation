from backend.celery_config import celery_app
import requests
import json
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

    response = requests.post(url, json=payload, headers=headers).json()
    print(response)

    return {
        "url": response["data"][0]["url"]
    }


@celery_app.task
def generate_thumbnail(prompt: str):

    url = "https://api.piapi.ai/api/v1/task"

    payload = json.dumps({
        "model": "midjourney",
        "task_type": "imagine",
        "input": {
            "prompt": prompt,
            "aspect_ratio": "16:9",
            "process_mode": "fast",
            "skip_prompt_check": False,
            "bot_id": 0
        },
        "config": {
            "service_mode": "",
            "webhook_config": {
                "endpoint": "https://webhook.site/",
                "secret": "123456"
            }
        }
    })

    headers = {
        'x-api-key': os.getenv("PIAPI_API_KEY"),
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)



@celery_app.task
def swap_face(target_image_url: str, source_image_url: str):

    url = "https://api.piapi.ai/api/v1/task"

    payload = json.dumps({
        "model": "Qubico/image-toolkit",
        "task_type": "face-swap",
        "input": {
            "target_image": target_image_url,
            "swap_image": source_image_url
        }
    })
    
    headers = {
        'x-api-key': os.getenv("PIAPI_API_KEY"),
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
