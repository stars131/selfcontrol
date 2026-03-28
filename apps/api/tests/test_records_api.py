from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import record_route_helpers
from app.api.routes import records as records_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, search_preset, share_link  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_records_api_client(monkeypatch) -> tuple[TestClient, str, sessionmaker]:
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
            username="records-api-user",
            email="records-api@example.com",
            password_hash="test-hash",
            display_name="Records API User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Records API Workspace",
            slug="records-api-workspace",
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

    monkeypatch.setattr(records_route, "rebuild_record_knowledge", lambda db, record_id: None)
    monkeypatch.setattr(records_route, "log_audit_event", lambda *args, **kwargs: None)

    app = FastAPI()
    app.include_router(records_route.router, prefix="/api/v1/workspaces")

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
    return TestClient(app), workspace_id, session_local


def test_record_crud_and_filter_flow(monkeypatch) -> None:
    client, workspace_id, _session_local = build_records_api_client(monkeypatch)

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "food",
            "title": "Night noodles",
            "content": "Rich broth and chewy noodles",
            "rating": 5,
            "source_type": "manual",
            "extra_data": {"category": "dinner"},
        },
    )
    assert create_response.status_code == 200
    created = create_response.json()["data"]["record"]
    assert created["title"] == "Night noodles"
    assert created["rating"] == 5
    assert created["extra_data"]["category"] == "dinner"
    record_id = created["id"]

    second_create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "bad_experience",
            "title": "Cold soup",
            "content": "Avoid next time",
            "is_avoid": True,
            "source_type": "manual",
            "extra_data": {"category": "lunch"},
        },
    )
    assert second_create_response.status_code == 200

    list_response = client.get(
        f"/api/v1/workspaces/{workspace_id}/records",
        params={
            "q": "noodles",
            "type_code": "food",
            "is_avoid": "false",
        },
    )
    assert list_response.status_code == 200
    items = list_response.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["id"] == record_id

    detail_response = client.get(f"/api/v1/workspaces/{workspace_id}/records/{record_id}")
    assert detail_response.status_code == 200
    assert detail_response.json()["data"]["record"]["title"] == "Night noodles"

    update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}",
        json={
            "title": "Night noodles revisit",
            "content": "Still rich broth",
            "rating": 4,
            "status": "archived",
        },
    )
    assert update_response.status_code == 200
    updated = update_response.json()["data"]["record"]
    assert updated["title"] == "Night noodles revisit"
    assert updated["content"] == "Still rich broth"
    assert updated["rating"] == 4
    assert updated["status"] == "archived"


def test_record_delete_cleans_local_and_remote_media(monkeypatch) -> None:
    client, workspace_id, session_local = build_records_api_client(monkeypatch)

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "memo",
            "title": "Delete target",
            "content": "Remove me",
            "source_type": "manual",
            "extra_data": {},
        },
    )
    assert create_response.status_code == 200
    record_id = create_response.json()["data"]["record"]["id"]

    with session_local() as db:
        user_id = db.query(User).first().id
        db.add_all(
            [
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="image",
                    storage_provider="local",
                    storage_key=f"uploads/{workspace_id}/pixel.png",
                    original_filename="pixel.png",
                    mime_type="image/png",
                    size_bytes=128,
                    metadata_json={},
                    processing_status="completed",
                ),
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="audio",
                    storage_provider="custom",
                    storage_key=f"remote/{workspace_id}/voice.m4a",
                    original_filename="voice.m4a",
                    mime_type="audio/mp4",
                    size_bytes=256,
                    metadata_json={},
                    processing_status="completed",
                ),
            ]
        )
        db.commit()

    local_deleted: list[str] = []
    remote_deleted: list[str] = []

    monkeypatch.setattr(
        record_route_helpers,
        "remove_storage_file",
        lambda media: local_deleted.append(media.storage_key) or True,
    )
    monkeypatch.setattr(
        records_route,
        "delete_remote_media_via_provider",
        lambda db, media: remote_deleted.append(media.storage_key),
    )

    delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/records/{record_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True
    assert local_deleted == [f"uploads/{workspace_id}/pixel.png"]
    assert remote_deleted == [f"remote/{workspace_id}/voice.m4a"]

    missing_response = client.get(f"/api/v1/workspaces/{workspace_id}/records/{record_id}")
    assert missing_response.status_code == 404
