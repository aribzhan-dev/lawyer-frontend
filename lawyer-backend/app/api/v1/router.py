from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.lawyers import router as lawyers_router
from app.api.v1.services import router as services_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(lawyers_router)
api_router.include_router(services_router)
