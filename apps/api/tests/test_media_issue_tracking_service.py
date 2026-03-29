from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.media_issue_tracking import (
    build_workspace_media_dead_letter_overview,
    build_workspace_media_processing_overview,
    list_workspace_media_dead_letter_items,
)


def build_media_issue_tracking_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="media-issue-service-user",
            email="media-issue-service@example.com",
            password_hash="test-hash",
            display_name="Media Issue Service User",
        )
        db.add(user)
        db.flush()

        primary_workspace = Workspace(
            name="Primary Media Issue Workspace",
            slug="primary-media-issue-workspace",
            owner_id=user.id,
            visibility="private",
        )
        secondary_workspace = Workspace(
            name="Secondary Media Issue Workspace",
            slug="secondary-media-issue-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(primary_workspace)
        db.add(secondary_workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=primary_workspace.id, user_id=user.id, role="owner"))
        db.add(WorkspaceMember(workspace_id=secondary_workspace.id, user_id=user.id, role="owner"))
        db.flush()

        primary_record = Record(
            workspace_id=primary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Primary record",
            content="Primary record content",
            source_type="manual",
            extra_data={},
        )
        secondary_record = Record(
            workspace_id=secondary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Secondary record",
            content="Secondary record content",
            source_type="manual",
            extra_data={},
        )
        db.add(primary_record)
        db.add(secondary_record)
        db.commit()
        return session_local, {
            "user_id": user.id,
            "primary_workspace_id": primary_workspace.id,
            "secondary_workspace_id": secondary_workspace.id,
            "primary_record_id": primary_record.id,
            "secondary_record_id": secondary_record.id,
        }


def test_list_workspace_media_dead_letter_items_filters_and_sorts_remote_items() -> None:
    session_local, ids = build_media_issue_tracking_service_session()
    now = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        remote_latest = MediaAsset(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            uploaded_by=ids["user_id"],
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{ids['primary_workspace_id']}/latest.m4a",
            original_filename="latest.m4a",
            mime_type="audio/mp4",
            size_bytes=10,
            metadata_json={
                "processing_retry_state": "manual_only",
                "processing_last_failure_at": "2026-03-29T11:30:00+00:00",
                "processing_last_attempt_at": "2026-03-29T11:25:00+00:00",
            },
            processing_status="failed",
            processing_error="audio_asr provider is not enabled",
            updated_at=now,
        )
        remote_older = MediaAsset(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            uploaded_by=ids["user_id"],
            media_type="video",
            storage_provider="custom",
            storage_key=f"remote/{ids['primary_workspace_id']}/older.mp4",
            original_filename="older.mp4",
            mime_type="video/mp4",
            size_bytes=20,
            metadata_json={
                "processing_retry_state": "exhausted",
                "processing_last_failure_at": "2026-03-29T10:30:00+00:00",
                "processing_last_attempt_at": "2026-03-29T10:25:00+00:00",
            },
            processing_status="deferred",
            processing_error="remote fetch timed out",
            updated_at=now - timedelta(minutes=30),
        )
        remote_wrong_state = MediaAsset(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            uploaded_by=ids["user_id"],
            media_type="image",
            storage_provider="custom",
            storage_key=f"remote/{ids['primary_workspace_id']}/scheduled.png",
            original_filename="scheduled.png",
            mime_type="image/png",
            size_bytes=5,
            metadata_json={"processing_retry_state": "scheduled"},
            processing_status="deferred",
            processing_error="provider processing is not ready",
        )
        local_manual = MediaAsset(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            uploaded_by=ids["user_id"],
            media_type="text",
            storage_provider="local",
            storage_key=f"uploads/{ids['primary_workspace_id']}/local.txt",
            original_filename="local.txt",
            mime_type="text/plain",
            size_bytes=8,
            metadata_json={"processing_retry_state": "manual_only"},
            processing_status="failed",
            processing_error="local file missing",
        )
        secondary_remote = MediaAsset(
            workspace_id=ids["secondary_workspace_id"],
            record_id=ids["secondary_record_id"],
            uploaded_by=ids["user_id"],
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{ids['secondary_workspace_id']}/other.m4a",
            original_filename="other.m4a",
            mime_type="audio/mp4",
            size_bytes=6,
            metadata_json={"processing_retry_state": "manual_only"},
            processing_status="failed",
            processing_error="other workspace",
        )
        db.add_all([remote_latest, remote_older, remote_wrong_state, local_manual, secondary_remote])
        db.commit()

        items = list_workspace_media_dead_letter_items(db, ids["primary_workspace_id"])

    assert [item.original_filename for item in items] == ["latest.m4a", "older.mp4"]


