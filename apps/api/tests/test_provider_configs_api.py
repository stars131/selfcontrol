from __future__ import annotations

from dataclasses import replace

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import provider_configs as provider_configs_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.media_remote_storage_health import MediaStorageProviderHealthResult
from app.services.provider_config_defaults import build_default_feature_config


def build_provider_configs_client() -> tuple[TestClient, sessionmaker, dict[str, str]]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        owner = User(
            username="provider-configs-api-owner",
            email="provider-configs-api-owner@example.com",
            password_hash="test-hash",
            display_name="Provider Configs API Owner",
        )
        viewer = User(
            username="provider-configs-api-viewer",
            email="provider-configs-api-viewer@example.com",
            password_hash="test-hash",
            display_name="Provider Configs API Viewer",
        )
        db.add_all([owner, viewer])
        db.flush()

        workspace = Workspace(
            name="Provider Configs API Workspace",
            slug="provider-configs-api-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=viewer.id, role="viewer"),
            ]
        )
        db.commit()

        owner_id = owner.id
        viewer_id = viewer.id
        workspace_id = workspace.id

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
            user = db.get(User, owner_id)
            assert user is not None
            return user
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, {
        "workspace_id": workspace_id,
        "owner_id": owner_id,
        "viewer_id": viewer_id,
    }


def test_provider_configs_api_lists_health_and_update_flow(monkeypatch) -> None:
    client, _session_local, ids = build_provider_configs_client()
    captured_update: dict[str, object] = {}
    audit_calls: list[dict[str, object]] = []

    chat_config = replace(
        build_default_feature_config("chat_generation"),
        provider_code="custom",
        model_name="assistant-v2",
        is_enabled=True,
        api_base_url="https://llm.example.test/v1",
        api_key_env_name="CHAT_API_KEY",
        is_default=False,
        secret_env_name="CHAT_API_KEY",
        secret_status="configured",
    )
    maps_config = build_default_feature_config("maps_geocoding")

    health = MediaStorageProviderHealthResult(
        feature_code="media_storage",
        provider_code="custom",
        is_enabled=True,
        status="ready",
        reachable=True,
        checked_at="2026-03-29T00:00:00Z",
        api_base_url="https://storage.example.test",
        message="Remote media storage is reachable",
        contract_version="2026-01-01",
        secret_status="configured",
        service_status="ready",
        service_name="storage-gateway",
        service_version="1.2.3",
        response_time_ms=12,
        capabilities={"upload": True, "download": True, "delete": True},
        warnings=[],
    )

    class FakeConfigResult:
        provider_code = "openai"
        is_enabled = True

        def to_dict(self) -> dict[str, object]:
            return {
                "feature_code": "image_ocr",
                "provider_code": "openai",
                "model_name": "gpt-4o-mini",
                "is_enabled": True,
            }

    monkeypatch.setattr(provider_configs_route, "list_provider_configs", lambda db, workspace_id: [chat_config, maps_config])
    monkeypatch.setattr(provider_configs_route, "get_media_storage_provider_health", lambda db, workspace_id: health)

    def fake_upsert_provider_config_or_400(
        db,
        *,
        workspace_id,
        feature_code,
        provider_code,
        model_name,
        is_enabled,
        api_base_url,
        api_key_env_name,
        options_json,
    ):
        captured_update.update(
            {
                "workspace_id": workspace_id,
                "feature_code": feature_code,
                "provider_code": provider_code,
                "model_name": model_name,
                "is_enabled": is_enabled,
                "api_base_url": api_base_url,
                "api_key_env_name": api_key_env_name,
                "options_json": options_json,
            }
        )
        return FakeConfigResult()

    monkeypatch.setattr(provider_configs_route, "upsert_provider_config_or_400", fake_upsert_provider_config_or_400)
    monkeypatch.setattr(provider_configs_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    list_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/provider-configs")
    assert list_response.status_code == 200
    list_items = list_response.json()["data"]["items"]
    assert [item["feature_code"] for item in list_items] == ["chat_generation", "maps_geocoding"]
    assert list_items[0]["provider_code"] == "custom"
    assert list_items[1]["provider_code"] == "amap"

    health_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/provider-configs/media-storage-health")
    assert health_response.status_code == 200
    assert health_response.json()["data"]["health"]["service_name"] == "storage-gateway"

    put_response = client.put(
        f"/api/v1/workspaces/{ids['workspace_id']}/provider-configs/image_ocr",
        json={
            "provider_code": "openai",
            "model_name": "gpt-4o-mini",
            "is_enabled": True,
            "api_base_url": "https://api.openai.com/v1",
            "api_key_env_name": "OPENAI_API_KEY",
            "options_json": {"language": "zh-CN"},
        },
    )
    assert put_response.status_code == 200
    assert captured_update == {
        "workspace_id": ids["workspace_id"],
        "feature_code": "image_ocr",
        "provider_code": "openai",
        "model_name": "gpt-4o-mini",
        "is_enabled": True,
        "api_base_url": "https://api.openai.com/v1",
        "api_key_env_name": "OPENAI_API_KEY",
        "options_json": {"language": "zh-CN"},
    }
    assert put_response.json()["data"]["config"] == {
        "feature_code": "image_ocr",
        "provider_code": "openai",
        "model_name": "gpt-4o-mini",
        "is_enabled": True,
    }
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["owner_id"],
            "action_code": "provider_config.update",
            "resource_type": "provider_config",
            "resource_id": "image_ocr",
            "message": "Updated provider config for image_ocr",
            "metadata_json": {"provider_code": "openai", "is_enabled": True},
        }
    ]


def test_provider_configs_api_requires_write_access() -> None:
    client, session_local, ids = build_provider_configs_client()

    def override_get_current_user():
        db = session_local()
        try:
            user = db.get(User, ids["viewer_id"])
            assert user is not None
            return user
        finally:
            db.close()

    client.app.dependency_overrides[get_current_user] = override_get_current_user

    for method, path in (
        ("get", f"/api/v1/workspaces/{ids['workspace_id']}/provider-configs"),
        ("get", f"/api/v1/workspaces/{ids['workspace_id']}/provider-configs/media-storage-health"),
        ("put", f"/api/v1/workspaces/{ids['workspace_id']}/provider-configs/chat_generation"),
    ):
        if method == "put":
            response = client.put(
                path,
                json={
                    "provider_code": "custom",
                    "model_name": "assistant-v2",
                    "is_enabled": True,
                    "api_base_url": "https://llm.example.test/v1",
                    "api_key_env_name": "CHAT_API_KEY",
                    "options_json": {},
                },
            )
        else:
            response = client.get(path)
        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"
