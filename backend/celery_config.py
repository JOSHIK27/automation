from celery import Celery
from dotenv import load_dotenv  
import os

load_dotenv()

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
    result_expires=3600,  # Results expire in 1 hour
    accept_content=['json'],
    task_serializer='json',
    result_serializer='json',
    broker_connection_retry_on_startup=True,
)

