from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.workspace import Workspace
from app.models.user import User
from app.schemas.workspace import WorkspaceRead
from app.services.audit import log_audit_event
from app.services.share_links import accept_share_link, get_share_link_by_token, is_share_link_active


router = APIRouter()


@router.get("/{token}")
def preview_share_link(
    token: str,
    db: Session = Depends(get_db),
) -> dict:
    item = get_share_link_by_token(db, token)
    if not item or not is_share_link_active(item):
        raise HTTPException(status_code=404, detail="Share link not found")

    workspace = db.get(Workspace, item.workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    return {
        "success": True,
        "data": {
            "preview": {
                "name": item.name,
                "workspace_id": workspace.id,
                "workspace_name": workspace.name,
                "workspace_slug": workspace.slug,
                "permission_code": item.permission_code,
                "is_enabled": item.is_enabled,
                "expires_at": item.expires_at.isoformat() if item.expires_at else None,
                "max_uses": item.max_uses,
                "use_count": item.use_count,
            }
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
    return {"success": True, "data": {"workspace": WorkspaceRead.model_validate(workspace).model_dump()}}
