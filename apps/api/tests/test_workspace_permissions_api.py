from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import provider_configs as provider_configs_route
from app.api.routes import records as records_route
from app.api.routes import search_presets as search_presets_route
from app.api.routes import workspaces as workspaces_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_permissions_client(monkeypatch) -> tuple[TestClient, str, dict[str, str]]:
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
            username="owner-user",
            email="owner@example.com",
            password_hash="test-hash",
            display_name="Owner User",
        )
        editor = User(
            username="editor-user",
            email="editor@example.com",
            password_hash="test-hash",
            display_name="Editor User",
        )
        viewer = User(
            username="viewer-user",
            email="viewer@example.com",
            password_hash="test-hash",
            display_name="Viewer User",
        )
        db.add_all([owner, editor, viewer])
        db.flush()

        workspace = Workspace(
            name="Permissions Workspace",
            slug="permissions-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=editor.id, role="editor"),
                WorkspaceMember(workspace_id=workspace.id, user_id=viewer.id, role="viewer"),
            ]
        )
        db.commit()
        workspace_id = workspace.id
        user_ids = {"owner": owner.id, "editor": editor.id, "viewer": viewer.id}

    monkeypatch.setattr(records_route, "rebuild_record_knowledge", lambda db, record_id: None)
    monkeypatch.setattr(records_route, "log_audit_event", lambda *args, **kwargs: None)
    monkeypatch.setattr(search_presets_route, "log_audit_event", lambda *args, **kwargs: None)
    monkeypatch.setattr(provider_configs_route, "log_audit_event", lambda *args, **kwargs: None)

    current_role = {"value": "owner"}

    app = FastAPI()
    app.include_router(workspaces_route.router, prefix="/api/v1/workspaces")
    app.include_router(records_route.router, prefix="/api/v1/workspaces")
    app.include_router(search_presets_route.router, prefix="/api/v1/workspaces")
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
            return db.get(User, user_ids[current_role["value"]])
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    client = TestClient(app)
    client.current_role = current_role  # type: ignore[attr-defined]
    return client, workspace_id, user_ids


def test_workspace_role_is_exposed_for_current_member(monkeypatch) -> None:
    client, workspace_id, _ = build_permissions_client(monkeypatch)

    client.current_role["value"] = "viewer"  # type: ignore[attr-defined]
    detail_response = client.get(f"/api/v1/workspaces/{workspace_id}")
    assert detail_response.status_code == 200
    assert detail_response.json()["data"]["workspace"]["role"] == "viewer"

    list_response = client.get("/api/v1/workspaces")
    assert list_response.status_code == 200
    assert list_response.json()["data"]["items"][0]["role"] == "viewer"


def test_viewer_is_read_only_but_editor_can_write(monkeypatch) -> None:
    client, workspace_id, _ = build_permissions_client(monkeypatch)

    client.current_role["value"] = "viewer"  # type: ignore[attr-defined]
    viewer_record_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "memo",
            "title": "Blocked",
            "content": "viewer cannot create",
            "source_type": "manual",
            "extra_data": {},
        },
    )
    assert viewer_record_response.status_code == 403

    viewer_provider_response = client.get(f"/api/v1/workspaces/{workspace_id}/provider-configs")
    assert viewer_provider_response.status_code == 403

    viewer_preset_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/search-presets",
        json={"name": "Viewer preset", "filters": {}},
    )
    assert viewer_preset_response.status_code == 403

    client.current_role["value"] = "editor"  # type: ignore[attr-defined]
    editor_record_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "memo",
            "title": "Allowed",
            "content": "editor can create",
            "source_type": "manual",
            "extra_data": {},
        },
    )
    assert editor_record_response.status_code == 200

    editor_provider_response = client.put(
        f"/api/v1/workspaces/{workspace_id}/provider-configs/chat_generation",
        json={
            "provider_code": "builtin",
            "model_name": "rules-v1",
            "is_enabled": True,
            "api_base_url": None,
            "api_key_env_name": None,
            "options_json": {},
        },
    )
    assert editor_provider_response.status_code == 200

    editor_preset_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/search-presets",
        json={
            "name": "Editor preset",
            "filters": {"query": "allowed", "type_code": "memo"},
        },
    )
    assert editor_preset_response.status_code == 200

    client.current_role["value"] = "viewer"  # type: ignore[attr-defined]
    viewer_read_response = client.get(f"/api/v1/workspaces/{workspace_id}/records")
    assert viewer_read_response.status_code == 200
    items = viewer_read_response.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["title"] == "Allowed"
