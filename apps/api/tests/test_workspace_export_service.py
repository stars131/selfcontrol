from __future__ import annotations

import json
import zipfile
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
from app.services.workspace_export import build_workspace_export_archive


def build_workspace_export_service_session(tmp_path) -> tuple[sessionmaker, str, str]:
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
            username="service-owner",
            email="service-owner@example.com",
            password_hash="test-hash",
            display_name="Service Owner",
        )
        collaborator = User(
            username="service-editor",
            email="service-editor@example.com",
            password_hash="test-hash",
            display_name="Service Editor",
        )
        db.add_all([owner, collaborator])
        db.flush()

        workspace = Workspace(
            name="Service Export Workspace",
            slug="service-export-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=collaborator.id, role="editor"),
            ]
        )

        record_item = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Braised noodles",
            content="Worth revisiting",
            source_type="manual",
            status="active",
            extra_data={"category": "lunch"},
        )
        db.add(record_item)
        db.flush()

        db.add_all(
            [
                MediaAsset(
                    workspace_id=workspace.id,
                    record_id=record_item.id,
                    uploaded_by=owner.id,
                    media_type="image",
                    storage_provider="local",
                    storage_key=f"uploads/{workspace.id}/braised noodles!!.jpg",
                    original_filename="braised noodles!!.jpg",
                    mime_type="image/jpeg",
                    size_bytes=11,
                    metadata_json={
                        "preview_kind": "image",
                        "authorization": {"token": "hidden"},
                        "nested": {"signed_url": "https://example.invalid/signed"},
                    },
                    processing_status="completed",
                    extracted_text="menu board",
                ),
                MediaAsset(
                    workspace_id=workspace.id,
                    record_id=record_item.id,
                    uploaded_by=owner.id,
                    media_type="audio",
                    storage_provider="s3",
                    storage_key=f"remote/{workspace.id}/voice-note.m4a",
                    original_filename="voice-note.m4a",
                    mime_type="audio/mp4",
                    size_bytes=512,
                    metadata_json={
                        "remote_reference": {"bucket": "exports", "object_key": "voice-note.m4a"},
                        "headers": {"Authorization": "secret"},
                    },
                    processing_status="completed",
                    extracted_text="remote transcript",
                ),
            ]
        )
        db.commit()
        owner_id = owner.id
        workspace_id = workspace.id

    uploads_dir = tmp_path / "uploads" / workspace_id
    uploads_dir.mkdir(parents=True, exist_ok=True)
    (uploads_dir / "braised noodles!!.jpg").write_bytes(b"image-bytes!")
    return session_local, workspace_id, owner_id


def test_build_workspace_export_archive_embeds_local_media_and_sanitizes_manifest(
    tmp_path,
    monkeypatch,
) -> None:
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    session_local, workspace_id, owner_id = build_workspace_export_service_session(tmp_path)

    with session_local() as db:
        archive_path, counts = build_workspace_export_archive(
            db,
            workspace_id,
            exported_by_user_id=owner_id,
        )

    try:
        assert counts == {
            "member_count": 2,
            "record_count": 1,
            "media_count": 2,
            "exported_media_file_count": 1,
            "missing_media_file_count": 0,
            "reference_only_media_count": 1,
            "remote_media_count": 1,
        }

        with zipfile.ZipFile(archive_path) as archive:
            names = archive.namelist()
            assert "manifest.json" in names
            assert any(
                name.startswith("media/") and name.endswith("_braised-noodles.jpg")
                for name in names
            )
            manifest = json.loads(archive.read("manifest.json").decode("utf-8"))

        assert manifest["workspace"]["slug"] == "service-export-workspace"
        assert manifest["counts"] == counts
        assert manifest["excluded"] == [
            "provider secrets",
            "access tokens",
            "share tokens",
        ]

        media_by_name = {item["original_filename"]: item for item in manifest["media_assets"]}
        local_media = media_by_name["braised noodles!!.jpg"]
        assert local_media["export_mode"] == "embedded_file"
        assert local_media["archive_path"].endswith("_braised-noodles.jpg")
        assert "authorization" not in local_media["metadata_json"]
        assert "signed_url" not in local_media["metadata_json"]["nested"]

        remote_media = media_by_name["voice-note.m4a"]
        assert remote_media["export_mode"] == "reference_only"
        assert remote_media["export_skip_reason"] == "remote_storage_reference_only"
        assert remote_media["archive_path"] is None
        assert remote_media["metadata_json"]["remote_reference"]["bucket"] == "exports"
        assert "headers" not in remote_media["metadata_json"]
    finally:
        archive_path.unlink(missing_ok=True)


def test_build_workspace_export_archive_rejects_missing_workspace(tmp_path) -> None:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        try:
            build_workspace_export_archive(db, "missing-workspace", exported_by_user_id="user-1")
        except ValueError as exc:
            assert "Workspace not found" in str(exc)
        else:
            raise AssertionError("Expected missing workspace export to fail")
