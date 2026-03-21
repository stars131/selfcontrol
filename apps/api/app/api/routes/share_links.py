from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_role
from app.db.session import get_db
from app.models.share_link import ShareLink
from app.models.user import User
from app.schemas.share_link import ShareLinkCreate, ShareLinkRead, ShareLinkUpdate
from app.services.audit import log_audit_event
from app.services.share_links import build_share_path, create_share_link


router = APIRouter()


@router.get("/{workspace_id}/share-links")
def list_share_links(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    items = (
        db.query(ShareLink)
        .filter(ShareLink.workspace_id == workspace_id)
        .order_by(ShareLink.created_at.desc())
        .all()
    )
    return {"success": True, "data": {"items": [ShareLinkRead.model_validate(item).model_dump() for item in items]}}


@router.post("/{workspace_id}/share-links")
def create_workspace_share_link(
    workspace_id: str,
    payload: ShareLinkCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    if payload.permission_code not in {"viewer", "editor"}:
        raise HTTPException(status_code=400, detail="Invalid permission code")

    item, access_token = create_share_link(
        db,
        workspace_id=workspace_id,
        created_by=current_user.id,
        name=payload.name or "Workspace share",
        permission_code=payload.permission_code,
        expires_at=payload.expires_at,
        max_uses=payload.max_uses,
    )
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="share_link.create",
        resource_type="share_link",
        resource_id=item.id,
        message=f"Created share link {item.name}",
        metadata_json={"permission_code": item.permission_code, "max_uses": item.max_uses},
    )
    return {
        "success": True,
        "data": {
            "share_link": ShareLinkRead.model_validate(item).model_dump(),
            "access_token": access_token,
            "share_path": build_share_path(access_token),
        },
    }


@router.patch("/{workspace_id}/share-links/{share_link_id}")
def update_workspace_share_link(
    workspace_id: str,
    share_link_id: str,
    payload: ShareLinkUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    item = db.get(ShareLink, share_link_id)
    if not item or item.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Share link not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.add(item)
    db.commit()
    db.refresh(item)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="share_link.update",
        resource_type="share_link",
        resource_id=item.id,
        message=f"Updated share link {item.name}",
        metadata_json={"is_enabled": item.is_enabled, "max_uses": item.max_uses},
    )
    return {"success": True, "data": {"share_link": ShareLinkRead.model_validate(item).model_dump()}}
