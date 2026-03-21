from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import audit_logs, auth, conversations, knowledge, media, notifications, provider_configs, public_shares, records, reminders, search, share_links, workspaces
from app.core.config import settings
from app.db.session import create_db_and_tables


app = FastAPI(
    title="SelfControl API",
    version="0.1.0",
    description="Multi-modal memory system backend.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    if settings.auto_create_tables:
        create_db_and_tables()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(workspaces.router, prefix="/api/v1/workspaces", tags=["workspaces"])
app.include_router(records.router, prefix="/api/v1/workspaces", tags=["records"])
app.include_router(media.router, prefix="/api/v1/workspaces", tags=["media"])
app.include_router(conversations.router, prefix="/api/v1/workspaces", tags=["conversations"])
app.include_router(knowledge.router, prefix="/api/v1/workspaces", tags=["knowledge"])
app.include_router(audit_logs.router, prefix="/api/v1/workspaces", tags=["audit-logs"])
app.include_router(provider_configs.router, prefix="/api/v1/workspaces", tags=["provider-configs"])
app.include_router(share_links.router, prefix="/api/v1/workspaces", tags=["share-links"])
app.include_router(reminders.router, prefix="/api/v1/workspaces", tags=["reminders"])
app.include_router(notifications.router, prefix="/api/v1/workspaces", tags=["notifications"])
app.include_router(search.router, prefix="/api/v1/workspaces", tags=["search"])
app.include_router(public_shares.router, prefix="/api/v1/shares", tags=["shares"])
