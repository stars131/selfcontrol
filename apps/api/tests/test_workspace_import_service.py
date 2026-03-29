from __future__ import annotations

import json
import zipfile
from io import BytesIO
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
from app.services.workspace_import import import_workspace_archive
from app.services.workspace_transfer_manifest import WORKSPACE_EXPORT_SCHEMA_VERSION


def build_workspace_import_service_session() -> tuple[sessionmaker, str]:
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
            username="service-import-owner",
            email="service-import-owner@example.com",
            password_hash="test-hash",
            display_name="Service Import Owner",
        )
        db.add(owner)
        db.flush()

        existing_workspace = Workspace(
            name="Existing Workspace",
            slug="custom-import",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(existing_workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=existing_workspace.id, user_id=owner.id, role="owner"))
        db.commit()
        owner_id = owner.id

    return session_local, owner_id


def build_archive_bytes(manifest: dict, files: dict[str, bytes] | None = None) -> bytes:
    archive_buffer = BytesIO()
    with zipfile.ZipFile(archive_buffer, mode="w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("manifest.json", json.dumps(manifest, ensure_ascii=False, indent=2))
        for archive_path, payload in (files or {}).items():
            archive.writestr(archive_path, payload)
    return archive_buffer.getvalue()


def test_import_workspace_archive_restores_local_and_reference_media(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.workspace_import.settings.storage_dir", str(tmp_path / "uploads"))
    rebuilt_record_ids: list[str] = []
    monkeypatch.setattr(
        "app.services.workspace_import.rebuild_record_knowledge",
        lambda db, record_id: rebuilt_record_ids.append(record_id),
    )
    session_local, owner_id = build_workspace_import_service_session()
    archive_bytes = build_archive_bytes(
        {
            "schema_version": WORKSPACE_EXPORT_SCHEMA_VERSION,
            "workspace": {"name": "Archive Workspace", "slug": "source-workspace"},
            "records": [
                {
                    "id": "record-old-1",
                    "type_code": "memo",
                    "title": "Imported service note",
                    "content": "Imported through service layer",
                    "source_type": "manual",
                    "status": "active",
                    "occurred_at": "2026-03-29T10:00:00+00:00",
                    "extra_data": {"category": "travel"},
                }
            ],
            "media_assets": [
                {
                    "id": "media-local-1",
                    "record_id": "record-old-1",
                    "media_type": "image",
                    "storage_provider": "local",
                    "archive_path": "media/record-old-1/photo.png",
                    "original_filename": "photo.png",
                    "mime_type": "image/png",
                    "size_bytes": 9,
                    "metadata_json": {"preview_kind": "image"},
                    "processing_status": "completed",
                    "extracted_text": "caption text",
                    "processed_at": "2026-03-29T10:02:00+00:00",
                },
                {
                    "id": "media-remote-1",
                    "record_id": "record-old-1",
                    "media_type": "audio",
                    "storage_provider": "s3",
                    "storage_key": "remote/archive/audio.m4a",
                    "original_filename": "audio.m4a",
                    "mime_type": "audio/mp4",
                    "size_bytes": 512,
                    "metadata_json": {"remote_reference": {"bucket": "archive", "object_key": "audio.m4a"}},
                    "processing_status": "completed",
                },
                {
                    "id": "media-skipped-1",
                    "record_id": "missing-record",
                    "media_type": "image",
                    "storage_provider": "local",
                    "archive_path": "media/missing-record/ghost.png",
                    "original_filename": "ghost.png",
                    "mime_type": "image/png",
                    "size_bytes": 10,
                    "metadata_json": {},
                },
            ],
        },
        files={"media/record-old-1/photo.png": b"png-bytes"},
    )

    with session_local() as db:
        workspace, result = import_workspace_archive(
            db,
            archive_bytes,
            owner_user_id=owner_id,
            workspace_name="  Imported From Service  ",
            workspace_slug="Custom Import",
        )
        imported_workspace_id = workspace.id

    assert workspace.name == "Imported From Service"
    assert workspace.slug == "custom-import-2"
    assert result == {
        "imported_record_count": 1,
        "imported_media_count": 2,
        "imported_reference_media_count": 1,
        "skipped_media_count": 1,
    }
    assert len(rebuilt_record_ids) == 1

    with session_local() as db:
        members = db.query(WorkspaceMember).filter(WorkspaceMember.workspace_id == imported_workspace_id).all()
        assert len(members) == 1
        assert members[0].role == "owner"

        records = db.query(Record).filter(Record.workspace_id == imported_workspace_id).all()
        assert len(records) == 1
        assert records[0].title == "Imported service note"
        assert records[0].extra_data["category"] == "travel"
        assert rebuilt_record_ids == [records[0].id]

        media_items = db.query(MediaAsset).filter(MediaAsset.workspace_id == imported_workspace_id).all()
        assert len(media_items) == 2
        media_by_name = {item.original_filename: item for item in media_items}

        local_media = media_by_name["photo.png"]
        local_file_path = Path(tmp_path) / local_media.storage_key
        assert local_media.storage_provider == "local"
        assert local_file_path.read_bytes() == b"png-bytes"
        assert local_media.extracted_text == "caption text"

        remote_media = media_by_name["audio.m4a"]
        assert remote_media.storage_provider == "s3"
        assert remote_media.storage_key == "remote/archive/audio.m4a"
        assert remote_media.processing_status == "deferred"
        assert remote_media.processing_error == "Reference-only remote media was imported without local file payload"
        assert remote_media.processed_at is None
        assert remote_media.metadata_json["import_mode"] == "reference_only"
        assert remote_media.metadata_json["remote_reference"]["bucket"] == "archive"
        assert "reference_only_imported_at" in remote_media.metadata_json


def test_import_workspace_archive_rejects_invalid_manifests() -> None:
    session_local, owner_id = build_workspace_import_service_session()

    with session_local() as db:
        try:
            import_workspace_archive(db, b"not-a-zip", owner_user_id=owner_id)
        except ValueError as exc:
            assert "Invalid ZIP archive" in str(exc)
        else:
            raise AssertionError("Expected invalid zip to fail")

        empty_zip_buffer = BytesIO()
        with zipfile.ZipFile(empty_zip_buffer, mode="w", compression=zipfile.ZIP_DEFLATED):
            pass
        try:
            import_workspace_archive(db, empty_zip_buffer.getvalue(), owner_user_id=owner_id)
        except ValueError as exc:
            assert "missing manifest.json" in str(exc)
        else:
            raise AssertionError("Expected missing manifest to fail")

        unsupported_schema = build_archive_bytes(
            {"schema_version": "workspace-export-v0", "workspace": {}, "records": [], "media_assets": []}
        )
        try:
            import_workspace_archive(db, unsupported_schema, owner_user_id=owner_id)
        except ValueError as exc:
            assert "Unsupported workspace export schema" in str(exc)
        else:
            raise AssertionError("Expected unsupported schema to fail")

        incomplete_manifest = build_archive_bytes(
            {"schema_version": WORKSPACE_EXPORT_SCHEMA_VERSION, "workspace": {"slug": "x"}}
        )
        try:
            import_workspace_archive(db, incomplete_manifest, owner_user_id=owner_id)
        except ValueError as exc:
            assert "Archive manifest is incomplete" in str(exc)
        else:
            raise AssertionError("Expected incomplete manifest to fail")
