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
from app.services.media_storage import (
    get_media_storage_tier,
    is_local_storage_provider,
    media_uses_local_storage,
    remove_storage_file,
    resolve_storage_path,
    summarize_workspace_media_storage,
)


def build_media_storage_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="media-storage-service-user",
            email="media-storage-service@example.com",
            password_hash="test-hash",
            display_name="Media Storage Service User",
        )
        db.add(user)
        db.flush()

        primary_workspace = Workspace(
            name="Primary Media Storage Workspace",
            slug="primary-media-storage-workspace",
            owner_id=user.id,
            visibility="private",
        )
        secondary_workspace = Workspace(
            name="Secondary Media Storage Workspace",
            slug="secondary-media-storage-workspace",
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
            title="Primary media record",
            content="Primary media record content",
            source_type="manual",
            extra_data={},
        )
        secondary_record = Record(
            workspace_id=secondary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Secondary media record",
            content="Secondary media record content",
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


def test_get_media_storage_tier_normalizes_explicit_metadata_and_defaults() -> None:
    explicit = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="image",
        storage_provider="local",
        storage_key="uploads/workspace-1/image.jpg",
        original_filename="image.jpg",
        mime_type="image/jpeg",
        size_bytes=10,
        metadata_json={"storage_tier": " Archive "},
        processing_status="completed",
    )
    implicit = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="image",
        storage_provider="local",
        storage_key="uploads/workspace-1/implicit.jpg",
        original_filename="implicit.jpg",
        mime_type="image/jpeg",
        size_bytes=10,
        metadata_json={},
        processing_status="completed",
    )

    assert get_media_storage_tier(explicit) == "archive"
    assert get_media_storage_tier(implicit) == "primary"


def test_media_storage_helpers_normalize_provider_codes_and_paths(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    local_media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="image",
        storage_provider=" Local ",
        storage_key="uploads/workspace-1/image.jpg",
        original_filename="image.jpg",
        mime_type="image/jpeg",
        size_bytes=10,
        metadata_json=None,
        processing_status="completed",
    )
    blank_tier_media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="image",
        storage_provider="custom",
        storage_key="remote/workspace-1/image.jpg",
        original_filename="image.jpg",
        mime_type="image/jpeg",
        size_bytes=10,
        metadata_json={"storage_tier": "   "},
        processing_status="completed",
    )

    assert is_local_storage_provider(None) is False
    assert is_local_storage_provider(" Local ") is True
    assert media_uses_local_storage(local_media) is True
    assert resolve_storage_path(local_media) == tmp_path / "uploads" / "workspace-1" / "image.jpg"
    assert get_media_storage_tier(local_media) == "primary"
    assert get_media_storage_tier(blank_tier_media) == "primary"


def test_remove_storage_file_deletes_local_file_and_preserves_remote_items(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    local_file = tmp_path / "uploads" / "workspace-1" / "nested" / "voice.m4a"
    local_file.parent.mkdir(parents=True, exist_ok=True)
    local_file.write_bytes(b"voice-bytes")

    local_media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="local",
        storage_key="uploads/workspace-1/nested/voice.m4a",
        original_filename="voice.m4a",
        mime_type="audio/mp4",
        size_bytes=11,
        metadata_json={},
        processing_status="completed",
    )
    remote_media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="s3",
        storage_key="remote/workspace-1/voice.m4a",
        original_filename="voice.m4a",
        mime_type="audio/mp4",
        size_bytes=11,
        metadata_json={},
        processing_status="completed",
    )

    assert remove_storage_file(local_media) is True
    assert local_file.exists() is False
    assert (tmp_path / "uploads" / "workspace-1" / "nested").exists() is False
    assert remove_storage_file(remote_media) is False


def test_remove_storage_file_returns_false_for_missing_local_file(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    missing_local_media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="local",
        storage_key="uploads/workspace-1/missing.m4a",
        original_filename="missing.m4a",
        mime_type="audio/mp4",
        size_bytes=11,
        metadata_json={},
        processing_status="completed",
    )

    assert remove_storage_file(missing_local_media) is False


def test_summarize_workspace_media_storage_reports_counts_sizes_and_missing_local_files(
    tmp_path,
    monkeypatch,
) -> None:
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    session_local, ids = build_media_storage_service_session()

    existing_local_path = tmp_path / "uploads" / ids["primary_workspace_id"] / "photo.jpg"
    existing_local_path.parent.mkdir(parents=True, exist_ok=True)
    existing_local_path.write_bytes(b"1234567890")

    with session_local() as db:
        db.add_all(
            [
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="image",
                    storage_provider="local",
                    storage_key=f"uploads/{ids['primary_workspace_id']}/photo.jpg",
                    original_filename="photo.jpg",
                    mime_type="image/jpeg",
                    size_bytes=10,
                    metadata_json={},
                    processing_status="completed",
                ),
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="video",
                    storage_provider="local",
                    storage_key=f"uploads/{ids['primary_workspace_id']}/missing.mp4",
                    original_filename="missing.mp4",
                    mime_type="video/mp4",
                    size_bytes=20,
                    metadata_json={},
                    processing_status="failed",
                ),
                MediaAsset(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="audio",
                    storage_provider="s3",
                    storage_key=f"remote/{ids['primary_workspace_id']}/clip.m4a",
                    original_filename="clip.m4a",
                    mime_type="audio/mp4",
                    size_bytes=30,
                    metadata_json={},
                    processing_status="completed",
                ),
                MediaAsset(
                    workspace_id=ids["secondary_workspace_id"],
                    record_id=ids["secondary_record_id"],
                    uploaded_by=ids["user_id"],
                    media_type="image",
                    storage_provider="local",
                    storage_key=f"uploads/{ids['secondary_workspace_id']}/other.jpg",
                    original_filename="other.jpg",
                    mime_type="image/jpeg",
                    size_bytes=99,
                    metadata_json={},
                    processing_status="completed",
                ),
            ]
        )
        db.commit()

        summary = summarize_workspace_media_storage(db, ids["primary_workspace_id"])

    assert summary == {
        "workspace_id": ids["primary_workspace_id"],
        "total_count": 3,
        "total_size_bytes": 60,
        "total_size_label": "60 B",
        "missing_file_count": 1,
        "by_media_type": {"image": 1, "video": 1, "audio": 1},
        "by_processing_status": {"completed": 2, "failed": 1},
        "largest_item_name": "clip.m4a",
        "largest_item_size_bytes": 30,
        "largest_item_size_label": "30 B",
    }


def test_summarize_workspace_media_storage_returns_empty_defaults_for_workspace_without_media() -> None:
    session_local, ids = build_media_storage_service_session()

    with session_local() as db:
        summary = summarize_workspace_media_storage(db, ids["primary_workspace_id"])

    assert summary == {
        "workspace_id": ids["primary_workspace_id"],
        "total_count": 0,
        "total_size_bytes": 0,
        "total_size_label": "0 B",
        "missing_file_count": 0,
        "by_media_type": {},
        "by_processing_status": {},
        "largest_item_name": None,
        "largest_item_size_bytes": None,
        "largest_item_size_label": None,
    }
