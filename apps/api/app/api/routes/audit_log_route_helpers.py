from __future__ import annotations

from app.models.audit_log import AuditLog


def serialize_audit_log(item: AuditLog) -> dict:
    return {
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
