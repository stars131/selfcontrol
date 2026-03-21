from __future__ import annotations

import shutil
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.workspace_transfer_job import WorkspaceTransferJob
from app.services.workspace_export import build_workspace_export_archive
from app.services.workspace_import import import_workspace_archive


def workspace_transfer_jobs_root() -> Path:
    root = Path(settings.processing_tmp_dir) / "workspace-transfer-jobs"
    root.mkdir(parents=True, exist_ok=True)
    return root


def workspace_transfer_job_dir(job_id: str) -> Path:
    root = workspace_transfer_jobs_root() / job_id
    root.mkdir(parents=True, exist_ok=True)
    return root


def create_workspace_export_job(db: Session, *, workspace_id: str, created_by: str) -> WorkspaceTransferJob:
    job = WorkspaceTransferJob(
        workspace_id=workspace_id,
        created_by=created_by,
        job_type="export",
        status="pending",
        payload_json={},
        result_json={},
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def create_workspace_import_job(
    db: Session,
    *,
    created_by: str,
    archive_bytes: bytes,
    original_filename: str,
    workspace_name: str | None = None,
    workspace_slug: str | None = None,
) -> WorkspaceTransferJob:
    job = WorkspaceTransferJob(
        workspace_id=None,
        created_by=created_by,
        job_type="import",
        status="pending",
        payload_json={
            "original_filename": original_filename,
            "workspace_name": workspace_name,
            "workspace_slug": workspace_slug,
        },
        result_json={},
    )
    db.add(job)
    db.commit()
    db.refresh(job)

    input_path = workspace_transfer_job_dir(job.id) / "input.zip"
    input_path.write_bytes(archive_bytes)
    return job


def _job_input_path(job: WorkspaceTransferJob) -> Path:
    return workspace_transfer_job_dir(job.id) / "input.zip"


def _job_output_path(job: WorkspaceTransferJob) -> Path:
    return workspace_transfer_job_dir(job.id) / "output.zip"


def process_workspace_transfer_job(db: Session, job_id: str) -> WorkspaceTransferJob:
    job = db.get(WorkspaceTransferJob, job_id)
    if not job:
        raise ValueError("Workspace transfer job not found")
    if job.status == "completed":
        return job

    job.status = "running"
    job.error_message = None
    db.add(job)
    db.commit()
    db.refresh(job)

    try:
        if job.job_type == "export":
            if not job.workspace_id:
                raise ValueError("Export job requires workspace_id")
            archive_path, counts = build_workspace_export_archive(
                db,
                job.workspace_id,
                exported_by_user_id=job.created_by,
            )
            output_path = _job_output_path(job)
            shutil.move(str(archive_path), output_path)
            job.artifact_path = str(output_path)
            job.artifact_filename = Path(output_path).name
            job.result_json = counts
        elif job.job_type == "import":
            input_path = _job_input_path(job)
            if not input_path.exists():
                raise ValueError("Import archive file is missing")
            workspace, counts = import_workspace_archive(
                db,
                input_path.read_bytes(),
                owner_user_id=job.created_by,
                workspace_name=job.payload_json.get("workspace_name"),
                workspace_slug=job.payload_json.get("workspace_slug"),
            )
            job.workspace_id = workspace.id
            job.result_json = {
                **counts,
                "workspace_id": workspace.id,
                "workspace_name": workspace.name,
                "workspace_slug": workspace.slug,
            }
        else:
            raise ValueError("Unsupported workspace transfer job type")

        job.status = "completed"
        job.completed_at = datetime.now(timezone.utc)
        db.add(job)
        db.commit()
        db.refresh(job)
        return job
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        job = db.get(WorkspaceTransferJob, job_id)
        if not job:
            raise
        job.status = "failed"
        job.error_message = str(exc)
        job.completed_at = datetime.now(timezone.utc)
        db.add(job)
        db.commit()
        db.refresh(job)
        return job


def dispatch_workspace_transfer_job(db: Session, job_id: str) -> tuple[WorkspaceTransferJob, str]:
    job = db.get(WorkspaceTransferJob, job_id)
    if not job:
        raise ValueError("Workspace transfer job not found")

    if settings.media_processing_mode == "async":
        from app.worker import process_workspace_transfer_job_task

        process_workspace_transfer_job_task.delay(job_id)
        return job, "async"

    return process_workspace_transfer_job(db, job_id), "sync"
