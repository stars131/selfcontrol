from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.media import MediaAsset

LOCAL_STORAGE_PROVIDER = "local"
DEAD_LETTER_RETRY_STATES = {"manual_only", "exhausted", "disabled"}


def _resolve_media_feature_code_for_issue(item: MediaAsset) -> str | None:
    if item.media_type == "image":
        return "image_ocr"
    if item.media_type == "audio":
        return "audio_asr"
    if item.media_type == "video":
        return "video_transcription"
    return None


def _resolve_settings_feature_code(item: MediaAsset, *, remote_fetch_failed: bool) -> str | None:
    if remote_fetch_failed or item.storage_provider != LOCAL_STORAGE_PROVIDER:
        return "media_storage"
    return _resolve_media_feature_code_for_issue(item)


def read_processing_retry_state(media: MediaAsset) -> str | None:
    metadata = media.metadata_json if isinstance(media.metadata_json, dict) else {}
    value = metadata.get("processing_retry_state")
    if not isinstance(value, str):
        return None
    normalized = value.strip().lower()
    return normalized or None


def _classify_media_issue(item: MediaAsset) -> dict[str, object]:
    metadata = item.metadata_json if isinstance(item.metadata_json, dict) else {}
    retry_state = read_processing_retry_state(item)
    error_text = str(item.processing_error or "").strip()
    normalized_error = error_text.lower()
    remote_fetch_status = metadata.get("remote_fetch_status") if isinstance(metadata.get("remote_fetch_status"), str) else None
    remote_fetch_failed = remote_fetch_status == "failed"

    if item.storage_provider == LOCAL_STORAGE_PROVIDER and "stored file not found" in normalized_error:
        return {
            "issue_category": "local_file_missing",
            "issue_label": "Local file missing",
            "recommended_action_code": "restore_or_delete_local_file",
            "recommended_action_label": "Restore file or delete record media",
            "recommended_action_detail": "The metadata still exists, but the local file is missing from disk.",
            "recommended_settings_feature_code": None,
            "can_bulk_retry": False,
        }
    if "provider is not enabled" in normalized_error:
        return {
            "issue_category": "provider_disabled",
            "issue_label": "Provider disabled",
            "recommended_action_code": "enable_provider",
            "recommended_action_label": "Enable the extraction provider",
            "recommended_action_detail": "Turn on the workspace OCR, ASR, or video transcription provider before retrying.",
            "recommended_settings_feature_code": _resolve_media_feature_code_for_issue(item),
            "can_bulk_retry": False,
        }
    if "secret environment variable is missing" in normalized_error or "server-side secret is not configured" in normalized_error:
        return {
            "issue_category": "missing_secret",
            "issue_label": "Missing provider secret",
            "recommended_action_code": "configure_secret",
            "recommended_action_label": "Configure the provider secret",
            "recommended_action_detail": "Set the required server-side API key environment variable, then retry processing.",
            "recommended_settings_feature_code": _resolve_settings_feature_code(item, remote_fetch_failed=remote_fetch_failed),
            "can_bulk_retry": False,
        }
    if "api base url" in normalized_error or "service root" in normalized_error:
        return {
            "issue_category": "provider_config_error",
            "issue_label": "Provider config error",
            "recommended_action_code": "fix_provider_config",
            "recommended_action_label": "Fix media storage provider settings",
            "recommended_action_detail": "Review the workspace media storage endpoint and provider configuration before retrying.",
            "recommended_settings_feature_code": _resolve_settings_feature_code(item, remote_fetch_failed=remote_fetch_failed),
            "can_bulk_retry": False,
        }
    if "not supported" in normalized_error:
        return {
            "issue_category": "provider_unsupported",
            "issue_label": "Unsupported provider path",
            "recommended_action_code": "switch_provider",
            "recommended_action_label": "Choose a supported provider",
            "recommended_action_detail": "The selected provider flow is not supported for this media type or transport mode yet.",
            "recommended_settings_feature_code": _resolve_settings_feature_code(item, remote_fetch_failed=remote_fetch_failed),
            "can_bulk_retry": False,
        }
    if "not found" in normalized_error and item.storage_provider != LOCAL_STORAGE_PROVIDER:
        return {
            "issue_category": "remote_asset_missing",
            "issue_label": "Remote asset missing",
            "recommended_action_code": "review_remote_asset",
            "recommended_action_label": "Verify remote asset or remove stale reference",
            "recommended_action_detail": "The stored remote object could not be fetched and may have been deleted outside SelfControl.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": False,
        }
    if any(marker in normalized_error for marker in ("rate limit", "429", "502", "503", "504", "timed out", "timeout", "request failed", "temporarily", "temporary")):
        return {
            "issue_category": "transient_remote_failure",
            "issue_label": "Transient remote failure",
            "recommended_action_code": "retry_after_remote_check",
            "recommended_action_label": "Retry after checking remote service health",
            "recommended_action_detail": "The remote provider looks temporarily unavailable or rate-limited.",
            "recommended_settings_feature_code": _resolve_settings_feature_code(item, remote_fetch_failed=remote_fetch_failed),
            "can_bulk_retry": True,
        }
    if "not ready" in normalized_error:
        return {
            "issue_category": "provider_not_ready",
            "issue_label": "Provider not ready",
            "recommended_action_code": "retry_when_ready",
            "recommended_action_label": "Retry when provider processing is ready",
            "recommended_action_detail": "The upstream provider accepted the media but has not finished processing it yet.",
            "recommended_settings_feature_code": _resolve_media_feature_code_for_issue(item),
            "can_bulk_retry": True,
        }
    if retry_state == "exhausted":
        return {
            "issue_category": "retry_budget_exhausted",
            "issue_label": "Retry budget exhausted",
            "recommended_action_code": "increase_retry_budget_or_retry_now",
            "recommended_action_label": "Tune retry policy or retry manually",
            "recommended_action_detail": "Automatic retries stopped after reaching the workspace retry limit.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    if retry_state == "disabled":
        return {
            "issue_category": "auto_retry_disabled",
            "issue_label": "Auto retry disabled",
            "recommended_action_code": "enable_auto_retry_or_retry_now",
            "recommended_action_label": "Enable auto retry or retry manually",
            "recommended_action_detail": "This workspace currently disables automatic remote media retries.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    if retry_state == "manual_only":
        return {
            "issue_category": "manual_recovery_required",
            "issue_label": "Manual recovery required",
            "recommended_action_code": "manual_retry",
            "recommended_action_label": "Retry manually after review",
            "recommended_action_detail": "This issue was marked as unsuitable for automatic retry and needs operator review.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    if remote_fetch_status == "failed":
        return {
            "issue_category": "remote_fetch_failed",
            "issue_label": "Remote fetch failed",
            "recommended_action_code": "check_remote_storage_health",
            "recommended_action_label": "Check remote storage health",
            "recommended_action_detail": "The server failed while fetching the remote media content for processing.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    return {
        "issue_category": "unknown_processing_issue",
        "issue_label": "Unknown processing issue",
        "recommended_action_code": "review_and_retry",
        "recommended_action_label": "Review error details and retry",
        "recommended_action_detail": "Inspect provider settings and the stored error details before retrying.",
        "recommended_settings_feature_code": _resolve_settings_feature_code(item, remote_fetch_failed=remote_fetch_failed),
        "can_bulk_retry": item.storage_provider != LOCAL_STORAGE_PROVIDER,
    }


def _build_media_processing_issue(item: MediaAsset) -> dict:
    metadata = item.metadata_json if isinstance(item.metadata_json, dict) else {}
    classification = _classify_media_issue(item)
    return {
        "media_id": item.id,
        "record_id": item.record_id,
        "original_filename": item.original_filename,
        "media_type": item.media_type,
        "storage_provider": item.storage_provider,
        "processing_status": item.processing_status,
        "processing_error": item.processing_error,
        "extraction_mode": metadata.get("extraction_mode") if isinstance(metadata.get("extraction_mode"), str) else None,
        "processing_source": metadata.get("processing_source") if isinstance(metadata.get("processing_source"), str) else None,
        "processing_last_attempt_at": metadata.get("processing_last_attempt_at") if isinstance(metadata.get("processing_last_attempt_at"), str) else None,
        "processing_last_failure_at": metadata.get("processing_last_failure_at") if isinstance(metadata.get("processing_last_failure_at"), str) else None,
        "remote_fetch_status": metadata.get("remote_fetch_status") if isinstance(metadata.get("remote_fetch_status"), str) else None,
        "processing_retry_state": metadata.get("processing_retry_state") if isinstance(metadata.get("processing_retry_state"), str) else None,
        "processing_retry_count": int(metadata.get("processing_retry_count")) if str(metadata.get("processing_retry_count", "")).strip().isdigit() else None,
        "processing_retry_max_attempts": int(metadata.get("processing_retry_max_attempts")) if str(metadata.get("processing_retry_max_attempts", "")).strip().isdigit() else None,
        "processing_retry_next_attempt_at": metadata.get("processing_retry_next_attempt_at") if isinstance(metadata.get("processing_retry_next_attempt_at"), str) else None,
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


def _sort_media_processing_issues(items: list[dict]) -> list[dict]:
    items.sort(
        key=lambda item: (
            item["processing_last_failure_at"] or "",
            item["processing_last_attempt_at"] or "",
            item["updated_at"].isoformat() if hasattr(item["updated_at"], "isoformat") else str(item["updated_at"]),
        ),
        reverse=True,
    )
    return items


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

    _sort_media_processing_issues(recent_issues)

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

    _sort_media_processing_issues(dead_letter_issues)
    return {
        "workspace_id": workspace_id,
        "total_count": len(items),
        "by_retry_state": by_retry_state,
        "by_issue_category": by_issue_category,
        "items": dead_letter_issues[:limit],
    }
