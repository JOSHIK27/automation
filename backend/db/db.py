import os
from pymongo import MongoClient  # type: ignore
from dotenv import load_dotenv # type: ignore

# Load environment variables from .env file
load_dotenv()

# Get MongoDB URI with error handling
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
