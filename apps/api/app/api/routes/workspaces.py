from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.schemas.workspace import WorkspaceCreate, WorkspaceRead


router = APIRouter()


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
            "items": [WorkspaceRead.model_validate(workspace).model_dump() for workspace in workspaces]
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

    return {"success": True, "data": {"workspace": WorkspaceRead.model_validate(workspace).model_dump()}}


@router.get("/{workspace_id}")
def get_workspace(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    workspace = require_workspace_member(workspace_id, current_user, db)
    return {"success": True, "data": {"workspace": WorkspaceRead.model_validate(workspace).model_dump()}}

