from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


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


def validate_runtime_settings() -> None:
    if settings.app_env == "production":
        if settings.secret_key == "change-me" or len(settings.secret_key) < 24:
            raise RuntimeError("Production requires a strong SECRET_KEY environment variable")
