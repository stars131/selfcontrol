from __future__ import annotations

from pathlib import Path

from fastapi import HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.models.workspace import Workspace, WorkspaceMember
from app.models.workspace_transfer_job import WorkspaceTransferJob


def serialize_workspace(workspace: Workspace, role: str) -> dict:
    return {
        "id": workspace.id,
        "name": workspace.name,
        "slug": workspace.slug,
        "owner_id": workspace.owner_id,
        "visibility": workspace.visibility,
        "role": role,
        "created_at": workspace.created_at,
    }


def serialize_workspace_member(member: WorkspaceMember) -> dict:
    return {
        "id": member.id,
        "workspace_id": member.workspace_id,
        "user_id": member.user_id,
        "role": member.role,
        "username": member.user.username,
        "email": member.user.email,
        "display_name": member.user.display_name,
        "created_at": member.created_at,
    }


def serialize_workspace_transfer_job(job: WorkspaceTransferJob) -> dict:
    return {
        "id": job.id,
        "workspace_id": job.workspace_id,
        "created_by": job.created_by,
        "job_type": job.job_type,
        "status": job.status,
        "payload_json": job.payload_json,
        "result_json": job.result_json,
        "artifact_filename": job.artifact_filename,
        "error_message": job.error_message,
        "created_at": job.created_at,
        "updated_at": job.updated_at,
        "completed_at": job.completed_at,
    }


def cleanup_export_archive(path: Path) -> None:
    try:
        path.unlink(missing_ok=True)
    except Exception:  # noqa: BLE001
        return


def resolve_workspace_role_for_user(workspace: Workspace, user_id: str) -> str:
    return next(
        (
            membership.role
            for membership in workspace.members
            if membership.user_id == user_id
        ),
        "viewer",
    )


def get_workspace_transfer_job_for_user_or_404(
    db: Session,
    *,
    job_id: str,
    current_user_id: str,
) -> WorkspaceTransferJob:
    job = db.get(WorkspaceTransferJob, job_id)
    if not job or job.created_by != current_user_id:
        raise HTTPException(status_code=404, detail="Workspace transfer job not found")
    return job


def build_workspace_transfer_job_download_response(job: WorkspaceTransferJob):
    if job.job_type != "export" or job.status != "completed" or not job.artifact_path:
        raise HTTPException(status_code=400, detail="Job artifact is not available")

    artifact_path = Path(job.artifact_path)
    if not artifact_path.exists():
        raise HTTPException(status_code=404, detail="Job artifact file not found")
    filename = job.artifact_filename or f"workspace-transfer-{job.id}.zip"
    return FileResponse(path=artifact_path, media_type="application/zip", filename=filename)


def get_workspace_member_or_404(db: Session, *, workspace_id: str, member_id: str) -> WorkspaceMember:
    member = db.get(WorkspaceMember, member_id)
    if not member or member.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Workspace member not found")
    return member


def validate_workspace_member_role_change(member: WorkspaceMember, *, actor_user_id: str, next_role: str) -> None:
    if next_role not in {"viewer", "editor"}:
        raise HTTPException(status_code=400, detail="Invalid workspace role")
    if member.role == "owner":
        raise HTTPException(status_code=400, detail="Owner membership cannot be changed")
    if member.user_id == actor_user_id:
        raise HTTPException(status_code=400, detail="You cannot change your own workspace membership")


def validate_workspace_member_removal(member: WorkspaceMember, *, actor_user_id: str) -> None:
    if member.role == "owner":
        raise HTTPException(status_code=400, detail="Owner membership cannot be removed")
    if member.user_id == actor_user_id:
        raise HTTPException(status_code=400, detail="You cannot remove yourself from the workspace")
