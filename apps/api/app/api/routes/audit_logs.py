from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.audit_log import AuditLog
from app.models.user import User


router = APIRouter()


@router.get("/{workspace_id}/audit-logs")
def list_audit_logs(
    workspace_id: str,
    limit: int = Query(default=20, ge=1, le=100),
    action_code: str | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    query = db.query(AuditLog).filter(AuditLog.workspace_id == workspace_id)
    if action_code:
        query = query.filter(AuditLog.action_code == action_code)

    items = query.order_by(AuditLog.created_at.desc()).limit(limit).all()
    return {
        "success": True,
        "data": {
            "items": [
                {
                    "id": item.id,
                    "workspace_id": item.workspace_id,
                    "actor_user_id": item.actor_user_id,
                    "action_code": item.action_code,
                    "resource_type": item.resource_type,
                    "resource_id": item.resource_id,
                    "status": item.status,
                    "message": item.message,
                    "metadata_json": item.metadata_json,
                    "created_at": item.created_at.isoformat() if item.created_at else None,
                }
                for item in items
            ]
        },
    }
