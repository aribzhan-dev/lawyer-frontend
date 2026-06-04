from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import AsyncSessionLocal
from app.core.security import get_password_hash
from app.models import AdminUser, Lawyer, Service  # noqa: F401 — register metadata

logger = logging.getLogger(__name__)


async def create_first_admin() -> None:
    """Create the initial admin user on first startup if none exists."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(AdminUser).limit(1))
        if result.scalar_one_or_none() is None:
            admin = AdminUser(
                email=settings.FIRST_ADMIN_EMAIL,
                hashed_password=get_password_hash(settings.FIRST_ADMIN_PASSWORD),
                is_active=True,
            )
            session.add(admin)
            await session.commit()
            logger.info("First admin user created: %s", settings.FIRST_ADMIN_EMAIL)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan: runs setup on startup, cleanup on shutdown."""
    await create_first_admin()
    yield


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
        docs_url=f"{settings.API_V1_PREFIX}/docs",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    @app.get("/health", tags=["Health"])
    async def health() -> dict:
        return {"status": "ok", "service": settings.PROJECT_NAME}

    return app


app = create_app()
