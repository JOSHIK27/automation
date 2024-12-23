from sqlmodel import create_engine
from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

engine = create_engine(os.environ["DATABASE_URL"])
client = MongoClient(os.environ["MONGO_URI"])
