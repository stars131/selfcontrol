from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.deps import (
    get_current_user,
    get_workspace_membership,
    require_workspace_member,
    require_workspace_role,
)
from app.db.session import get_db
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.models.workspace_transfer_job import WorkspaceTransferJob
from app.schemas.workspace import (
    WorkspaceCreate,
    WorkspaceImportResultRead,
    WorkspaceMemberRead,
    WorkspaceMemberUpdate,
    WorkspaceTransferJobRead,
    WorkspaceRead,
)
from app.services.audit import log_audit_event
from app.services.workspace_export import build_workspace_export_archive
from app.services.workspace_import import import_workspace_archive
from app.services.workspace_transfer_jobs import (
    create_workspace_export_job,
    create_workspace_import_job,
    dispatch_workspace_transfer_job,
)


router = APIRouter()


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


def _cleanup_export_archive(path: Path) -> None:
    try:
        path.unlink(missing_ok=True)
    except Exception:  # noqa: BLE001
        return


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


@router.get("")
def list_workspaces(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    workspaces = (
        db.query(Workspace)
        .join(WorkspaceMember, WorkspaceMember.workspace_id == Workspace.id)
        .filter(WorkspaceMember.user_id == current_user.id)
        .order_by(Workspace.created_at.desc())
        .all()
    )
    return {
        "success": True,
        "data": {
            "items": [
                WorkspaceRead.model_validate(
                    serialize_workspace(
                        workspace,
                        next(
                            (
                                membership.role
                                for membership in workspace.members
                                if membership.user_id == current_user.id
                            ),
                            "viewer",
                        ),
                    )
                ).model_dump()
                for workspace in workspaces
            ]
        },
    }


@router.post("")
def create_workspace(
    payload: WorkspaceCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    existing = db.query(Workspace).filter(Workspace.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Workspace slug already exists")

    workspace = Workspace(
        name=payload.name,
        slug=payload.slug,
        owner_id=current_user.id,
        visibility=payload.visibility,
    )
    db.add(workspace)
    db.flush()

    membership = WorkspaceMember(
        workspace_id=workspace.id,
        user_id=current_user.id,
        role="owner",
    )
    db.add(membership)
    db.commit()
    db.refresh(workspace)

    return {
        "success": True,
        "data": {
            "workspace": WorkspaceRead.model_validate(serialize_workspace(workspace, "owner")).model_dump()
        },
    }


@router.post("/import")
async def import_workspace(
    file: UploadFile = File(...),
    name: str | None = Form(default=None),
    slug: str | None = Form(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    archive_bytes = await file.read()
    try:
        workspace, counts = import_workspace_archive(
            db,
            archive_bytes,
            owner_user_id=current_user.id,
            workspace_name=name,
            workspace_slug=slug,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    workspace_payload = WorkspaceRead.model_validate(serialize_workspace(workspace, "owner")).model_dump()
    log_audit_event(
        db,
        workspace_id=workspace.id,
        actor_user_id=current_user.id,
        action_code="workspace.import",
        resource_type="workspace",
        resource_id=workspace.id,
        message=f"Imported workspace {workspace.name}",
        metadata_json=counts,
    )
    return {
        "success": True,
        "data": {
            "result": WorkspaceImportResultRead.model_validate(
                {
                    "workspace": workspace_payload,
                    **counts,
                }
            ).model_dump()
        },
    }


@router.post("/import-jobs")
async def create_workspace_import_job_route(
    file: UploadFile = File(...),
    name: str | None = Form(default=None),
    slug: str | None = Form(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    archive_bytes = await file.read()
    job = create_workspace_import_job(
        db,
        created_by=current_user.id,
        archive_bytes=archive_bytes,
        original_filename=file.filename or "workspace-import.zip",
        workspace_name=name,
        workspace_slug=slug,
    )
    job, dispatch_mode = dispatch_workspace_transfer_job(db, job.id)
    return {
        "success": True,
        "data": {
            "job": WorkspaceTransferJobRead.model_validate(serialize_workspace_transfer_job(job)).model_dump(),
            "dispatch_mode": dispatch_mode,
        },
    }


@router.get("/{workspace_id}")
def get_workspace(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    workspace = require_workspace_member(workspace_id, current_user, db)
    membership = get_workspace_membership(workspace_id, current_user, db)
    return {
        "success": True,
        "data": {
            "workspace": WorkspaceRead.model_validate(serialize_workspace(workspace, membership.role)).model_dump()
        },
    }


@router.get("/{workspace_id}/export")
def export_workspace_archive(
    workspace_id: str,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    workspace = require_workspace_member(workspace_id, current_user, db)
    archive_path, counts = build_workspace_export_archive(
        db,
        workspace_id,
        exported_by_user_id=current_user.id,
    )
    background_tasks.add_task(_cleanup_export_archive, archive_path)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="workspace.export",
        resource_type="workspace",
        resource_id=workspace_id,
        message=f"Exported workspace {workspace.name}",
        metadata_json=counts,
    )
    filename = f"{workspace.slug or workspace.id}-export.zip"
    return FileResponse(path=archive_path, media_type="application/zip", filename=filename)


@router.post("/{workspace_id}/export-jobs")
def create_workspace_export_job_route(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    job = create_workspace_export_job(db, workspace_id=workspace_id, created_by=current_user.id)
    job, dispatch_mode = dispatch_workspace_transfer_job(db, job.id)
    return {
        "success": True,
        "data": {
            "job": WorkspaceTransferJobRead.model_validate(serialize_workspace_transfer_job(job)).model_dump(),
            "dispatch_mode": dispatch_mode,
        },
    }
 

@router.get("/jobs/transfer")
def list_workspace_transfer_jobs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    items = (
        db.query(WorkspaceTransferJob)
        .filter(WorkspaceTransferJob.created_by == current_user.id)
        .order_by(WorkspaceTransferJob.created_at.desc())
        .limit(20)
        .all()
    )
    return {
        "success": True,
        "data": {
            "items": [WorkspaceTransferJobRead.model_validate(serialize_workspace_transfer_job(item)).model_dump() for item in items]
        },
    }


@router.get("/jobs/transfer/{job_id}")
def get_workspace_transfer_job(
    job_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    job = db.get(WorkspaceTransferJob, job_id)
    if not job or job.created_by != current_user.id:
        raise HTTPException(status_code=404, detail="Workspace transfer job not found")
    return {
        "success": True,
        "data": {"job": WorkspaceTransferJobRead.model_validate(serialize_workspace_transfer_job(job)).model_dump()},
    }


@router.get("/jobs/transfer/{job_id}/download")
def download_workspace_transfer_job_artifact(
    job_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    job = db.get(WorkspaceTransferJob, job_id)
    if not job or job.created_by != current_user.id:
        raise HTTPException(status_code=404, detail="Workspace transfer job not found")
    if job.job_type != "export" or job.status != "completed" or not job.artifact_path:
        raise HTTPException(status_code=400, detail="Job artifact is not available")

    artifact_path = Path(job.artifact_path)
    if not artifact_path.exists():
        raise HTTPException(status_code=404, detail="Job artifact file not found")
    filename = job.artifact_filename or f"workspace-transfer-{job.id}.zip"
    return FileResponse(path=artifact_path, media_type="application/zip", filename=filename)


@router.get("/{workspace_id}/members")
def list_workspace_members(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner", "editor"})
    items = (
        db.query(WorkspaceMember)
        .join(User, User.id == WorkspaceMember.user_id)
        .filter(WorkspaceMember.workspace_id == workspace_id)
        .order_by(WorkspaceMember.created_at.asc())
        .all()
    )
    return {
        "success": True,
        "data": {
            "items": [WorkspaceMemberRead.model_validate(serialize_workspace_member(item)).model_dump() for item in items]
        },
    }


@router.patch("/{workspace_id}/members/{member_id}")
def update_workspace_member(
    workspace_id: str,
    member_id: str,
    payload: WorkspaceMemberUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    if payload.role not in {"viewer", "editor"}:
        raise HTTPException(status_code=400, detail="Invalid workspace role")

    member = db.get(WorkspaceMember, member_id)
    if not member or member.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Workspace member not found")
    if member.role == "owner":
        raise HTTPException(status_code=400, detail="Owner membership cannot be changed")
    if member.user_id == current_user.id:
        raise HTTPException(status_code=400, detail="You cannot change your own workspace membership")

    previous_role = member.role
    member.role = payload.role
    db.add(member)
    db.commit()
    db.refresh(member)

    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="workspace_member.update_role",
        resource_type="workspace_member",
        resource_id=member.id,
        message=f"Updated workspace member {member.user.username}",
        metadata_json={"previous_role": previous_role, "role": member.role, "user_id": member.user_id},
    )
    return {
        "success": True,
        "data": {"member": WorkspaceMemberRead.model_validate(serialize_workspace_member(member)).model_dump()},
    }


@router.delete("/{workspace_id}/members/{member_id}")
def delete_workspace_member(
    workspace_id: str,
    member_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    member = db.get(WorkspaceMember, member_id)
    if not member or member.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Workspace member not found")
    if member.role == "owner":
        raise HTTPException(status_code=400, detail="Owner membership cannot be removed")
    if member.user_id == current_user.id:
        raise HTTPException(status_code=400, detail="You cannot remove yourself from the workspace")

    removed_user_id = member.user_id
    removed_username = member.user.username
    removed_role = member.role
    db.delete(member)
    db.commit()

    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="workspace_member.remove",
        resource_type="workspace_member",
        resource_id=member_id,
        message=f"Removed workspace member {removed_username}",
        metadata_json={"user_id": removed_user_id, "role": removed_role},
    )
    return {"success": True, "data": {"deleted": True}}
