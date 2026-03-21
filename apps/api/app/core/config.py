from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


BASE_DIR = Path(__file__).resolve().parents[4]


def resolve_project_path(value: str) -> str:
    raw_path = Path(value)
    if raw_path.is_absolute():
        return str(raw_path.resolve())
    return str((BASE_DIR / raw_path).resolve())


@dataclass
class Settings:
    app_env: str = os.getenv("APP_ENV", "development")
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./selfcontrol.db")
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    secret_key: str = os.getenv("SECRET_KEY", "change-me")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))
    api_host: str = os.getenv("API_HOST", "0.0.0.0")
    api_port: int = int(os.getenv("API_PORT", "8000"))
    auto_create_tables: bool = os.getenv("AUTO_CREATE_TABLES", "true").lower() == "true"
    storage_dir: str = resolve_project_path(os.getenv("STORAGE_DIR", "storage/uploads"))
    media_processing_mode: str = os.getenv("MEDIA_PROCESSING_MODE", "sync").lower()
    embedding_provider: str = os.getenv("EMBEDDING_PROVIDER", "local")
    embedding_model: str = os.getenv("EMBEDDING_MODEL", "hash-embedding-v1")
    embedding_dimensions: int = int(os.getenv("EMBEDDING_DIMENSIONS", "256"))
    rag_chunk_size_chars: int = int(os.getenv("RAG_CHUNK_SIZE_CHARS", "700"))
    rag_chunk_overlap_chars: int = int(os.getenv("RAG_CHUNK_OVERLAP_CHARS", "120"))
    rag_search_limit: int = int(os.getenv("RAG_SEARCH_LIMIT", "8"))
    processing_tmp_dir: str = resolve_project_path(os.getenv("PROCESSING_TMP_DIR", "storage/tmp"))
    provider_request_timeout_seconds: int = int(os.getenv("PROVIDER_REQUEST_TIMEOUT_SECONDS", "90"))
    cors_origins: list[str] = field(
        default_factory=lambda: os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000",
        ).split(",")
    )


settings = Settings()


def ensure_runtime_directories() -> None:
    Path(settings.storage_dir).mkdir(parents=True, exist_ok=True)
    Path(settings.processing_tmp_dir).mkdir(parents=True, exist_ok=True)


def runtime_health_snapshot() -> dict[str, Any]:
    storage_dir = Path(settings.storage_dir)
    processing_tmp_dir = Path(settings.processing_tmp_dir)
    checks = {
        "storage_dir_exists": storage_dir.exists(),
        "processing_tmp_dir_exists": processing_tmp_dir.exists(),
        "redis_config_ok": bool(settings.redis_url) if settings.media_processing_mode == "async" else True,
        "secret_key_ok": not (
            settings.app_env == "production"
            and (settings.secret_key == "change-me" or len(settings.secret_key) < 24)
        ),
        "auto_create_tables_ok": not (settings.app_env == "production" and settings.auto_create_tables),
    }
    return {
        "status": "ok" if all(checks.values()) else "degraded",
        "ready": all(checks.values()),
        "app_env": settings.app_env,
        "media_processing_mode": settings.media_processing_mode,
        "auto_create_tables": settings.auto_create_tables,
        "storage_dir": str(storage_dir),
        "processing_tmp_dir": str(processing_tmp_dir),
        "redis_url_configured": bool(settings.redis_url),
        "checks": checks,
    }


def validate_runtime_settings() -> None:
    if settings.media_processing_mode not in {"sync", "async"}:
        raise RuntimeError("MEDIA_PROCESSING_MODE must be either 'sync' or 'async'")
    if settings.media_processing_mode == "async" and not settings.redis_url:
        raise RuntimeError("MEDIA_PROCESSING_MODE=async requires REDIS_URL")
    if settings.app_env == "production":
        if settings.secret_key == "change-me" or len(settings.secret_key) < 24:
            raise RuntimeError("Production requires a strong SECRET_KEY environment variable")
        if settings.auto_create_tables:
            raise RuntimeError("Production requires AUTO_CREATE_TABLES=false and managed migrations")
