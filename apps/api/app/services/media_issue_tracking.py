from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.media import MediaAsset
from app.services.media_issue_tracking_classification import classify_media_issue
from app.services.media_issue_tracking_metadata import (
    DEAD_LETTER_RETRY_STATES,
    LOCAL_STORAGE_PROVIDER,
    read_media_issue_int,
    read_media_issue_metadata,
    read_media_issue_text,
    read_processing_retry_state,
    sort_media_processing_issues,
)


def _build_media_processing_issue(item: MediaAsset) -> dict:
    metadata = read_media_issue_metadata(item)
    classification = classify_media_issue(item)
    return {
        "media_id": item.id,
        "record_id": item.record_id,
        "original_filename": item.original_filename,
        "media_type": item.media_type,
        "storage_provider": item.storage_provider,
        "processing_status": item.processing_status,
        "processing_error": item.processing_error,
        "extraction_mode": read_media_issue_text(metadata, "extraction_mode"),
        "processing_source": read_media_issue_text(metadata, "processing_source"),
        "processing_last_attempt_at": read_media_issue_text(
            metadata, "processing_last_attempt_at"
        ),
        "processing_last_failure_at": read_media_issue_text(
            metadata, "processing_last_failure_at"
        ),
        "remote_fetch_status": read_media_issue_text(metadata, "remote_fetch_status"),
        "processing_retry_state": read_media_issue_text(
            metadata, "processing_retry_state"
        ),
        "processing_retry_count": read_media_issue_int(
            metadata, "processing_retry_count"
        ),
        "processing_retry_max_attempts": read_media_issue_int(
            metadata, "processing_retry_max_attempts"
        ),
        "processing_retry_next_attempt_at": read_media_issue_text(
            metadata, "processing_retry_next_attempt_at"
        ),
        "issue_category": classification["issue_category"],
        "issue_label": classification["issue_label"],
        "recommended_action_code": classification["recommended_action_code"],
        "recommended_action_label": classification["recommended_action_label"],
        "recommended_action_detail": classification["recommended_action_detail"],
        "recommended_settings_feature_code": classification["recommended_settings_feature_code"],
        "can_bulk_retry": classification["can_bulk_retry"],
        "updated_at": item.updated_at,
    }


def build_media_processing_issue(item: MediaAsset) -> dict:
    return _build_media_processing_issue(item)


def list_workspace_media_dead_letter_items(
    db: Session,
    workspace_id: str,
    *,
    retry_states: set[str] | None = None,
) -> list[MediaAsset]:
    target_states = retry_states or DEAD_LETTER_RETRY_STATES
    items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    dead_letter_items: list[MediaAsset] = []
    for item in items:
        if item.storage_provider == LOCAL_STORAGE_PROVIDER:
            continue
        retry_state = read_processing_retry_state(item)
        if retry_state not in target_states:
            continue
        if item.processing_status not in {"failed", "deferred"} and not item.processing_error:
            continue
        dead_letter_items.append(item)
    dead_letter_items.sort(
        key=lambda item: (
            (
                item.metadata_json.get("processing_last_failure_at")
                if isinstance(item.metadata_json, dict)
                and isinstance(item.metadata_json.get("processing_last_failure_at"), str)
                else ""
            ),
            (
                item.metadata_json.get("processing_last_attempt_at")
                if isinstance(item.metadata_json, dict)
                and isinstance(item.metadata_json.get("processing_last_attempt_at"), str)
                else ""
            ),
            item.updated_at.isoformat() if hasattr(item.updated_at, "isoformat") else str(item.updated_at),
        ),
        reverse=True,
    )
    return dead_letter_items


def build_workspace_media_processing_overview(
    db: Session,
    workspace_id: str,
    *,
    issue_limit: int = 5,
) -> dict:
    items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    by_processing_status: dict[str, int] = {}
    by_storage_provider: dict[str, int] = {}
    recent_issues: list[dict] = []
    by_issue_category: dict[str, int] = {}
    local_item_count = 0
    remote_item_count = 0

    for item in items:
        by_processing_status[item.processing_status] = by_processing_status.get(item.processing_status, 0) + 1
        by_storage_provider[item.storage_provider] = by_storage_provider.get(item.storage_provider, 0) + 1
        if item.storage_provider == LOCAL_STORAGE_PROVIDER:
            local_item_count += 1
        else:
            remote_item_count += 1

        if item.processing_status in {"failed", "deferred"} or item.processing_error:
            issue = _build_media_processing_issue(item)
            issue_category = str(issue["issue_category"])
            by_issue_category[issue_category] = by_issue_category.get(issue_category, 0) + 1
            recent_issues.append(issue)

    sort_media_processing_issues(recent_issues)

    return {
        "workspace_id": workspace_id,
        "total_count": len(items),
        "local_item_count": local_item_count,
        "remote_item_count": remote_item_count,
        "completed_count": by_processing_status.get("completed", 0),
        "pending_count": by_processing_status.get("pending", 0),
        "processing_count": by_processing_status.get("processing", 0),
        "deferred_count": by_processing_status.get("deferred", 0),
        "failed_count": by_processing_status.get("failed", 0),
        "by_processing_status": by_processing_status,
        "by_storage_provider": by_storage_provider,
        "by_issue_category": by_issue_category,
        "recent_issues": recent_issues[:issue_limit],
    }


def build_workspace_media_dead_letter_overview(
    db: Session,
    workspace_id: str,
    *,
    limit: int = 20,
    retry_states: set[str] | None = None,
) -> dict:
    items = list_workspace_media_dead_letter_items(db, workspace_id, retry_states=retry_states)
    by_retry_state: dict[str, int] = {}
    by_issue_category: dict[str, int] = {}
    dead_letter_issues = []
    for item in items:
        retry_state = read_processing_retry_state(item) or "unknown"
        by_retry_state[retry_state] = by_retry_state.get(retry_state, 0) + 1
        issue = _build_media_processing_issue(item)
        issue_category = str(issue["issue_category"])
        by_issue_category[issue_category] = by_issue_category.get(issue_category, 0) + 1
        dead_letter_issues.append(issue)

    sort_media_processing_issues(dead_letter_issues)
    return {
        "workspace_id": workspace_id,
        "total_count": len(items),
        "by_retry_state": by_retry_state,
        "by_issue_category": by_issue_category,
        "items": dead_letter_issues[:limit],
    }
