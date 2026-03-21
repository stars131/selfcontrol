from __future__ import annotations

from io import BytesIO

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


def build_workspace_import_client(tmp_path, monkeypatch) -> tuple[TestClient, sessionmaker, str]:
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
            username="import-user",
            email="import@example.com",
            password_hash="test-hash",
            display_name="Import User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Source Workspace",
            slug="source-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        record_item = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Source record",
            content="record content",
            source_type="manual",
            status="active",
            extra_data={"category": "food"},
        )
        db.add(record_item)
        db.flush()

        db.add_all(
            [
                MediaAsset(
                    workspace_id=workspace.id,
                    record_id=record_item.id,
                    uploaded_by=user.id,
                    media_type="text",
                    storage_provider="local",
                    storage_key=f"uploads/{workspace.id}/keep.txt",
                    original_filename="keep.txt",
                    mime_type="text/plain",
                    size_bytes=len(b"keep me"),
                    metadata_json={"preview_kind": "none"},
                    processing_status="completed",
                    extracted_text="keep me",
                ),
                MediaAsset(
                    workspace_id=workspace.id,
                    record_id=record_item.id,
                    uploaded_by=user.id,
                    media_type="image",
                    storage_provider="local",
                    storage_key=f"uploads/{workspace.id}/missing.png",
                    original_filename="missing.png",
                    mime_type="image/png",
                    size_bytes=128,
                    metadata_json={"preview_kind": "image"},
                    processing_status="completed",
                ),
            ]
        )
        db.commit()
        user_id = user.id
        workspace_id = workspace.id

    uploads_dir = tmp_path / "uploads" / workspace_id
    uploads_dir.mkdir(parents=True, exist_ok=True)
    (uploads_dir / "keep.txt").write_bytes(b"keep me")

    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.workspace_import.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.workspace_import.rebuild_record_knowledge", lambda db, record_id: None)
    monkeypatch.setattr(workspaces_route, "log_audit_event", lambda *args, **kwargs: None)

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
            return db.get(User, user_id)
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, workspace_id


def test_workspace_import_restores_records_and_available_media(tmp_path, monkeypatch) -> None:
    client, session_local, source_workspace_id = build_workspace_import_client(tmp_path, monkeypatch)

    export_response = client.get(f"/api/v1/workspaces/{source_workspace_id}/export")
    assert export_response.status_code == 200

    import_response = client.post(
        "/api/v1/workspaces/import",
        files={"file": ("workspace-export.zip", BytesIO(export_response.content), "application/zip")},
    )

    assert import_response.status_code == 200
    result = import_response.json()["data"]["result"]
    assert result["imported_record_count"] == 1
    assert result["imported_media_count"] == 1
    assert result["skipped_media_count"] == 1
    assert result["workspace"]["slug"].startswith("source-workspace-import")
    assert result["workspace"]["slug"] != "source-workspace"

    imported_workspace_id = result["workspace"]["id"]
    with session_local() as db:
        imported_workspace = db.get(Workspace, imported_workspace_id)
        assert imported_workspace is not None
        members = db.query(WorkspaceMember).filter(WorkspaceMember.workspace_id == imported_workspace_id).all()
        assert len(members) == 1
        assert members[0].role == "owner"

        records = db.query(Record).filter(Record.workspace_id == imported_workspace_id).all()
        assert len(records) == 1
        assert records[0].title == "Source record"
        assert records[0].extra_data["category"] == "food"

        media_items = db.query(MediaAsset).filter(MediaAsset.workspace_id == imported_workspace_id).all()
        assert len(media_items) == 1
        assert media_items[0].original_filename == "keep.txt"
        imported_file_path = tmp_path / media_items[0].storage_key
        assert imported_file_path.read_bytes() == b"keep me"


def test_workspace_import_rejects_invalid_archive(tmp_path, monkeypatch) -> None:
    client, _session_local, _workspace_id = build_workspace_import_client(tmp_path, monkeypatch)

    response = client.post(
        "/api/v1/workspaces/import",
        files={"file": ("broken.zip", BytesIO(b"not-a-zip"), "application/zip")},
    )

    assert response.status_code == 400
