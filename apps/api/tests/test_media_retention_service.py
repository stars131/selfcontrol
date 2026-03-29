from __future__ import annotations

from datetime import datetime, timedelta, timezone
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
from app.services.media_retention import (
    archive_workspace_media_item,
    archive_workspace_media_retention,
    cleanup_workspace_media_retention,
)
from app.services.media_retention_actions import MediaRetentionActionSelection


def build_media_retention_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="media-retention-service-user",
            email="media-retention-service@example.com",
            password_hash="test-hash",
            display_name="Media Retention Service User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Media Retention Workspace",
            slug="media-retention-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.flush()

        record_one = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Record one",
            content="Record one content",
            source_type="manual",
            extra_data={},
        )
        record_two = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Record two",
            content="Record two content",
            source_type="manual",
            extra_data={},
        )
        db.add_all([record_one, record_two])
        db.commit()
        return session_local, {
            "user_id": user.id,
            "workspace_id": workspace.id,
            "record_one_id": record_one.id,
            "record_two_id": record_two.id,
        }


def test_archive_workspace_media_item_moves_local_file_and_updates_metadata(
    tmp_path,
    monkeypatch,
) -> None:
    monkeypatch.setattr("app.services.media_retention.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))

    original_file = tmp_path / "uploads" / "workspace-1" / "photo.jpg"
    original_file.parent.mkdir(parents=True, exist_ok=True)
    original_file.write_bytes(b"primary-photo")

    conflicting_archive = tmp_path / "archive" / "workspace-1" / "photo.jpg"
    conflicting_archive.parent.mkdir(parents=True, exist_ok=True)
    conflicting_archive.write_bytes(b"existing-archive")

    media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="image",
        storage_provider="local",
        storage_key="uploads/workspace-1/photo.jpg",
        original_filename="photo.jpg",
        mime_type="image/jpeg",
        size_bytes=13,
        metadata_json={"note": "keep"},
        processing_status="completed",
    )

    archived = archive_workspace_media_item(media)
    archive_file = tmp_path / "archive" / "workspace-1" / "photo-2.jpg"

    assert archived is True
    assert original_file.exists() is False
    assert archive_file.read_bytes() == b"primary-photo"
    assert Path(media.storage_key).as_posix() == "archive/workspace-1/photo-2.jpg"
    assert media.metadata_json["note"] == "keep"
    assert media.metadata_json["storage_tier"] == "archive"
    assert isinstance(media.metadata_json["archived_at"], str)


def test_archive_workspace_media_item_returns_false_for_remote_or_missing_files(
    tmp_path,
    monkeypatch,
) -> None:
    monkeypatch.setattr("app.services.media_retention.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))

    remote_media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="s3",
        storage_key="remote/workspace-1/clip.m4a",
        original_filename="clip.m4a",
        mime_type="audio/mp4",
        size_bytes=10,
        metadata_json={},
        processing_status="completed",
    )
    missing_local_media = MediaAsset(
        workspace_id="workspace-1",
        record_id="record-1",
        uploaded_by="user-1",
        media_type="audio",
        storage_provider="local",
        storage_key="uploads/workspace-1/missing.m4a",
        original_filename="missing.m4a",
        mime_type="audio/mp4",
        size_bytes=10,
        metadata_json={},
        processing_status="completed",
    )

    assert archive_workspace_media_item(remote_media) is False
    assert archive_workspace_media_item(missing_local_media) is False


