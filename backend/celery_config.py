from celery import Celery
from dotenv import load_dotenv  
import os
from celery.signals import after_task_publish, task_success, task_failure
from celery import signals
load_dotenv()

from backend.db.db import client

db = client["core"]


@after_task_publish.connect
def task_sent_handler(sender=None, headers=None, body=None, **kwargs):
    # information about task are located in headers for task messages
    # using the task protocol version 2.
    info = headers if 'task' in headers else body
    print('after_task_publish for task id {info[id]}'.format(
        info=info,
    ))

    

@task_success.connect
def task_success_handler(sender=None, result=None, **kwargs):
    try:
        print("Success signal received")
        print(f"Sender: {sender}")
        print(f"Result: {result}")
        print(f"Additional kwargs: {kwargs}")
    except Exception as e:
        print(f"Error in success handler: {e}")


@signals.task_prerun.connect
def task_prerun_handler(task_id, task, *args, **kwargs):
    print(f"Task about to run: {task_id}")

@signals.task_postrun.connect
def task_postrun_handler(task_id, task, *args, state=None, **kwargs):
    if state == "SUCCESS":
        print(f"Task completed: {task_id}, State: {state}")
        # Update task status in MongoDB
        db["task_status"].update_one(
            {"task_status": {"$elemMatch": {"task_id": task_id}}},
            {"$set": {"task_status.$.status": "SUCCESS"}}
        )
    else:
        print(f"Task failed: {task_id}")

@signals.task_failure.connect
def task_failure_handler(task_id, exception, traceback, *args, **kwargs):
    print(f"Task failed: {task_id}")
    print(f"Exception: {exception}")



# Use local Redis
REDIS_URL = os.getenv("CELERY_BROKER_URL")

celery_app = Celery(
    'backend',
    broker=REDIS_URL,
    include=["backend.tasks"]
)

celery_app.conf.result_backend = REDIS_URL

# Add these configurations
celery_app.conf.update(
    result_expires=86400,  # Results expire in 24 hour
    accept_content=['json'],
    task_serializer='json',
    result_serializer='json',
    broker_connection_retry_on_startup=True,
    task_track_started=True,
    task_ignore_result=False,
    worker_send_task_events=True,  # Add this
    task_send_sent_event=True,     # Add this
)

