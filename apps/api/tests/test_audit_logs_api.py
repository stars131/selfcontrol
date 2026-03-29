from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import audit_logs as audit_logs_route
from app.db.base import Base
from app.db.session import get_db
from app.models import conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.audit_log import AuditLog
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_audit_logs_client() -> tuple[TestClient, sessionmaker, dict[str, str]]:
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
            username="audit-api-owner",
            email="audit-api-owner@example.com",
            password_hash="test-hash",
            display_name="Audit API Owner",
        )
        outsider = User(
            username="audit-api-outsider",
            email="audit-api-outsider@example.com",
            password_hash="test-hash",
            display_name="Audit API Outsider",
        )
        db.add_all([owner, outsider])
        db.flush()

        workspace = Workspace(
            name="Audit API Workspace",
            slug="audit-api-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        membership = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=owner.id,
            role="owner",
        )
        db.add(membership)
        db.flush()

        now = datetime.now(timezone.utc)
        items = [
            AuditLog(
                workspace_id=workspace.id,
                actor_user_id=owner.id,
                action_code="record.update",
                resource_type="record",
                resource_id="record-3",
                status="success",
                message="Updated record",
                metadata_json={},
            ),
            AuditLog(
                workspace_id=workspace.id,
                actor_user_id=owner.id,
                action_code="record.create",
                resource_type="record",
                resource_id="record-2",
                status="success",
                message="Created record",
                metadata_json={},
            ),
            AuditLog(
                workspace_id=workspace.id,
                actor_user_id=owner.id,
                action_code="record.create",
                resource_type="record",
                resource_id="record-1",
                status="success",
                message="Created another record",
                metadata_json={},
            ),
        ]
        for offset, item in enumerate(items):
            item.created_at = now - timedelta(minutes=offset)
        db.add_all(items)
        db.commit()

        owner_id = owner.id
        outsider_id = outsider.id
        workspace_id = workspace.id

    app = FastAPI()
    app.include_router(audit_logs_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, owner.id)
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, {
        "workspace_id": workspace_id,
        "owner_id": owner_id,
        "outsider_id": outsider_id,
    }


def test_list_audit_logs_returns_descending_items_with_limit_and_filter() -> None:
    client, _session_local, ids = build_audit_logs_client()

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/audit-logs?limit=2")
    assert response.status_code == 200

    payload = response.json()["data"]["items"]
    assert len(payload) == 2
    assert [item["action_code"] for item in payload] == ["record.update", "record.create"]
    assert payload[0]["resource_id"] == "record-3"
    assert payload[1]["resource_id"] == "record-2"

    filtered_response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/audit-logs",
        params={"action_code": "record.create"},
    )
    assert filtered_response.status_code == 200
    filtered_items = filtered_response.json()["data"]["items"]
    assert [item["resource_id"] for item in filtered_items] == ["record-2", "record-1"]


def test_list_audit_logs_requires_workspace_membership() -> None:
    client, session_local, ids = build_audit_logs_client()

    app = client.app

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, ids["outsider_id"])
            assert user is not None
            return user

    app.dependency_overrides[get_current_user] = override_get_current_user

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/audit-logs")
    assert response.status_code == 403
    assert response.json()["detail"] == "Forbidden"
