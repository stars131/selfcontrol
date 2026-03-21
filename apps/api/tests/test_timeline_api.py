from __future__ import annotations

from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import timeline
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, share_link  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_timeline_client() -> tuple[TestClient, str]:
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
            username="timeline-user",
            email="timeline@example.com",
            password_hash="test-hash",
            display_name="Timeline User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Timeline Workspace",
            slug="timeline-workspace",
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

        db.add_all(
            [
                Record(
                    workspace_id=workspace.id,
                    creator_id=user.id,
                    type_code="food",
                    title="Great noodles",
                    content="Rich broth and thin noodles.",
                    rating=5,
                    is_avoid=False,
                    occurred_at=datetime(2026, 3, 20, 12, 30, tzinfo=timezone.utc),
                    source_type="manual",
                    status="active",
                    extra_data={"location": {"place_name": "Noodle Lab"}},
                ),
                Record(
                    workspace_id=workspace.id,
                    creator_id=user.id,
                    type_code="snack",
                    title="Avoid this chips brand",
                    content="Too oily.",
                    rating=1,
                    is_avoid=True,
                    occurred_at=None,
                    source_type="manual",
                    status="active",
                    extra_data={"location": {"place_name": "Corner Shop"}},
                    created_at=datetime(2026, 3, 20, 9, 0, tzinfo=timezone.utc),
                    updated_at=datetime(2026, 3, 20, 9, 0, tzinfo=timezone.utc),
                ),
                Record(
                    workspace_id=workspace.id,
                    creator_id=user.id,
                    type_code="memo",
                    title="Coffee revisit",
                    content="Come back next month.",
                    rating=None,
                    is_avoid=False,
                    occurred_at=datetime(2026, 3, 18, 8, 15, tzinfo=timezone.utc),
                    source_type="manual",
                    status="active",
                    extra_data={"location": {"place_name": "Bean Archive"}},
                ),
            ]
        )
        db.commit()

        user_id = user.id
        workspace_id = workspace.id

    app = FastAPI()
    app.include_router(timeline.router, prefix="/api/v1/workspaces")

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


def test_timeline_groups_records_by_effective_day() -> None:
    client, workspace_id = build_timeline_client()

    response = client.get(f"/api/v1/workspaces/{workspace_id}/timeline")

    assert response.status_code == 200
    payload = response.json()["data"]
    assert payload["total_days"] == 2
    assert payload["total_records"] == 3
    assert payload["items"][0]["date"] == "2026-03-20"
    assert payload["items"][0]["count"] == 2
    assert payload["items"][0]["avoid_count"] == 1
    assert payload["items"][0]["top_places"] == ["Corner Shop", "Noodle Lab"]
    assert payload["items"][0]["items"][0]["title"] == "Great noodles"
    assert payload["items"][0]["items"][1]["title"] == "Avoid this chips brand"


def test_timeline_supports_filters() -> None:
    client, workspace_id = build_timeline_client()

    response = client.get(
        f"/api/v1/workspaces/{workspace_id}/timeline",
        params={"is_avoid": "true", "start_date": "2026-03-20", "end_date": "2026-03-20"},
    )

    assert response.status_code == 200
    payload = response.json()["data"]
    assert payload["total_days"] == 1
    assert payload["total_records"] == 1
    assert payload["items"][0]["date"] == "2026-03-20"
    assert payload["items"][0]["items"][0]["title"] == "Avoid this chips brand"