def test_build_workspace_media_processing_overview_aggregates_counts_categories_and_recent_issues() -> None:
    session_local, ids = build_media_issue_tracking_service_session()
    now = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        db.add_all(
            [
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="text",
                    storage_provider="local",
                    storage_key=f"uploads/{ids['primary_workspace_id']}/done.txt",
                    original_filename="done.txt",
                    mime_type="text/plain",
                    size_bytes=8,
                    metadata_json={},
                    processing_status="completed",
                    updated_at=now - timedelta(hours=2),
                ),
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="image",
                    storage_provider="local",
                    storage_key=f"uploads/{ids['primary_workspace_id']}/pending.png",
                    original_filename="pending.png",
                    mime_type="image/png",
                    size_bytes=10,
                    metadata_json={},
                    processing_status="pending",
                    updated_at=now - timedelta(hours=1),
                ),
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="audio",
                    storage_provider="custom",
                    storage_key=f"remote/{ids['primary_workspace_id']}/provider.m4a",
                    original_filename="provider.m4a",
                    mime_type="audio/mp4",
                    size_bytes=12,
                    metadata_json={
                        "processing_retry_state": "scheduled",
                        "processing_last_failure_at": "2026-03-29T10:00:00+00:00",
                        "processing_last_attempt_at": "2026-03-29T09:59:00+00:00",
                    },
                    processing_status="deferred",
                    processing_error="provider processing is not ready",
                    updated_at=now - timedelta(minutes=40),
                ),
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="video",
                    storage_provider="custom",
                    storage_key=f"remote/{ids['primary_workspace_id']}/remote.mp4",
                    original_filename="remote.mp4",
                    mime_type="video/mp4",
                    size_bytes=15,
                    metadata_json={
                        "processing_retry_state": "exhausted",
                        "processing_last_failure_at": "2026-03-29T11:30:00+00:00",
                        "processing_last_attempt_at": "2026-03-29T11:25:00+00:00",
                    },
                    processing_status="failed",
                    processing_error="remote fetch timed out",
                    updated_at=now,
                ),
            ]
        )
        db.commit()

        overview = build_workspace_media_processing_overview(
            db,
            ids["primary_workspace_id"],
            issue_limit=2,
        )

    assert overview["workspace_id"] == ids["primary_workspace_id"]
    assert overview["total_count"] == 4
    assert overview["local_item_count"] == 2
    assert overview["remote_item_count"] == 2
    assert overview["completed_count"] == 1
    assert overview["pending_count"] == 1
    assert overview["deferred_count"] == 1
    assert overview["failed_count"] == 1
    assert overview["by_processing_status"] == {"completed": 1, "pending": 1, "deferred": 1, "failed": 1}
    assert overview["by_storage_provider"] == {"local": 2, "custom": 2}
    assert overview["by_issue_category"] == {
        "provider_not_ready": 1,
        "transient_remote_failure": 1,
    }
    assert [item["original_filename"] for item in overview["recent_issues"]] == ["remote.mp4", "provider.m4a"]


def test_build_workspace_media_dead_letter_overview_groups_retry_states_and_respects_limit() -> None:
    session_local, ids = build_media_issue_tracking_service_session()
    now = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        db.add_all(
            [
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="audio",
                    storage_provider="custom",
                    storage_key=f"remote/{ids['primary_workspace_id']}/manual.m4a",
                    original_filename="manual.m4a",
                    mime_type="audio/mp4",
                    size_bytes=10,
                    metadata_json={
                        "processing_retry_state": "manual_only",
                        "processing_last_failure_at": "2026-03-29T11:00:00+00:00",
                        "processing_last_attempt_at": "2026-03-29T10:55:00+00:00",
                    },
                    processing_status="failed",
                    processing_error="audio_asr provider is not enabled",
                    updated_at=now - timedelta(minutes=20),
                ),
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="video",
                    storage_provider="custom",
                    storage_key=f"remote/{ids['primary_workspace_id']}/disabled.mp4",
                    original_filename="disabled.mp4",
                    mime_type="video/mp4",
                    size_bytes=10,
                    metadata_json={
                        "processing_retry_state": "disabled",
                        "processing_last_failure_at": "2026-03-29T11:10:00+00:00",
                        "processing_last_attempt_at": "2026-03-29T11:05:00+00:00",
                    },
                    processing_status="deferred",
                    processing_error="remote fetch timed out",
                    updated_at=now - timedelta(minutes=10),
                ),
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="image",
                    storage_provider="custom",
                    storage_key=f"remote/{ids['primary_workspace_id']}/exhausted.png",
                    original_filename="exhausted.png",
                    mime_type="image/png",
                    size_bytes=10,
                    metadata_json={
                        "processing_retry_state": "exhausted",
                        "processing_last_failure_at": "2026-03-29T11:20:00+00:00",
                        "processing_last_attempt_at": "2026-03-29T11:15:00+00:00",
                    },
                    processing_status="failed",
                    processing_error="remote fetch timed out",
                    updated_at=now,
                ),
            ]
        )
        db.commit()

        overview = build_workspace_media_dead_letter_overview(
            db,
            ids["primary_workspace_id"],
            limit=2,
        )

    assert overview["workspace_id"] == ids["primary_workspace_id"]
    assert overview["total_count"] == 3
    assert overview["by_retry_state"] == {"manual_only": 1, "disabled": 1, "exhausted": 1}
    assert overview["by_issue_category"] == {
        "provider_disabled": 1,
        "transient_remote_failure": 2,
    }
    assert [item["original_filename"] for item in overview["items"]] == ["exhausted.png", "disabled.mp4"]
