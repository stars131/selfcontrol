from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def log_audit_event(
    db: Session,
    *,
    workspace_id: str,
    actor_user_id: str,
    action_code: str,
    resource_type: str,
    resource_id: str | None = None,
    status: str = "success",
    message: str | None = None,
    metadata_json: dict | None = None,
) -> AuditLog | None:
    try:
        item = AuditLog(
            workspace_id=workspace_id,
            actor_user_id=actor_user_id,
            action_code=action_code,
            resource_type=resource_type,
            resource_id=resource_id,
            status=status,
            message=message,
            metadata_json=metadata_json or {},
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        return item
    except Exception:  # noqa: BLE001
        db.rollback()
        return None
