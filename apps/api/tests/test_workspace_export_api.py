from __future__ import annotations

import json
import zipfile
from io import BytesIO
from pathlib import Path

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import workspaces as workspaces_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_workspace_export_client(tmp_path) -> tuple[TestClient, str, str, dict[str, str]]:
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
            username="owner-user",
            email="owner@example.com",
            password_hash="test-hash",
            display_name="Owner User",
        )
        editor = User(
            username="editor-user",
            email="editor@example.com",
            password_hash="test-hash",
            display_name="Editor User",
        )
        viewer = User(
            username="viewer-user",
            email="viewer@example.com",
            password_hash="test-hash",
            display_name="Viewer User",
        )
        db.add_all([owner, editor, viewer])
        db.flush()

        workspace = Workspace(
            name="Export Workspace",
            slug="export-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=editor.id, role="editor"),
                WorkspaceMember(workspace_id=workspace.id, user_id=viewer.id, role="viewer"),
            ]
        )
        record_item = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Tasty noodles",
            content="Very good lunch note",
            source_type="manual",
            status="active",
            extra_data={"location": {"place_name": "Noodle House"}},
        )
        db.add(record_item)
        db.flush()

        present_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=record_item.id,
            uploaded_by=owner.id,
            media_type="text",
            storage_provider="local",
            storage_key=f"uploads/{workspace.id}/note.txt",
            original_filename="note.txt",
            mime_type="text/plain",
            size_bytes=len(b"export me"),
            metadata_json={"preview_kind": "none"},
            processing_status="completed",
            extracted_text="export me",
        )
        missing_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=record_item.id,
            uploaded_by=owner.id,
            media_type="image",
            storage_provider="local",
            storage_key=f"uploads/{workspace.id}/missing.png",
            original_filename="missing.png",
            mime_type="image/png",
            size_bytes=128,
            metadata_json={"preview_kind": "image"},
            processing_status="completed",
            extracted_text="missing file",
        )
        db.add_all([present_media, missing_media])
        db.commit()

        user_ids = {"owner": owner.id, "editor": editor.id, "viewer": viewer.id}
        workspace_id = workspace.id
        record_id = record_item.id
        present_media_id = present_media.id
        missing_media_id = missing_media.id

    uploads_dir = tmp_path / "uploads" / workspace_id
    uploads_dir.mkdir(parents=True, exist_ok=True)
    (uploads_dir / "note.txt").write_bytes(b"export me")

    current_role = {"value": "owner"}

    app = FastAPI()
    app.include_router(workspaces_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        db = session_local()
        try:
            return db.get(User, user_ids[current_role["value"]])
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    client = TestClient(app)
    client.current_role = current_role  # type: ignore[attr-defined]
    client.export_context = {  # type: ignore[attr-defined]
        "record_id": record_id,
        "present_media_id": present_media_id,
        "missing_media_id": missing_media_id,
    }
    return client, workspace_id, record_id, user_ids


def test_workspace_export_returns_zip_with_manifest_and_media(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    client, workspace_id, record_id, _ = build_workspace_export_client(tmp_path)

    response = client.get(f"/api/v1/workspaces/{workspace_id}/export")

    assert response.status_code == 200
    assert response.headers["content-type"] == "application/zip"
    assert 'filename="export-workspace-export.zip"' in response.headers["content-disposition"]

    archive = zipfile.ZipFile(BytesIO(response.content))
    names = archive.namelist()
    assert "manifest.json" in names
    assert any(name.startswith(f"media/{record_id}/") and name.endswith("_note.txt") for name in names)

    manifest = json.loads(archive.read("manifest.json").decode("utf-8"))
    assert manifest["schema_version"] == "workspace-export-v1"
    assert manifest["workspace"]["slug"] == "export-workspace"
    assert manifest["counts"]["member_count"] == 3
    assert manifest["counts"]["record_count"] == 1
    assert manifest["counts"]["media_count"] == 2
    assert manifest["counts"]["exported_media_file_count"] == 1
    assert manifest["counts"]["missing_media_file_count"] == 1
    assert "provider secrets" in manifest["excluded"]

    media_by_name = {item["original_filename"]: item for item in manifest["media_assets"]}
    assert media_by_name["note.txt"]["missing_storage_file"] is False
    assert media_by_name["note.txt"]["archive_path"] is not None
    assert media_by_name["missing.png"]["missing_storage_file"] is True
    assert media_by_name["missing.png"]["archive_path"] is None


def test_workspace_export_is_owner_only(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    client, workspace_id, _record_id, _ = build_workspace_export_client(tmp_path)

    client.current_role["value"] = "editor"  # type: ignore[attr-defined]
    editor_response = client.get(f"/api/v1/workspaces/{workspace_id}/export")
    assert editor_response.status_code == 403

    client.current_role["value"] = "viewer"  # type: ignore[attr-defined]
    viewer_response = client.get(f"/api/v1/workspaces/{workspace_id}/export")
    assert viewer_response.status_code == 403
