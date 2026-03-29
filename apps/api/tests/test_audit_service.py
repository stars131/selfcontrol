from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.audit_log import AuditLog
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.audit import log_audit_event


def build_audit_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="audit-service-user",
            email="audit-service@example.com",
            password_hash="test-hash",
            display_name="Audit Service User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Audit Service Workspace",
            slug="audit-service-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.commit()
        return session_local, {"workspace_id": workspace.id, "user_id": user.id}


def test_log_audit_event_persists_event_and_defaults_metadata() -> None:
    session_local, ids = build_audit_service_session()

    with session_local() as db:
        item = log_audit_event(
            db,
            workspace_id=ids["workspace_id"],
            actor_user_id=ids["user_id"],
            action_code="record.create",
            resource_type="record",
            resource_id="record-123",
            status="success",
            message="Created a record",
            metadata_json=None,
        )
        stored = db.query(AuditLog).one()

    assert item is not None
    assert stored.id == item.id
    assert stored.workspace_id == ids["workspace_id"]
    assert stored.actor_user_id == ids["user_id"]
    assert stored.action_code == "record.create"
    assert stored.resource_type == "record"
    assert stored.resource_id == "record-123"
    assert stored.status == "success"
    assert stored.message == "Created a record"
    assert stored.metadata_json == {}


def test_log_audit_event_rolls_back_and_returns_none_on_failure(monkeypatch) -> None:
    session_local, ids = build_audit_service_session()

    with session_local() as db:
        original_commit = db.commit

        def failing_commit() -> None:
            raise RuntimeError("commit failed")

        monkeypatch.setattr(db, "commit", failing_commit)

        item = log_audit_event(
            db,
            workspace_id=ids["workspace_id"],
            actor_user_id=ids["user_id"],
            action_code="record.delete",
            resource_type="record",
            resource_id="record-999",
            status="failed",
            message="Delete failed",
            metadata_json={"reason": "test"},
        )

        monkeypatch.setattr(db, "commit", original_commit)
        stored_count = db.query(AuditLog).count()

    assert item is None
    assert stored_count == 0
