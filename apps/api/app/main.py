from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.api.routes import audit_logs, auth, conversations, knowledge, media, notifications, provider_configs, public_shares, records, reminders, search, search_presets, share_links, timeline, workspaces
from app.core.config import ensure_runtime_directories, runtime_health_snapshot, settings, validate_runtime_settings
from app.db.session import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    validate_runtime_settings()
    ensure_runtime_directories()
    if settings.auto_create_tables:
        create_db_and_tables()
    app.state.runtime_health = runtime_health_snapshot()
    yield


def create_app() -> FastAPI:
    app = FastAPI(
        title="SelfControl API",
        version="0.1.0",
        description="Multi-modal memory system backend.",
        lifespan=lifespan,
    )

    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.allowed_hosts,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health() -> dict[str, object]:
        return runtime_health_snapshot()

    app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
    app.include_router(workspaces.router, prefix="/api/v1/workspaces", tags=["workspaces"])
    app.include_router(records.router, prefix="/api/v1/workspaces", tags=["records"])
    app.include_router(media.router, prefix="/api/v1/workspaces", tags=["media"])
    app.include_router(conversations.router, prefix="/api/v1/workspaces", tags=["conversations"])
    app.include_router(knowledge.router, prefix="/api/v1/workspaces", tags=["knowledge"])
    app.include_router(audit_logs.router, prefix="/api/v1/workspaces", tags=["audit-logs"])
    app.include_router(provider_configs.router, prefix="/api/v1/workspaces", tags=["provider-configs"])
    app.include_router(share_links.router, prefix="/api/v1/workspaces", tags=["share-links"])
    app.include_router(search_presets.router, prefix="/api/v1/workspaces", tags=["search-presets"])
    app.include_router(reminders.router, prefix="/api/v1/workspaces", tags=["reminders"])
    app.include_router(notifications.router, prefix="/api/v1/workspaces", tags=["notifications"])
    app.include_router(search.router, prefix="/api/v1/workspaces", tags=["search"])
    app.include_router(timeline.router, prefix="/api/v1/workspaces", tags=["timeline"])
    app.include_router(public_shares.router, prefix="/api/v1/shares", tags=["shares"])
    return app


app = create_app()
