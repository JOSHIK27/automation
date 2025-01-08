import os
from pymongo import MongoClient  # type: ignore

client = MongoClient(os.environ["MONGO_URI"])
