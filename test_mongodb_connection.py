import os
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

# Load environment variables from .env.local
from dotenv import load_dotenv
load_dotenv(dotenv_path='./.env.local')

# MongoDB connection URI
mongodb_uri = os.getenv('MONGODB_URI')
print("Using MongoDB URI:", mongodb_uri)  # Print the MongoDB URI for debugging

# Create a MongoDB client
client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=5000)

try:
    # Attempt to connect to the MongoDB server
    client.admin.command('ping')
    print("MongoDB connection successful!")
except ServerSelectionTimeoutError as err:
    print("MongoDB connection failed:", err)
finally:
    client.close()
