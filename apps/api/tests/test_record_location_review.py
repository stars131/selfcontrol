from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import records as records_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, share_link  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_records_client(monkeypatch) -> tuple[TestClient, str]:
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
            username="record-review-user",
            email="record-review@example.com",
            password_hash="test-hash",
            display_name="Record Review User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Record Review Workspace",
            slug="record-review-workspace",
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
    return TestClient(app), workspace_id


def test_record_location_history_and_review_flow(monkeypatch) -> None:
    client, workspace_id = build_records_client(monkeypatch)

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "food",
            "title": "Soup lunch",
            "content": "First visit",
            "source_type": "manual",
            "extra_data": {
                "category": "lunch",
                "location": {
                    "place_name": "Soup House",
                    "address": "Block A",
                    "latitude": 30.2741,
                    "longitude": 120.1551,
                    "source": "search",
                },
            },
        },
    )

    assert create_response.status_code == 200
    created_record = create_response.json()["data"]["record"]
    assert created_record["extra_data"]["category"] == "lunch"
    assert created_record["extra_data"]["location_review"]["status"] == "pending"
    assert len(created_record["extra_data"]["location_history"]) == 1
    assert created_record["extra_data"]["location_history"][0]["action_code"] == "set"

    record_id = created_record["id"]
    update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}",
        json={
            "title": "Soup lunch revisit",
            "extra_data": {
                "location": {
                    "place_name": "Soup House New Branch",
                    "address": "Block B",
                    "latitude": 30.275,
                    "longitude": 120.156,
                    "source": "map",
                },
                "location_review": {
                    "status": "confirmed",
                    "note": "Checked on the map",
                },
            },
        },
    )

    assert update_response.status_code == 200
    updated_record = update_response.json()["data"]["record"]
    assert updated_record["title"] == "Soup lunch revisit"
    assert updated_record["extra_data"]["category"] == "lunch"
    assert updated_record["extra_data"]["location"]["place_name"] == "Soup House New Branch"
    assert updated_record["extra_data"]["location_review"]["status"] == "confirmed"
    assert updated_record["extra_data"]["location_review"]["note"] == "Checked on the map"
    assert updated_record["extra_data"]["location_review"]["confirmed_at"]
    assert len(updated_record["extra_data"]["location_history"]) == 2
    assert updated_record["extra_data"]["location_history"][-1]["action_code"] == "moved"

    same_update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}",
        json={
            "content": "Second visit",
            "extra_data": {
                "location": {
                    "place_name": "Soup House New Branch",
                    "address": "Block B",
                    "latitude": 30.275,
                    "longitude": 120.156,
                    "source": "map",
                },
                "location_review": {
                    "status": "confirmed",
                    "note": "Checked on the map",
                },
            },
        },
    )

    assert same_update_response.status_code == 200
    unchanged_record = same_update_response.json()["data"]["record"]
    assert len(unchanged_record["extra_data"]["location_history"]) == 2

    clear_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}",
        json={
            "extra_data": {
                "location": None,
                "location_review": None,
            },
        },
    )

    assert clear_response.status_code == 200
    cleared_record = clear_response.json()["data"]["record"]
    assert "location" not in cleared_record["extra_data"]
    assert "location_review" not in cleared_record["extra_data"]
    assert len(cleared_record["extra_data"]["location_history"]) == 3
    assert cleared_record["extra_data"]["location_history"][-1]["action_code"] == "removed"


def test_record_list_supports_location_filters(monkeypatch) -> None:
    client, workspace_id = build_records_client(monkeypatch)

    mapped_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "food",
            "title": "Soup lunch",
            "content": "Mapped place",
            "source_type": "manual",
            "extra_data": {
                "location": {
                    "place_name": "Soup House",
                    "address": "Block A",
                    "latitude": 30.2741,
                    "longitude": 120.1551,
                    "source": "search",
                },
                "location_review": {
                    "status": "confirmed",
                    "note": "Trusted point",
                },
            },
        },
    )
    assert mapped_response.status_code == 200

    plain_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records",
        json={
            "type_code": "memo",
            "title": "Desk note",
            "content": "No location here",
            "source_type": "manual",
            "extra_data": {},
        },
    )
    assert plain_response.status_code == 200

    filtered_response = client.get(
        f"/api/v1/workspaces/{workspace_id}/records",
        params={
            "has_coordinates": "true",
            "review_status": "confirmed",
            "location_query": "soup",
        },
    )

    assert filtered_response.status_code == 200
    items = filtered_response.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["title"] == "Soup lunch"

    unmapped_response = client.get(
        f"/api/v1/workspaces/{workspace_id}/records",
        params={"has_coordinates": "false"},
    )

    assert unmapped_response.status_code == 200
    unmapped_items = unmapped_response.json()["data"]["items"]
    assert len(unmapped_items) == 1
    assert unmapped_items[0]["title"] == "Desk note"
