from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import search_presets as search_presets_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_search_preset_client(monkeypatch) -> tuple[TestClient, str]:
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
            username="search-preset-user",
            email="search-preset@example.com",
            password_hash="test-hash",
            display_name="Search Preset User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Search Preset Workspace",
            slug="search-preset-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(
            WorkspaceMember(
                workspace_id=workspace.id,
                user_id=user.id,
                role="owner",
            )
        )
        db.commit()
        user_id = user.id
        workspace_id = workspace.id

    monkeypatch.setattr(search_presets_route, "log_audit_event", lambda *args, **kwargs: None)

    app = FastAPI()
    app.include_router(search_presets_route.router, prefix="/api/v1/workspaces")

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


def test_search_preset_crud_flow(monkeypatch) -> None:
    client, workspace_id = build_search_preset_client(monkeypatch)

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/search-presets",
        json={
            "name": "Mapped Food",
            "filters": {
                "query": "soup",
                "type_code": "food",
                "is_avoid": "all",
                "place_query": "house",
                "review_status": "confirmed",
                "mapped_only": "mapped",
            },
        },
    )

    assert create_response.status_code == 200
    preset = create_response.json()["data"]["preset"]
    assert preset["name"] == "Mapped Food"
    assert preset["filters_json"]["query"] == "soup"
    assert preset["filters_json"]["mapped_only"] == "mapped"

    preset_id = preset["id"]
    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/search-presets")
    assert list_response.status_code == 200
    items = list_response.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["id"] == preset_id

    update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/search-presets/{preset_id}",
        json={
            "name": "Avoid Places",
            "filters": {
                "query": "bad",
                "type_code": "bad_experience",
                "is_avoid": "avoid",
                "place_query": "",
                "review_status": "all",
                "mapped_only": "all",
            },
        },
    )
    assert update_response.status_code == 200
    updated = update_response.json()["data"]["preset"]
    assert updated["name"] == "Avoid Places"
    assert updated["filters_json"]["is_avoid"] == "avoid"

    delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/search-presets/{preset_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True

    empty_response = client.get(f"/api/v1/workspaces/{workspace_id}/search-presets")
    assert empty_response.status_code == 200
    assert empty_response.json()["data"]["items"] == []
