from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.api.endpoints.users import router as users_router
from backend.api.endpoints.webhooks import router as webhooks_router
from backend.api.endpoints.corefeatures import router as core_features
from backend.utils.jwt_utils import decode_jwe
from pymongo import MongoClient
import os
from .dependencies import limiter
from slowapi.errors import RateLimitExceeded  
from slowapi import _rate_limit_exceeded_handler

app = FastAPI()

app.include_router(users_router)
app.include_router(webhooks_router)
app.include_router(core_features)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = ["*"] 


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(os.getenv("MONGO_URI"))



# @app.middleware("http")
# async def authenticate_user(request: Request, call_next):
#     try:
#         auth_header = request.headers.get("Authorization")
#         if not auth_header:
#             return JSONResponse(status_code=401, content={"message": "Unauthorised"})
            
#         token = auth_header.split(" ")[1]
        
#         decoded = decode_jwe(token, os.getenv("JWE_SECRET"))
#         if not decoded:
#             return JSONResponse(status_code=401, content={"message": "Invalid token"})
#         return await call_next(request)
#     except Exception as e:
#         return JSONResponse(status_code=401, content={"message": str(e)})
    





