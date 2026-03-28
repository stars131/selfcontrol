from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.api.routes.share_link_route_helpers import (
    get_active_share_link_and_workspace_or_404,
    serialize_share_link_preview,
    serialize_workspace_for_member,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.workspace import WorkspaceRead
from app.services.audit import log_audit_event
from app.services.share_links import accept_share_link


router = APIRouter()


@router.get("/{token}")
def preview_share_link(
    token: str,
    db: Session = Depends(get_db),
) -> dict:
    item, workspace = get_active_share_link_and_workspace_or_404(db, token=token)

    return {
        "success": True,
        "data": {
            "preview": serialize_share_link_preview(item, workspace)
        },
    }


@router.post("/{token}/accept")
def accept_workspace_share(
    token: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    try:
        workspace = accept_share_link(db, token=token, user_id=current_user.id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    log_audit_event(
        db,
        workspace_id=workspace.id,
        actor_user_id=current_user.id,
        action_code="share_link.accept",
        resource_type="workspace_member",
        resource_id=current_user.id,
        message=f"Accepted share link into workspace {workspace.name}",
        metadata_json={"workspace_id": workspace.id},
    )
    return {
        "success": True,
        "data": {
            "workspace": WorkspaceRead.model_validate(
                serialize_workspace_for_member(db, workspace=workspace, user_id=current_user.id)
            ).model_dump()
        },
    }
