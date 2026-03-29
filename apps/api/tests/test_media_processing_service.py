from __future__ import annotations

from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.media_processing import process_media_asset
from app.services.media_processing_io import MediaProcessingFileHandle


def build_media_processing_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="media-processing-service-user",
            email="media-processing-service@example.com",
            password_hash="test-hash",
            display_name="Media Processing Service User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Media Processing Workspace",
            slug="media-processing-workspace",
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
            title="Media processing record",
            content="Media processing content",
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


def test_process_media_asset_rejects_missing_media() -> None:
    session_local, _ids = build_media_processing_service_session()

    with session_local() as db:
        try:
            process_media_asset(db, "missing-media")
        except ValueError as exc:
            assert "Media asset not found" in str(exc)
        else:
            raise AssertionError("Expected missing media to fail")


def test_process_media_asset_runs_successful_orchestration_and_cleans_up(
    tmp_path,
    monkeypatch,
) -> None:
    session_local, ids = build_media_processing_service_session()
    events: list[tuple[str, object]] = []
    file_path = tmp_path / "remote-audio.m4a"
    file_path.write_bytes(b"audio-bytes")

    monkeypatch.setattr(
        "app.services.media_processing.get_remote_media_retry_policy",
        lambda db, workspace_id: {"policy": "value"},
    )
    monkeypatch.setattr(
        "app.services.media_processing.mark_media_processing_started",
        lambda media: events.append(("mark_started", media.id)) or setattr(media, "processing_status", "processing"),
    )
    monkeypatch.setattr(
        "app.services.media_processing.acquire_media_processing_file",
        lambda db, media, **kwargs: events.append(("acquire", media.id))
        or MediaProcessingFileHandle(file_path=file_path, cleanup_temp_file=True),
    )
    monkeypatch.setattr(
        "app.services.media_processing.execute_media_processing_for_file",
        lambda db, media, resolved_file_path, *, retry_policy, extract_text_via_provider_fn: events.append(
            ("execute", {"media_id": media.id, "file_path": resolved_file_path, "retry_policy": retry_policy})
        ),
    )
    monkeypatch.setattr(
        "app.services.media_processing.finalize_media_processing",
        lambda db, media, *, rebuild_record_knowledge_fn: events.append(("finalize", media.id)) or media,
    )
    monkeypatch.setattr(
        "app.services.media_processing.cleanup_media_processing_file",
        lambda handle: events.append(("cleanup", handle.file_path if handle else None)),
    )

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
            metadata_json={},
            processing_status="pending",
        )
        db.add(media)
        db.commit()
        media_id = media.id

        result = process_media_asset(db, media_id)

    assert result.id == media_id
    assert events == [
        ("mark_started", media_id),
        ("acquire", media_id),
        (
            "execute",
            {
                "media_id": media_id,
                "file_path": file_path,
                "retry_policy": {"policy": "value"},
            },
        ),
        ("finalize", media_id),
        ("cleanup", file_path),
    ]


def test_process_media_asset_applies_failure_path_then_finalizes_and_cleans_up(
    tmp_path,
    monkeypatch,
) -> None:
    session_local, ids = build_media_processing_service_session()
    events: list[tuple[str, object]] = []
    file_path = tmp_path / "remote-audio.m4a"
    file_path.write_bytes(b"audio-bytes")

    monkeypatch.setattr(
        "app.services.media_processing.get_remote_media_retry_policy",
        lambda db, workspace_id: {"policy": "value"},
    )
    monkeypatch.setattr(
        "app.services.media_processing.mark_media_processing_started",
        lambda media: events.append(("mark_started", media.id)),
    )
    monkeypatch.setattr(
        "app.services.media_processing.acquire_media_processing_file",
        lambda db, media, **kwargs: events.append(("acquire", media.id))
        or MediaProcessingFileHandle(file_path=file_path, cleanup_temp_file=True),
    )

    def failing_execute(db, media, resolved_file_path, *, retry_policy, extract_text_via_provider_fn):
        events.append(("execute", media.id))
        raise RuntimeError("processing failed")

    monkeypatch.setattr("app.services.media_processing.execute_media_processing_for_file", failing_execute)
    monkeypatch.setattr(
        "app.services.media_processing.apply_media_processing_failure",
        lambda media, exc, *, retry_policy, file_path: events.append(
            (
                "failure",
                {
                    "media_id": media.id,
                    "error": str(exc),
                    "retry_policy": retry_policy,
                    "file_path": file_path,
                },
            )
        ),
    )
    monkeypatch.setattr(
        "app.services.media_processing.finalize_media_processing",
        lambda db, media, *, rebuild_record_knowledge_fn: events.append(("finalize", media.id)) or media,
    )
    monkeypatch.setattr(
        "app.services.media_processing.cleanup_media_processing_file",
        lambda handle: events.append(("cleanup", handle.file_path if handle else None)),
    )

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
            metadata_json={},
            processing_status="pending",
        )
        db.add(media)
        db.commit()
        media_id = media.id

        result = process_media_asset(db, media_id)

    assert result.id == media_id
    assert events == [
        ("mark_started", media_id),
        ("acquire", media_id),
        ("execute", media_id),
        (
            "failure",
            {
                "media_id": media_id,
                "error": "processing failed",
                "retry_policy": {"policy": "value"},
                "file_path": file_path,
            },
        ),
        ("finalize", media_id),
        ("cleanup", file_path),
    ]