def test_cleanup_workspace_media_retention_deletes_candidates_rebuilds_records_and_purges_orphans(
    tmp_path,
    monkeypatch,
) -> None:
    session_local, ids = build_media_retention_service_session()
    orphan_file = tmp_path / "uploads" / ids["workspace_id"] / "orphan.bin"
    orphan_file.parent.mkdir(parents=True, exist_ok=True)
    orphan_file.write_bytes(b"orphan-bytes")
    removed_media_ids: list[str] = []
    rebuilt_record_ids: list[str] = []
    removed_orphan_paths: list[Path] = []

    with session_local() as db:
        media_one = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_one_id"],
            uploaded_by=ids["user_id"],
            media_type="image",
            storage_provider="local",
            storage_key=f"uploads/{ids['workspace_id']}/one.jpg",
            original_filename="one.jpg",
            mime_type="image/jpeg",
            size_bytes=10,
            metadata_json={},
            processing_status="completed",
            created_at=datetime.now(timezone.utc) - timedelta(days=120),
        )
        media_two = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_two_id"],
            uploaded_by=ids["user_id"],
            media_type="video",
            storage_provider="local",
            storage_key=f"uploads/{ids['workspace_id']}/two.mp4",
            original_filename="two.mp4",
            mime_type="video/mp4",
            size_bytes=20,
            metadata_json={},
            processing_status="completed",
            created_at=datetime.now(timezone.utc) - timedelta(days=130),
        )
        db.add_all([media_one, media_two])
        db.commit()

        monkeypatch.setattr(
            "app.services.media_retention.select_cleanup_media_candidates",
            lambda items, media_ids, older_than_days: MediaRetentionActionSelection(
                candidate_items=[items[0]],
                affected_record_ids={items[0].record_id},
                skipped_reason_by_media_id={items[1].id: "not_selected"},
                tracked_storage_keys={item.storage_key for item in items},
            ),
        )
        monkeypatch.setattr(
            "app.services.media_retention.list_workspace_orphan_files",
            lambda workspace_id, tracked_storage_keys: [orphan_file],
        )
        monkeypatch.setattr(
            "app.services.media_retention.build_media_retention_action_result",
            lambda **kwargs: {
                "workspace_id": kwargs["workspace_id"],
                "candidate_media_count": len(kwargs["selection"].candidate_items),
                "orphan_file_count": len(kwargs["orphan_files"]),
            },
        )
        monkeypatch.setattr(
            "app.services.media_retention.remove_storage_file",
            lambda item: removed_media_ids.append(item.id) or True,
        )
        monkeypatch.setattr(
            "app.services.media_retention.rebuild_record_knowledge",
            lambda db, record_id: rebuilt_record_ids.append(record_id),
        )
        monkeypatch.setattr(
            "app.services.media_retention.remove_file_and_cleanup_dirs",
            lambda file_path: removed_orphan_paths.append(file_path),
        )

        result = cleanup_workspace_media_retention(
            db,
            ids["workspace_id"],
            media_ids=[media_one.id],
            older_than_days=90,
            purge_orphan_files=True,
            dry_run=False,
        )
        remaining_ids = [item.id for item in db.query(MediaAsset).order_by(MediaAsset.id.asc()).all()]

    assert result == {
        "workspace_id": ids["workspace_id"],
        "candidate_media_count": 1,
        "orphan_file_count": 1,
    }
    assert removed_media_ids == [media_one.id]
    assert rebuilt_record_ids == [ids["record_one_id"]]
    assert removed_orphan_paths == [orphan_file]
    assert remaining_ids == [media_two.id]


def test_cleanup_workspace_media_retention_dry_run_avoids_mutation_side_effects(
    monkeypatch,
) -> None:
    session_local, ids = build_media_retention_service_session()
    removed_media_ids: list[str] = []
    rebuilt_record_ids: list[str] = []
    removed_orphan_paths: list[Path] = []

    with session_local() as db:
        media_one = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_one_id"],
            uploaded_by=ids["user_id"],
            media_type="image",
            storage_provider="local",
            storage_key=f"uploads/{ids['workspace_id']}/one.jpg",
            original_filename="one.jpg",
            mime_type="image/jpeg",
            size_bytes=10,
            metadata_json={},
            processing_status="completed",
            created_at=datetime.now(timezone.utc) - timedelta(days=120),
        )
        db.add(media_one)
        db.commit()

        monkeypatch.setattr(
            "app.services.media_retention.select_cleanup_media_candidates",
            lambda items, media_ids, older_than_days: MediaRetentionActionSelection(
                candidate_items=[items[0]],
                affected_record_ids={items[0].record_id},
                tracked_storage_keys={items[0].storage_key},
            ),
        )
        monkeypatch.setattr(
            "app.services.media_retention.list_workspace_orphan_files",
            lambda workspace_id, tracked_storage_keys: [],
        )
        monkeypatch.setattr(
            "app.services.media_retention.build_media_retention_action_result",
            lambda **kwargs: {"dry_run": kwargs["dry_run"]},
        )
        monkeypatch.setattr(
            "app.services.media_retention.remove_storage_file",
            lambda item: removed_media_ids.append(item.id) or True,
        )
        monkeypatch.setattr(
            "app.services.media_retention.rebuild_record_knowledge",
            lambda db, record_id: rebuilt_record_ids.append(record_id),
        )
        monkeypatch.setattr(
            "app.services.media_retention.remove_file_and_cleanup_dirs",
            lambda file_path: removed_orphan_paths.append(file_path),
        )

        result = cleanup_workspace_media_retention(
            db,
            ids["workspace_id"],
            media_ids=[media_one.id],
            older_than_days=90,
            purge_orphan_files=True,
            dry_run=True,
        )
        remaining_count = db.query(MediaAsset).count()

    assert result == {"dry_run": True}
    assert removed_media_ids == []
    assert rebuilt_record_ids == []
    assert removed_orphan_paths == []
    assert remaining_count == 1


