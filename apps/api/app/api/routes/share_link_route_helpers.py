from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.api.routes.workspace_route_helpers import serialize_workspace
from app.models.share_link import ShareLink
from app.models.workspace import Workspace, WorkspaceMember
from app.services.share_links import get_share_link_by_token, is_share_link_active


VALID_SHARE_PERMISSION_CODES = {"viewer", "editor"}


def validate_share_link_permission_code(permission_code: str) -> None:
    if permission_code not in VALID_SHARE_PERMISSION_CODES:
        raise HTTPException(status_code=400, detail="Invalid permission code")


def get_workspace_share_link_or_404(db: Session, *, workspace_id: str, share_link_id: str) -> ShareLink:
    item = db.get(ShareLink, share_link_id)
    if not item or item.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Share link not found")
    return item


def get_active_share_link_and_workspace_or_404(db: Session, *, token: str) -> tuple[ShareLink, Workspace]:
    item = get_share_link_by_token(db, token)
    if not item or not is_share_link_active(item):
        raise HTTPException(status_code=404, detail="Share link not found")

    workspace = db.get(Workspace, item.workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return item, workspace


def apply_share_link_update(item: ShareLink, changes: dict) -> None:
    for field, value in changes.items():
        setattr(item, field, value)


def serialize_share_link_preview(item: ShareLink, workspace: Workspace) -> dict:
    return {
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


def serialize_workspace_for_member(db: Session, *, workspace: Workspace, user_id: str) -> dict:
    membership = (
        db.query(WorkspaceMember)
        .filter(WorkspaceMember.workspace_id == workspace.id, WorkspaceMember.user_id == user_id)
        .first()
    )
    if not membership:
        raise HTTPException(status_code=404, detail="Workspace membership not found")
    return serialize_workspace(workspace, membership.role)
