from __future__ import annotations

import hashlib
import secrets
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.share_link import ShareLink
from app.models.workspace import Workspace, WorkspaceMember


ROLE_RANK = {"viewer": 1, "editor": 2, "owner": 3}


def hash_share_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def build_share_path(token: str) -> str:
    return f"/share/{token}"


def _normalize_share_datetime(value: datetime | None) -> datetime | None:
    if value is None:
        return None
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def is_share_link_active(link: ShareLink) -> bool:
    if not link.is_enabled:
        return False
    now = datetime.now(timezone.utc)
    expires_at = _normalize_share_datetime(link.expires_at)
    if expires_at and expires_at <= now:
        return False
    if link.max_uses is not None and link.use_count >= link.max_uses:
        return False
    return True


def create_share_link(
    db: Session,
    *,
    workspace_id: str,
    created_by: str,
    name: str,
    permission_code: str,
    expires_at: datetime | None,
    max_uses: int | None,
) -> tuple[ShareLink, str]:
    token = secrets.token_urlsafe(24)
    item = ShareLink(
        workspace_id=workspace_id,
        created_by=created_by,
        name=name,
        token_hash=hash_share_token(token),
        token_hint=token[:8],
        permission_code=permission_code,
        expires_at=expires_at,
        max_uses=max_uses,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item, token


def get_share_link_by_token(db: Session, token: str) -> ShareLink | None:
    token_hash = hash_share_token(token)
    return db.query(ShareLink).filter(ShareLink.token_hash == token_hash).first()


def accept_share_link(db: Session, *, token: str, user_id: str) -> Workspace:
    link = get_share_link_by_token(db, token)
    if not link or not is_share_link_active(link):
        raise ValueError("Share link is invalid or expired")

    workspace = db.get(Workspace, link.workspace_id)
    if not workspace:
        raise ValueError("Workspace not found")

    membership = (
        db.query(WorkspaceMember)
        .filter(WorkspaceMember.workspace_id == workspace.id, WorkspaceMember.user_id == user_id)
        .first()
    )
    if membership:
        current_rank = ROLE_RANK.get(membership.role, 0)
        new_rank = ROLE_RANK.get(link.permission_code, 0)
        if new_rank > current_rank:
            membership.role = link.permission_code
            db.add(membership)
    else:
        membership = WorkspaceMember(workspace_id=workspace.id, user_id=user_id, role=link.permission_code)
        db.add(membership)

    link.use_count += 1
    link.last_used_at = datetime.now(timezone.utc)
    db.add(link)
    db.commit()
    db.refresh(workspace)
    return workspace
