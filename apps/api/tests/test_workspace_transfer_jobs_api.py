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
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_workspace_transfer_client(tmp_path, monkeypatch) -> tuple[TestClient, str]:
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
            username="transfer-user",
            email="transfer@example.com",
            password_hash="test-hash",
            display_name="Transfer User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Transfer Workspace",
            slug="transfer-workspace",
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
            title="Transfer record",
            content="transfer content",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add(record_item)
        db.flush()
        db.add(
            MediaAsset(
                workspace_id=workspace.id,
                record_id=record_item.id,
                uploaded_by=user.id,
                media_type="text",
                storage_provider="local",
                storage_key=f"uploads/{workspace.id}/note.txt",
                original_filename="note.txt",
                mime_type="text/plain",
                size_bytes=len(b"job file"),
                metadata_json={"preview_kind": "none"},
                processing_status="completed",
                extracted_text="job file",
            )
        )
        db.commit()
        user_id = user.id
        workspace_id = workspace.id

    uploads_dir = tmp_path / "uploads" / workspace_id
    uploads_dir.mkdir(parents=True, exist_ok=True)
    (uploads_dir / "note.txt").write_bytes(b"job file")

    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.workspace_import.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.processing_tmp_dir", str(tmp_path / "tmp"))
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
    return TestClient(app), workspace_id


def test_workspace_export_job_completes_and_downloads_artifact(tmp_path, monkeypatch) -> None:
    client, workspace_id = build_workspace_transfer_client(tmp_path, monkeypatch)

    response = client.post(f"/api/v1/workspaces/{workspace_id}/export-jobs")
    assert response.status_code == 200
    payload = response.json()["data"]
    assert payload["dispatch_mode"] == "sync"
    assert payload["job"]["status"] == "completed"

    jobs_response = client.get("/api/v1/workspaces/jobs/transfer")
    assert jobs_response.status_code == 200
    assert len(jobs_response.json()["data"]["items"]) == 1

    job_id = payload["job"]["id"]
    download_response = client.get(f"/api/v1/workspaces/jobs/transfer/{job_id}/download")
    assert download_response.status_code == 200
    assert download_response.headers["content-type"] == "application/zip"


def test_workspace_import_job_completes_and_creates_workspace(tmp_path, monkeypatch) -> None:
    client, workspace_id = build_workspace_transfer_client(tmp_path, monkeypatch)

    export_response = client.get(f"/api/v1/workspaces/{workspace_id}/export")
    assert export_response.status_code == 200

    import_response = client.post(
        "/api/v1/workspaces/import-jobs",
        files={"file": ("workspace-export.zip", BytesIO(export_response.content), "application/zip")},
    )
    assert import_response.status_code == 200
    payload = import_response.json()["data"]
    assert payload["dispatch_mode"] == "sync"
    assert payload["job"]["status"] == "completed"
    assert payload["job"]["job_type"] == "import"
    assert payload["job"]["result_json"]["workspace_id"]


def test_workspace_transfer_jobs_queue_when_async_mode_enabled(tmp_path, monkeypatch) -> None:
    client, workspace_id = build_workspace_transfer_client(tmp_path, monkeypatch)
    queued_job_ids: list[str] = []

    monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.media_processing_mode", "async")

    class FakeTask:
        @staticmethod
        def delay(job_id: str) -> None:
            queued_job_ids.append(job_id)

    monkeypatch.setattr("app.worker.process_workspace_transfer_job_task", FakeTask())

    response = client.post(f"/api/v1/workspaces/{workspace_id}/export-jobs")
    assert response.status_code == 200
    payload = response.json()["data"]
    assert payload["dispatch_mode"] == "async"
    assert payload["job"]["status"] == "pending"
    assert queued_job_ids == [payload["job"]["id"]]
