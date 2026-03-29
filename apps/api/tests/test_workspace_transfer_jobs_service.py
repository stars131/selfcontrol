from __future__ import annotations

from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.models.workspace_transfer_job import WorkspaceTransferJob
from app.services.workspace_transfer_jobs import (
    create_workspace_export_job,
    create_workspace_import_job,
    dispatch_workspace_transfer_job,
    process_workspace_transfer_job,
    workspace_transfer_job_dir,
    workspace_transfer_jobs_root,
)


def build_workspace_transfer_jobs_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="service-transfer-user",
            email="service-transfer@example.com",
            password_hash="test-hash",
            display_name="Service Transfer User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Service Transfer Workspace",
            slug="service-transfer-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.commit()
        return session_local, {"user_id": user.id, "workspace_id": workspace.id}


def test_workspace_transfer_job_helpers_create_expected_files(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    session_local, ids = build_workspace_transfer_jobs_service_session()

    with session_local() as db:
        export_job = create_workspace_export_job(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["user_id"],
        )
        assert export_job.job_type == "export"
        assert export_job.status == "pending"
        assert export_job.workspace_id == ids["workspace_id"]

        import_job = create_workspace_import_job(
            db,
            created_by=ids["user_id"],
            archive_bytes=b"zip-bytes",
            original_filename="workspace-export.zip",
            workspace_name="Imported Workspace",
            workspace_slug="imported-workspace",
        )
        assert import_job.job_type == "import"
        assert import_job.status == "pending"
        assert import_job.payload_json["original_filename"] == "workspace-export.zip"
        assert import_job.payload_json["workspace_name"] == "Imported Workspace"
        assert import_job.payload_json["workspace_slug"] == "imported-workspace"
        assert (workspace_transfer_jobs_root() / import_job.id / "input.zip").read_bytes() == b"zip-bytes"


def test_process_workspace_transfer_job_completes_export_and_import_jobs(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    session_local, ids = build_workspace_transfer_jobs_service_session()

    export_archive_path = tmp_path / "generated-export.zip"
    export_archive_path.write_bytes(b"export-archive")
    imported_workspace = Workspace(
        id="imported-workspace-id",
        name="Imported Workspace",
        slug="imported-workspace",
        owner_id=ids["user_id"],
        visibility="private",
    )

    monkeypatch.setattr(
        "app.services.workspace_transfer_jobs.build_workspace_export_archive",
        lambda db, workspace_id, exported_by_user_id: (
            export_archive_path,
            {"record_count": 1, "media_count": 2},
        ),
    )
    monkeypatch.setattr(
        "app.services.workspace_transfer_jobs.import_workspace_archive",
        lambda db, archive_bytes, owner_user_id, workspace_name, workspace_slug: (
            imported_workspace,
            {"imported_record_count": 1, "imported_media_count": 2},
        ),
    )

    with session_local() as db:
        export_job = create_workspace_export_job(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["user_id"],
        )
        completed_export = process_workspace_transfer_job(db, export_job.id)
        assert completed_export.status == "completed"
        assert completed_export.result_json == {"record_count": 1, "media_count": 2}
        assert completed_export.artifact_filename == "output.zip"
        assert Path(completed_export.artifact_path).read_bytes() == b"export-archive"
        assert completed_export.completed_at is not None

        import_job = create_workspace_import_job(
            db,
            created_by=ids["user_id"],
            archive_bytes=b"import-archive",
            original_filename="workspace-export.zip",
        )
        completed_import = process_workspace_transfer_job(db, import_job.id)
        assert completed_import.status == "completed"
        assert completed_import.workspace_id == "imported-workspace-id"
        assert completed_import.result_json == {
            "imported_record_count": 1,
            "imported_media_count": 2,
            "workspace_id": "imported-workspace-id",
            "workspace_name": "Imported Workspace",
            "workspace_slug": "imported-workspace",
        }
        assert completed_import.completed_at is not None


def test_process_workspace_transfer_job_marks_failed_jobs(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    session_local, ids = build_workspace_transfer_jobs_service_session()

    with session_local() as db:
        failed_export_job = WorkspaceTransferJob(
            workspace_id=None,
            created_by=ids["user_id"],
            job_type="export",
            status="pending",
            payload_json={},
            result_json={},
        )
        db.add(failed_export_job)
        db.commit()
        db.refresh(failed_export_job)

        failed_export = process_workspace_transfer_job(db, failed_export_job.id)
        assert failed_export.status == "failed"
        assert failed_export.error_message == "Export job requires workspace_id"
        assert failed_export.completed_at is not None

        failed_import_job = WorkspaceTransferJob(
            workspace_id=None,
            created_by=ids["user_id"],
            job_type="import",
            status="pending",
            payload_json={},
            result_json={},
        )
        db.add(failed_import_job)
        db.commit()
        db.refresh(failed_import_job)

        failed_import = process_workspace_transfer_job(db, failed_import_job.id)
        assert failed_import.status == "failed"
        assert failed_import.error_message == "Import archive file is missing"
        assert failed_import.completed_at is not None


def test_dispatch_workspace_transfer_job_respects_sync_and_async_modes(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    session_local, ids = build_workspace_transfer_jobs_service_session()

    with session_local() as db:
        job = create_workspace_export_job(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["user_id"],
        )

        monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.media_processing_mode", "sync")
        monkeypatch.setattr(
            "app.services.workspace_transfer_jobs.process_workspace_transfer_job",
            lambda db, job_id: db.get(WorkspaceTransferJob, job_id),
        )
        sync_job, sync_mode = dispatch_workspace_transfer_job(db, job.id)
        assert sync_mode == "sync"
        assert sync_job.id == job.id

        queued_job_ids: list[str] = []
        monkeypatch.setattr("app.services.workspace_transfer_jobs.settings.media_processing_mode", "async")

        class FakeTask:
            @staticmethod
            def delay(job_id: str) -> None:
                queued_job_ids.append(job_id)

        monkeypatch.setattr("app.worker.process_workspace_transfer_job_task", FakeTask())
        async_job, async_mode = dispatch_workspace_transfer_job(db, job.id)
        assert async_mode == "async"
        assert async_job.id == job.id
        assert queued_job_ids == [job.id]
