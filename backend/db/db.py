import os
from pymongo import MongoClient  # type: ignore
from dotenv import load_dotenv # type: ignore

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
