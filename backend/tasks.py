from backend.celery_config import celery_app
import requests
import json
import os
from googleapiclient.discovery import build
from openai import OpenAI
from keybert import KeyBERT

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

@celery_app.task
def generate_summary():

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('DUMPLING_API_KEY')}"
    }
    
    response = requests.post("/api/v1/get-youtube-transcript", headers = headers , json= {
            "videoUrl": "string", 
            "includeTimestamps": "boolean",
            "timestampsToCombine": "number", 
            "preferredLanguage": "string" 
        }
    )


@celery_app.task
def generate_transcript():
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('DUMPLING_API_KEY')}"
    }
    
    response = requests.post("/api/v1/get-youtube-transcript", headers = headers , json= {
            "videoUrl": "string", 
            "includeTimestamps": "boolean",
            "timestampsToCombine": "number", 
            "preferredLanguage": "string" 
        }
    )

@celery_app.task
def generate_content_ideas(channel_id: str):

    service = build("youtube", "v3", developerKey = os.getenv("YOUTUBE_DATA_API_KEY"))

    response = service.channels().list(part = "contentDetails", id = channel_id).execute()

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

    openai_client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))
    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": f"You are an expert creative content creator who is known for innovation. I want you to give me 5 creative youtube video idea's based on my past video's on my youtube channel. Here's the list of titles of my videos: {video_titles}"
            }
        ]
    )

    return {
        "Content_Ideas": completion
    }

@celery_app.task
def generate_timestamps():
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('DUMPLING_API_KEY')}"
    }
    
    response = requests.post("/api/v1/get-youtube-transcript", headers = headers , json= {
            "videoUrl": "string", 
            "includeTimestamps": "boolean",
            "timestampsToCombine": "number", 
            "preferredLanguage": "string" 
        }
    )


@celery_app.task
def generate_seo_keywords(textContent: str):

    kw_model = KeyBERT()

    keywords = kw_model.extract_keywords(textContent, keyphrase_ngram_range=(1, 2), stop_words=None)

    return {
        keywords: keywords
    }

@celery_app.task
def generate_seo_title(transcript: str):

    openai_client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))

    prompt = f"""
    Create 5 SEO-optimized YouTube titles for the following video content:
    {transcript}
    Each title should:
    - Contain relevant keywords.
    - Be under 60 characters.
    - Be engaging and click-worthy.
    """

    completion = openai_client.chat.completions.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        temperature=0.7
    )

    return {
        "title": completion
    }
