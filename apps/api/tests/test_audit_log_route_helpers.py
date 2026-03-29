from __future__ import annotations

from datetime import datetime, timezone

from app.api.routes.audit_log_route_helpers import serialize_audit_log
from app.models import conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, user, workspace, workspace_transfer_job  # noqa: F401
from app.models.audit_log import AuditLog


def test_serialize_audit_log_includes_expected_fields_and_iso_timestamp() -> None:
    created_at = datetime(2026, 3, 29, 10, 11, 12, tzinfo=timezone.utc)
    item = AuditLog(
        id="audit-1",
        workspace_id="workspace-1",
        actor_user_id="user-1",
        action_code="record.create",
        resource_type="record",
        resource_id="record-1",
        status="success",
        message="Created a record",
        metadata_json={"type_code": "food"},
    )
    item.created_at = created_at

    payload = serialize_audit_log(item)

    assert payload == {
        "id": "audit-1",
        "workspace_id": "workspace-1",
        "actor_user_id": "user-1",
        "action_code": "record.create",
        "resource_type": "record",
        "resource_id": "record-1",
        "status": "success",
        "message": "Created a record",
        "metadata_json": {"type_code": "food"},
        "created_at": created_at.isoformat(),
    }


def test_serialize_audit_log_uses_none_when_created_at_is_missing() -> None:
    item = AuditLog(
        id="audit-2",
        workspace_id="workspace-2",
        actor_user_id="user-2",
        action_code="record.delete",
        resource_type="record",
        resource_id="record-2",
        status="failed",
        message="Delete failed",
        metadata_json={},
    )
    item.created_at = None

    payload = serialize_audit_log(item)

    assert payload["created_at"] is None
    assert payload["status"] == "failed"
