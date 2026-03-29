from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.background_tasks import dispatch_media_processing, queue_media_retry_if_needed


def build_background_tasks_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="background-tasks-service-user",
            email="background-tasks-service@example.com",
            password_hash="test-hash",
            display_name="Background Tasks Service User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Background Tasks Workspace",
            slug="background-tasks-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.flush()

        record = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Background tasks record",
            content="Background tasks record content",
            source_type="manual",
            extra_data={},
        )
        db.add(record)
        db.commit()
        return session_local, {
            "user_id": user.id,
            "workspace_id": workspace.id,
            "record_id": record.id,
        }


def test_queue_media_retry_if_needed_schedules_remote_async_retry(monkeypatch) -> None:
    queued_calls: list[dict] = []

    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")

    class FakeTask:
        @staticmethod
        def apply_async(*, args, kwargs, countdown):
            queued_calls.append({"args": args, "kwargs": kwargs, "countdown": countdown})

    monkeypatch.setattr("app.worker.process_media_asset_task", FakeTask())

    media = MediaAsset(
        id="media-1",
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="custom",
        storage_key="remote/workspace-1/voice.m4a",
        original_filename="voice.m4a",
        mime_type="audio/mp4",
        size_bytes=12,
        metadata_json={
            "processing_retry_state": "scheduled",
            "processing_retry_delay_seconds": "45",
        },
        processing_status="deferred",
    )

    result = queue_media_retry_if_needed(media)

    assert result == "async_retry_scheduled"
    assert queued_calls == [
        {
            "args": ["media-1"],
            "kwargs": {"trigger": "auto_retry"},
            "countdown": 45,
        }
    ]


def test_queue_media_retry_if_needed_ignores_non_eligible_media(monkeypatch) -> None:
    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "sync")

    local_media = MediaAsset(
        id="media-local",
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="local",
        storage_key="uploads/workspace-1/local.m4a",
        original_filename="local.m4a",
        mime_type="audio/mp4",
        size_bytes=12,
        metadata_json={"processing_retry_state": "scheduled", "processing_retry_delay_seconds": 10},
        processing_status="deferred",
    )
    remote_media_not_scheduled = MediaAsset(
        id="media-remote",
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="custom",
        storage_key="remote/workspace-1/remote.m4a",
        original_filename="remote.m4a",
        mime_type="audio/mp4",
        size_bytes=12,
        metadata_json={"processing_retry_state": "idle", "processing_retry_delay_seconds": 10},
        processing_status="failed",
    )

    assert queue_media_retry_if_needed(local_media) is None
    assert queue_media_retry_if_needed(remote_media_not_scheduled) is None


def test_dispatch_media_processing_async_resets_remote_retry_tracking_and_queues_worker(
    monkeypatch,
) -> None:
    session_local, ids = build_background_tasks_service_session()
    queued_media_ids: list[str] = []
    reset_calls: list[dict] = []
    retry_policies: list[str] = []

    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")
    monkeypatch.setattr(
        "app.services.background_tasks.get_remote_media_retry_policy",
        lambda db, workspace_id: retry_policies.append(workspace_id) or {"max_attempts": 5},
    )
    monkeypatch.setattr(
        "app.services.background_tasks.reset_media_retry_tracking",
        lambda media, *, reset_count, retry_policy: reset_calls.append(
            {
                "media_id": media.id,
                "reset_count": reset_count,
                "retry_policy": retry_policy,
            }
        ),
    )

    class FakeTask:
        @staticmethod
        def delay(media_id: str) -> None:
            queued_media_ids.append(media_id)

    monkeypatch.setattr("app.worker.process_media_asset_task", FakeTask())

    with session_local() as db:
        media = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_id"],
            uploaded_by=ids["user_id"],
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{ids['workspace_id']}/voice.m4a",
            original_filename="voice.m4a",
            mime_type="audio/mp4",
            size_bytes=12,
            metadata_json={"processing_retry_state": "scheduled"},
            processing_status="failed",
            processing_error="previous failure",
        )
        db.add(media)
        db.commit()
        media_id = media.id

        updated_media, mode = dispatch_media_processing(db, media_id)

    assert mode == "async"
    assert updated_media.id == media_id
    assert updated_media.processing_status == "pending"
    assert updated_media.processing_error is None
    assert updated_media.processed_at is None
    assert retry_policies == [ids["workspace_id"]]
    assert reset_calls == [
        {
            "media_id": media_id,
            "reset_count": True,
            "retry_policy": {"max_attempts": 5},
        }
    ]
    assert queued_media_ids == [media_id]


def test_dispatch_media_processing_sync_processes_immediately_and_skips_local_retry_reset(
    monkeypatch,
) -> None:
    session_local, ids = build_background_tasks_service_session()
    process_calls: list[str] = []
    reset_calls: list[str] = []

    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "sync")
    monkeypatch.setattr(
        "app.services.background_tasks.process_media_asset",
        lambda db, media_id: process_calls.append(media_id) or db.get(MediaAsset, media_id),
    )
    monkeypatch.setattr(
        "app.services.background_tasks.reset_media_retry_tracking",
        lambda media, *, reset_count, retry_policy: reset_calls.append(media.id),
    )

    with session_local() as db:
        media = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_id"],
            uploaded_by=ids["user_id"],
            media_type="image",
            storage_provider="local",
            storage_key=f"uploads/{ids['workspace_id']}/photo.jpg",
            original_filename="photo.jpg",
            mime_type="image/jpeg",
            size_bytes=12,
            metadata_json={},
            processing_status="pending",
        )
        db.add(media)
        db.commit()
        media_id = media.id

        processed_media, mode = dispatch_media_processing(db, media_id)

    assert mode == "sync"
    assert processed_media.id == media_id
    assert process_calls == [media_id]
    assert reset_calls == []


def test_dispatch_media_processing_rejects_missing_media() -> None:
    session_local, _ids = build_background_tasks_service_session()

    with session_local() as db:
        try:
            dispatch_media_processing(db, "missing-media")
        except ValueError as exc:
            assert "Media not found" in str(exc)
        else:
            raise AssertionError("Expected missing media dispatch to fail")
