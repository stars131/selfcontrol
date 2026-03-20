from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, records, search, workspaces
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
app.include_router(search.router, prefix="/api/v1/workspaces", tags=["search"])
