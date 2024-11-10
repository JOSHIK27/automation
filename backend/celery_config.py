import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv()

CELERY_BROKER_URL = os.environ['CELERY_BROKER_URL']

celery_app = Celery('tasks',
                    broker=CELERY_BROKER_URL,
                    broker_use_ssl={
                        'ssl_cert_reqs': None  # Required for Upstash
                    })

celery_app.conf.update(
    task_serializer='json',
    result_serializer='json',
    accept_content=['json'],
    timezone='UTC',
    enable_utc=True,
)