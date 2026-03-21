from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import provider_configs as provider_configs_route
from app.core.config import settings, validate_runtime_settings
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_provider_config_client(monkeypatch) -> tuple[TestClient, str]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        user = User(
            username="provider-owner",
            email="provider-owner@example.com",
            password_hash="test-hash",
            display_name="Provider Owner",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Provider Config Workspace",
            slug="provider-config-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.commit()
        user_id = user.id
        workspace_id = workspace.id

    monkeypatch.setattr(provider_configs_route, "log_audit_event", lambda *args, **kwargs: None)

    app = FastAPI()
    app.include_router(provider_configs_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        db = session_local()
        try:
            return db.get(User, user_id)
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user
    return TestClient(app), workspace_id


def test_provider_config_exposes_sanitized_secret_status(monkeypatch) -> None:
    monkeypatch.setenv("OPENAI_API_KEY", "test-secret")
    client, workspace_id = build_provider_config_client(monkeypatch)

    update_response = client.put(
        f"/api/v1/workspaces/{workspace_id}/provider-configs/image_ocr",
        json={
            "provider_code": "openai",
            "model_name": "gpt-4o-mini",
            "is_enabled": True,
            "api_base_url": "https://api.openai.com/v1",
            "api_key_env_name": "OPENAI_API_KEY",
            "options_json": {},
        },
    )
    assert update_response.status_code == 200
    config = update_response.json()["data"]["config"]
    assert config["secret_env_name"] == "OPENAI_API_KEY"
    assert config["secret_status"] == "configured"
    assert config["requires_secret"] is True
    assert config["config_warnings"] == []


def test_provider_config_rejects_dangerous_env_names_and_urls(monkeypatch) -> None:
    client, workspace_id = build_provider_config_client(monkeypatch)

    bad_env_response = client.put(
        f"/api/v1/workspaces/{workspace_id}/provider-configs/image_ocr",
        json={
            "provider_code": "openai",
            "model_name": "gpt-4o-mini",
            "is_enabled": True,
            "api_base_url": "https://api.openai.com/v1",
            "api_key_env_name": "NEXT_PUBLIC_OPENAI_KEY",
            "options_json": {},
        },
    )
    assert bad_env_response.status_code == 400
    assert "NEXT_PUBLIC_" in bad_env_response.json()["detail"]

    bad_url_response = client.put(
        f"/api/v1/workspaces/{workspace_id}/provider-configs/image_ocr",
        json={
            "provider_code": "custom",
            "model_name": "internal",
            "is_enabled": True,
            "api_base_url": "https://user:pass@example.com/hook",
            "api_key_env_name": "INTERNAL_API_KEY",
            "options_json": {},
        },
    )
    assert bad_url_response.status_code == 400
    assert "must not embed credentials" in bad_url_response.json()["detail"]


def test_validate_runtime_settings_requires_strong_secret_in_production(monkeypatch) -> None:
    original_env = settings.app_env
    original_secret = settings.secret_key
    original_auto_create_tables = settings.auto_create_tables
    try:
        settings.app_env = "production"
        settings.auto_create_tables = False
        settings.secret_key = "change-me"
        try:
            validate_runtime_settings()
        except RuntimeError as exc:
            assert "SECRET_KEY" in str(exc)
        else:
            raise AssertionError("Expected production secret validation to fail")
    finally:
        settings.app_env = original_env
        settings.secret_key = original_secret
        settings.auto_create_tables = original_auto_create_tables


def test_validate_runtime_settings_rejects_auto_create_tables_in_production() -> None:
    original_env = settings.app_env
    original_secret = settings.secret_key
    original_auto_create_tables = settings.auto_create_tables
    try:
        settings.app_env = "production"
        settings.secret_key = "production-secret-key-with-sufficient-length"
        settings.auto_create_tables = True
        try:
            validate_runtime_settings()
        except RuntimeError as exc:
            assert "AUTO_CREATE_TABLES=false" in str(exc)
        else:
            raise AssertionError("Expected production auto-create-table validation to fail")
    finally:
        settings.app_env = original_env
        settings.secret_key = original_secret
        settings.auto_create_tables = original_auto_create_tables


def test_validate_runtime_settings_requires_redis_for_async_media() -> None:
    original_mode = settings.media_processing_mode
    original_redis_url = settings.redis_url
    try:
        settings.media_processing_mode = "async"
        settings.redis_url = ""
        try:
            validate_runtime_settings()
        except RuntimeError as exc:
            assert "REDIS_URL" in str(exc)
        else:
            raise AssertionError("Expected async media processing validation to fail without Redis")
    finally:
        settings.media_processing_mode = original_mode
        settings.redis_url = original_redis_url
