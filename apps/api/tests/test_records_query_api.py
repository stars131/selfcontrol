from __future__ import annotations

from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import records as records_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_records_query_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="records-query-owner",
            email="records-query-owner@example.com",
            password_hash="test-hash",
            display_name="Records Query Owner",
        )
        viewer = User(
            username="records-query-viewer",
            email="records-query-viewer@example.com",
            password_hash="test-hash",
            display_name="Records Query Viewer",
        )
        outsider = User(
            username="records-query-outsider",
            email="records-query-outsider@example.com",
            password_hash="test-hash",
            display_name="Records Query Outsider",
        )
        db.add_all([owner, viewer, outsider])
        db.flush()

        workspace = Workspace(
            name="Records Query Workspace",
            slug="records-query-workspace",
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
        db.flush()

        matching_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Soup lunch",
            content="Rich broth",
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        wrong_type_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Soup memo",
            content="Still soup",
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        wrong_avoid_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Soup avoid",
            content="Avoid soup",
            is_avoid=True,
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([matching_record, wrong_type_record, wrong_avoid_record])
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "viewer_id": viewer.id,
            "outsider_id": outsider.id,
            "matching_record_id": matching_record.id,
            "wrong_type_record_id": wrong_type_record.id,
            "wrong_avoid_record_id": wrong_avoid_record.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(records_route.router, prefix="/api/v1/workspaces")

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


def test_records_query_api_list_passes_location_filters_after_route_level_filters(monkeypatch) -> None:
    client, _session_local, ids, current_user_key = build_records_query_client()
    current_user_key["value"] = "viewer_id"
    captured: dict[str, object] = {}

    def fake_filter_records_by_location_fields(
        records,
        *,
        location_query,
        review_status,
        has_coordinates,
    ):
        captured.update(
            {
                "record_ids": [record.id for record in records],
                "location_query": location_query,
                "review_status": review_status,
                "has_coordinates": has_coordinates,
            }
        )
        return list(records)

    monkeypatch.setattr(records_route, "filter_records_by_location_fields", fake_filter_records_by_location_fields)

    response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/records",
        params={
            "q": "Soup",
            "type_code": "food",
            "is_avoid": "false",
            "location_query": "house",
            "review_status": "confirmed",
            "has_coordinates": "true",
        },
    )

    assert response.status_code == 200
    assert captured == {
        "record_ids": [ids["matching_record_id"]],
        "location_query": "house",
        "review_status": "confirmed",
        "has_coordinates": True,
    }
    items = response.json()["data"]["items"]
    assert [item["id"] for item in items] == [ids["matching_record_id"]]


def test_records_query_api_detail_uses_scoped_lookup_helper(monkeypatch) -> None:
    client, session_local, ids, current_user_key = build_records_query_client()
    current_user_key["value"] = "viewer_id"
    captured: dict[str, object] = {}

    def fake_get_workspace_record_or_404(db, *, workspace_id, record_id):
        captured.update(
            {
                "workspace_id": workspace_id,
                "record_id": record_id,
            }
        )
        record = db.get(Record, record_id)
        assert record is not None
        return record

    monkeypatch.setattr(records_route, "get_workspace_record_or_404", fake_get_workspace_record_or_404)

    response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['matching_record_id']}"
    )

    assert response.status_code == 200
    assert captured == {
        "workspace_id": ids["workspace_id"],
        "record_id": ids["matching_record_id"],
    }
    payload = response.json()["data"]["record"]
    assert payload["id"] == ids["matching_record_id"]
    assert payload["title"] == "Soup lunch"


def test_records_query_api_requires_workspace_membership() -> None:
    client, _session_local, ids, current_user_key = build_records_query_client()
    current_user_key["value"] = "outsider_id"

    list_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/records")
    assert list_response.status_code == 403
    assert list_response.json()["detail"] == "Forbidden"

    detail_response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['matching_record_id']}"
    )
    assert detail_response.status_code == 403
    assert detail_response.json()["detail"] == "Forbidden"
