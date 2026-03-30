from __future__ import annotations

from datetime import date, datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import timeline as timeline_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


class FakeTimelineDay:
    def __init__(self, *, date_value: str, count: int, avoid_count: int, record_ids: list[str]) -> None:
        self._payload = {
            "date": date_value,
            "count": count,
            "avoid_count": avoid_count,
            "top_places": [],
            "items": [{"id": record_id} for record_id in record_ids],
        }

    def model_dump(self) -> dict:
        return self._payload


def build_timeline_filters_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="timeline-filters-owner",
            email="timeline-filters-owner@example.com",
            password_hash="test-hash",
            display_name="Timeline Filters Owner",
        )
        outsider = User(
            username="timeline-filters-outsider",
            email="timeline-filters-outsider@example.com",
            password_hash="test-hash",
            display_name="Timeline Filters Outsider",
        )
        db.add_all([owner, outsider])
        db.flush()

        workspace = Workspace(
            name="Timeline Filters Workspace",
            slug="timeline-filters-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"))
        db.flush()

        db.add_all(
            [
                Record(
                    workspace_id=workspace.id,
                    creator_id=owner.id,
                    type_code="food",
                    title="Food record",
                    content="Food content",
                    is_avoid=False,
                    occurred_at=datetime(2026, 4, 1, 12, 0, tzinfo=timezone.utc),
                    source_type="manual",
                    status="active",
                    extra_data={},
                ),
                Record(
                    workspace_id=workspace.id,
                    creator_id=owner.id,
                    type_code="memo",
                    title="Memo avoid",
                    content="Memo content",
                    is_avoid=True,
                    occurred_at=datetime(2026, 4, 2, 12, 0, tzinfo=timezone.utc),
                    source_type="manual",
                    status="active",
                    extra_data={},
                ),
                Record(
                    workspace_id=workspace.id,
                    creator_id=owner.id,
                    type_code="food",
                    title="Food avoid",
                    content="Other content",
                    is_avoid=True,
                    occurred_at=datetime(2026, 4, 3, 12, 0, tzinfo=timezone.utc),
                    source_type="manual",
                    status="active",
                    extra_data={},
                ),
            ]
        )
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "outsider_id": outsider.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(timeline_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, ids[current_user_key["value"]])
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, ids, current_user_key


def test_timeline_filters_api_passes_filtered_records_and_date_bounds(monkeypatch) -> None:
    client, _session_local, ids, _current_user_key = build_timeline_filters_client()
    captured_filter: dict[str, object] = {}
    captured_build: dict[str, object] = {}

    def fake_filter_timeline_records(records, *, start_date, end_date):
        captured_filter.update(
            {
                "titles": [record.title for record in records],
                "start_date": start_date,
                "end_date": end_date,
            }
        )
        return list(records)

    def fake_build_timeline_days(records):
        captured_build["titles"] = [record.title for record in records]
        return [
            FakeTimelineDay(
                date_value="2026-04-03",
                count=len(records),
                avoid_count=sum(1 for record in records if record.is_avoid),
                record_ids=[record.id for record in records],
            )
        ]

    monkeypatch.setattr(timeline_route, "filter_timeline_records", fake_filter_timeline_records)
    monkeypatch.setattr(timeline_route, "build_timeline_days", fake_build_timeline_days)

    response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/timeline",
        params={
            "type_code": "food",
            "is_avoid": "true",
            "start_date": "2026-04-01",
            "end_date": "2026-04-03",
        },
    )

    assert response.status_code == 200
    assert captured_filter == {
        "titles": ["Food avoid"],
        "start_date": date(2026, 4, 1),
        "end_date": date(2026, 4, 3),
    }
    assert captured_build == {"titles": ["Food avoid"]}
    payload = response.json()["data"]
    assert payload["total_days"] == 1
    assert payload["total_records"] == 1
    assert payload["items"][0]["count"] == 1


def test_timeline_filters_api_requires_workspace_membership() -> None:
    client, _session_local, ids, current_user_key = build_timeline_filters_client()
    current_user_key["value"] = "outsider_id"

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/timeline")

    assert response.status_code == 403
    assert response.json()["detail"] == "Forbidden"