def test_archive_workspace_media_retention_updates_items_and_rebuilds_records(
    monkeypatch,
) -> None:
    session_local, ids = build_media_retention_service_session()
    archived_media_ids: list[str] = []
    rebuilt_record_ids: list[str] = []

    with session_local() as db:
        media_one = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_one_id"],
            uploaded_by=ids["user_id"],
            media_type="image",
            storage_provider="local",
            storage_key=f"uploads/{ids['workspace_id']}/one.jpg",
            original_filename="one.jpg",
            mime_type="image/jpeg",
            size_bytes=10,
            metadata_json={},
            processing_status="completed",
            created_at=datetime.now(timezone.utc) - timedelta(days=120),
        )
        media_two = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_two_id"],
            uploaded_by=ids["user_id"],
            media_type="video",
            storage_provider="local",
            storage_key=f"uploads/{ids['workspace_id']}/two.mp4",
            original_filename="two.mp4",
            mime_type="video/mp4",
            size_bytes=20,
            metadata_json={},
            processing_status="completed",
            created_at=datetime.now(timezone.utc) - timedelta(days=130),
        )
        db.add_all([media_one, media_two])
        db.commit()
        media_two_id = media_two.id

        monkeypatch.setattr(
            "app.services.media_retention.select_archive_media_candidates",
            lambda items, media_ids, older_than_days: MediaRetentionActionSelection(
                candidate_items=[items[1]],
                affected_record_ids={items[1].record_id},
                skipped_reason_by_media_id={items[0].id: "not_selected"},
            ),
        )
        monkeypatch.setattr(
            "app.services.media_retention.build_media_retention_action_result",
            lambda **kwargs: {
                "workspace_id": kwargs["workspace_id"],
                "candidate_media_count": len(kwargs["selection"].candidate_items),
            },
        )
        monkeypatch.setattr(
            "app.services.media_retention.archive_workspace_media_item",
            lambda item: archived_media_ids.append(item.id) or True,
        )
        monkeypatch.setattr(
            "app.services.media_retention.rebuild_record_knowledge",
            lambda db, record_id: rebuilt_record_ids.append(record_id),
        )

        result = archive_workspace_media_retention(
            db,
            ids["workspace_id"],
            media_ids=[media_two.id],
            older_than_days=90,
            dry_run=False,
        )

    assert result == {
        "workspace_id": ids["workspace_id"],
        "candidate_media_count": 1,
    }
    assert archived_media_ids == [media_two_id]
    assert rebuilt_record_ids == [ids["record_two_id"]]


def test_archive_workspace_media_retention_dry_run_skips_archiving_and_rebuilds(
    monkeypatch,
) -> None:
    session_local, ids = build_media_retention_service_session()
    archived_media_ids: list[str] = []
    rebuilt_record_ids: list[str] = []

    with session_local() as db:
        media_one = MediaAsset(
            workspace_id=ids["workspace_id"],
            record_id=ids["record_one_id"],
            uploaded_by=ids["user_id"],
            media_type="image",
            storage_provider="local",
            storage_key=f"uploads/{ids['workspace_id']}/one.jpg",
            original_filename="one.jpg",
            mime_type="image/jpeg",
            size_bytes=10,
            metadata_json={},
            processing_status="completed",
            created_at=datetime.now(timezone.utc) - timedelta(days=120),
        )
        db.add(media_one)
        db.commit()

        monkeypatch.setattr(
            "app.services.media_retention.select_archive_media_candidates",
            lambda items, media_ids, older_than_days: MediaRetentionActionSelection(
                candidate_items=[items[0]],
                affected_record_ids={items[0].record_id},
            ),
        )
        monkeypatch.setattr(
            "app.services.media_retention.build_media_retention_action_result",
            lambda **kwargs: {"dry_run": kwargs["dry_run"]},
        )
        monkeypatch.setattr(
            "app.services.media_retention.archive_workspace_media_item",
            lambda item: archived_media_ids.append(item.id) or True,
        )
        monkeypatch.setattr(
            "app.services.media_retention.rebuild_record_knowledge",
            lambda db, record_id: rebuilt_record_ids.append(record_id),
        )

        result = archive_workspace_media_retention(
            db,
            ids["workspace_id"],
            media_ids=[media_one.id],
            older_than_days=90,
            dry_run=True,
        )

    assert result == {"dry_run": True}
    assert archived_media_ids == []
    assert rebuilt_record_ids == []
