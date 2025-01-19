from backend.celery_config import celery_app
import requests
import json
import os
from googleapiclient.discovery import build
from openai import OpenAI
from keybert import KeyBERT

dumpling_base_url = "https://app.dumplingai.com"

def generate_transcript(video_url: str):

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('DUMPLING_API_KEY')}"
    }

    transcript_response = requests.post(f"{dumpling_base_url}/api/v1/get-youtube-transcript", headers = headers , json= {
            "videoUrl": video_url, 
            "includeTimestamps": "true",
            "timestampsToCombine": "10", 
            "preferredLanguage": "en" 
        }
    )   
    transcript_data = transcript_response.json()
    return transcript_data


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



@celery_app.task
def generate_summary(video_url: str):
    transcript_data = generate_transcript(video_url)
    print(transcript_data)
    openai_client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))
    video_summary = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user", 
            "content": f"""
                Based on the following video transcript, generate a brief and engaging summary that highlights the main points and key takeaways. The summary should:
                - Be concise and no longer than 3-4 sentences
                - Clearly convey the core idea of the video
                - Be written in a tone suitable for YouTube video descriptions

                Here is the transcript:
                {transcript_data["transcript"]}
                """
        }],
    )
    

    return {
        "summary": video_summary.choices[0].message.content
    }


@celery_app.task
def generate_the_transcript(video_url: str):

    transcript = generate_transcript(video_url)

    return {
        "transcript": transcript
    }

@celery_app.task
def generate_content_ideas(channel_id: str):
    service = build("youtube", "v3", developerKey=os.getenv("YOUTUBE_DATA_API_KEY"))
    response = service.channels().list(part="contentDetails", id=channel_id).execute()
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
            {
                "role": "user",
                "content": f"""
                Analyze the following YouTube video titles and generate 5 new video ideas that are similar in theme or style. 
                The response must be returned as individual strings, one per line, with no additional text, code blocks, or formatting.

                Here are the previous video titles:
                {video_titles}
                """
            }
        ],
    )
    print(completion.choices[0].message.content)

    return {
        "content_ideas": completion.choices[0].message.content
    }


@celery_app.task
def generate_timestamps(video_url: str):

    transcript_data = generate_transcript(video_url)

    openai_client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))

    timestamps = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user", 
            "content": f"""
                Using the following video transcript, extract all timestamps paired with concise and descriptive titles (5-10 words). Each line should include:

                A timestamp in the mm:ss format
                A concise title summarizing a key moment

                Ensure each timestamp-title pair appears on a separate line.

                Here is the transcript:
                {transcript_data["transcript"]}
                """
            }],
    )

    return {
        "timestamps": timestamps.choices[0].message.content
    }


@celery_app.task
def generate_seo_keywords(video_url: str):
    transcript_data = generate_transcript(video_url)
    
    kw_model = KeyBERT()

    keywords = kw_model.extract_keywords(transcript_data["transcript"], keyphrase_ngram_range=(1, 2), stop_words=None)

    return {
        "keywords": keywords
    }
        

@celery_app.task
def generate_seo_title(video_url: str):

    transcript_data = generate_transcript(video_url)

    openai_client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))

    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": f"""
                Create 20 SEO-optimized YouTube titles for the following video content:
                {transcript_data["transcript"]}
                Each title should:
                - Contain relevant keywords
                - Be under 60 characters
                - Be engaging and click-worthy

                Return each title as a plain string on a separate line, with no additional text, code blocks, or formatting.
                """
            }
        ],
    )
    return {
        "titles": completion.choices[0].message.content
    }



