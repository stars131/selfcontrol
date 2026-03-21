from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_processing import format_size_label

LOCAL_STORAGE_PROVIDER = "local"
DEAD_LETTER_RETRY_STATES = {"manual_only", "exhausted", "disabled"}


def _classify_media_issue(item: MediaAsset) -> dict[str, object]:
    metadata = item.metadata_json if isinstance(item.metadata_json, dict) else {}
    retry_state = _read_processing_retry_state(item)
    error_text = str(item.processing_error or "").strip()
    normalized_error = error_text.lower()
    remote_fetch_status = metadata.get("remote_fetch_status") if isinstance(metadata.get("remote_fetch_status"), str) else None

    if item.storage_provider == "local" and "stored file not found" in normalized_error:
        return {
            "issue_category": "local_file_missing",
            "issue_label": "Local file missing",
            "recommended_action_code": "restore_or_delete_local_file",
            "recommended_action_label": "Restore file or delete record media",
            "recommended_action_detail": "The metadata still exists, but the local file is missing from disk.",
            "can_bulk_retry": False,
        }
    if "provider is not enabled" in normalized_error:
        return {
            "issue_category": "provider_disabled",
            "issue_label": "Provider disabled",
            "recommended_action_code": "enable_provider",
            "recommended_action_label": "Enable the extraction provider",
            "recommended_action_detail": "Turn on the workspace OCR, ASR, or video transcription provider before retrying.",
            "can_bulk_retry": False,
        }
    if "secret environment variable is missing" in normalized_error or "server-side secret is not configured" in normalized_error:
        return {
            "issue_category": "missing_secret",
            "issue_label": "Missing provider secret",
            "recommended_action_code": "configure_secret",
            "recommended_action_label": "Configure the provider secret",
            "recommended_action_detail": "Set the required server-side API key environment variable, then retry processing.",
            "can_bulk_retry": False,
        }
    if "api base url" in normalized_error or "service root" in normalized_error:
        return {
            "issue_category": "provider_config_error",
            "issue_label": "Provider config error",
            "recommended_action_code": "fix_provider_config",
            "recommended_action_label": "Fix media storage provider settings",
            "recommended_action_detail": "Review the workspace media storage endpoint and provider configuration before retrying.",
            "can_bulk_retry": False,
        }
    if "not supported" in normalized_error:
        return {
            "issue_category": "provider_unsupported",
            "issue_label": "Unsupported provider path",
            "recommended_action_code": "switch_provider",
            "recommended_action_label": "Choose a supported provider",
            "recommended_action_detail": "The selected provider flow is not supported for this media type or transport mode yet.",
            "can_bulk_retry": False,
        }
    if "not found" in normalized_error and item.storage_provider != "local":
        return {
            "issue_category": "remote_asset_missing",
            "issue_label": "Remote asset missing",
            "recommended_action_code": "review_remote_asset",
            "recommended_action_label": "Verify remote asset or remove stale reference",
            "recommended_action_detail": "The stored remote object could not be fetched and may have been deleted outside SelfControl.",
            "can_bulk_retry": False,
        }
    if any(marker in normalized_error for marker in ("rate limit", "429", "502", "503", "504", "timed out", "timeout", "request failed", "temporarily", "temporary")):
        return {
            "issue_category": "transient_remote_failure",
            "issue_label": "Transient remote failure",
            "recommended_action_code": "retry_after_remote_check",
            "recommended_action_label": "Retry after checking remote service health",
            "recommended_action_detail": "The remote provider looks temporarily unavailable or rate-limited.",
            "can_bulk_retry": True,
        }
    if "not ready" in normalized_error:
        return {
            "issue_category": "provider_not_ready",
            "issue_label": "Provider not ready",
            "recommended_action_code": "retry_when_ready",
            "recommended_action_label": "Retry when provider processing is ready",
            "recommended_action_detail": "The upstream provider accepted the media but has not finished processing it yet.",
            "can_bulk_retry": True,
        }
    if retry_state == "exhausted":
        return {
            "issue_category": "retry_budget_exhausted",
            "issue_label": "Retry budget exhausted",
            "recommended_action_code": "increase_retry_budget_or_retry_now",
            "recommended_action_label": "Tune retry policy or retry manually",
            "recommended_action_detail": "Automatic retries stopped after reaching the workspace retry limit.",
            "can_bulk_retry": True,
        }
    if retry_state == "disabled":
        return {
            "issue_category": "auto_retry_disabled",
            "issue_label": "Auto retry disabled",
            "recommended_action_code": "enable_auto_retry_or_retry_now",
            "recommended_action_label": "Enable auto retry or retry manually",
            "recommended_action_detail": "This workspace currently disables automatic remote media retries.",
            "can_bulk_retry": True,
        }
    if retry_state == "manual_only":
        return {
            "issue_category": "manual_recovery_required",
            "issue_label": "Manual recovery required",
            "recommended_action_code": "manual_retry",
            "recommended_action_label": "Retry manually after review",
            "recommended_action_detail": "This issue was marked as unsuitable for automatic retry and needs operator review.",
            "can_bulk_retry": True,
        }
    if remote_fetch_status == "failed":
        return {
            "issue_category": "remote_fetch_failed",
            "issue_label": "Remote fetch failed",
            "recommended_action_code": "check_remote_storage_health",
            "recommended_action_label": "Check remote storage health",
            "recommended_action_detail": "The server failed while fetching the remote media content for processing.",
            "can_bulk_retry": True,
        }
    return {
        "issue_category": "unknown_processing_issue",
        "issue_label": "Unknown processing issue",
        "recommended_action_code": "review_and_retry",
        "recommended_action_label": "Review error details and retry",
        "recommended_action_detail": "Inspect provider settings and the stored error details before retrying.",
        "can_bulk_retry": item.storage_provider != "local",
    }


def is_local_storage_provider(provider_code: str | None) -> bool:
    return (provider_code or "").strip().lower() == LOCAL_STORAGE_PROVIDER


def media_uses_local_storage(media: MediaAsset) -> bool:
    return is_local_storage_provider(media.storage_provider)


def _read_processing_retry_state(media: MediaAsset) -> str | None:
    metadata = media.metadata_json if isinstance(media.metadata_json, dict) else {}
    value = metadata.get("processing_retry_state")
    if not isinstance(value, str):
        return None
    normalized = value.strip().lower()
    return normalized or None


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
        "can_bulk_retry": classification["can_bulk_retry"],
        "updated_at": item.updated_at,
    }


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
        if media_uses_local_storage(item):
            continue
        retry_state = _read_processing_retry_state(item)
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


def resolve_storage_path(media: MediaAsset) -> Path:
    return Path(settings.storage_dir).parent / media.storage_key


def get_media_storage_tier(media: MediaAsset) -> str:
    metadata = media.metadata_json if isinstance(media.metadata_json, dict) else {}
    tier = metadata.get("storage_tier")
    if isinstance(tier, str) and tier.strip():
        return tier.strip().lower()
    return "primary"


def remove_storage_file(media: MediaAsset) -> bool:
    if not media_uses_local_storage(media):
        return False

    file_path = resolve_storage_path(media)
    if not file_path.exists():
        return False

    _remove_file_and_cleanup_dirs(file_path)
    return True


def _remove_file_and_cleanup_dirs(file_path: Path) -> None:
    file_path.unlink()
    cleanup_root = Path(settings.storage_dir)
    current = file_path.parent
    while current != cleanup_root.parent and current.exists():
        try:
            current.rmdir()
        except OSError:
            break
        current = current.parent


def summarize_workspace_media_storage(db: Session, workspace_id: str) -> dict:
    items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    total_size_bytes = 0
    missing_file_count = 0
    by_media_type: dict[str, int] = {}
    by_processing_status: dict[str, int] = {}
    largest_item_name: str | None = None
    largest_item_size_bytes: int | None = None

    for item in items:
        total_size_bytes += int(item.size_bytes or 0)
        by_media_type[item.media_type] = by_media_type.get(item.media_type, 0) + 1
        by_processing_status[item.processing_status] = by_processing_status.get(item.processing_status, 0) + 1
        if media_uses_local_storage(item) and not resolve_storage_path(item).exists():
            missing_file_count += 1
        if largest_item_size_bytes is None or item.size_bytes > largest_item_size_bytes:
            largest_item_size_bytes = item.size_bytes
            largest_item_name = item.original_filename

    return {
        "workspace_id": workspace_id,
        "total_count": len(items),
        "total_size_bytes": total_size_bytes,
        "total_size_label": format_size_label(total_size_bytes),
        "missing_file_count": missing_file_count,
        "by_media_type": by_media_type,
        "by_processing_status": by_processing_status,
        "largest_item_name": largest_item_name,
        "largest_item_size_bytes": largest_item_size_bytes,
        "largest_item_size_label": format_size_label(largest_item_size_bytes or 0) if largest_item_size_bytes else None,
    }


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
        if media_uses_local_storage(item):
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
        retry_state = _read_processing_retry_state(item) or "unknown"
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


def _coerce_utc(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _scan_workspace_orphan_files(workspace_id: str, tracked_storage_keys: set[str]) -> tuple[int, int]:
    orphan_files = _list_workspace_orphan_files(workspace_id, tracked_storage_keys)
    return len(orphan_files), sum(file_path.stat().st_size for file_path in orphan_files)


def _list_workspace_orphan_files(workspace_id: str, tracked_storage_keys: set[str]) -> list[Path]:
    workspace_dir = Path(settings.storage_dir) / workspace_id
    if not workspace_dir.exists():
        return []

    storage_root = Path(settings.storage_dir).parent
    orphan_files: list[Path] = []
    for file_path in workspace_dir.rglob("*"):
        if not file_path.is_file():
            continue
        relative_key = str(file_path.relative_to(storage_root))
        if relative_key in tracked_storage_keys:
            continue
        orphan_files.append(file_path)
    return orphan_files


def archive_workspace_media_item(media: MediaAsset) -> bool:
    if not media_uses_local_storage(media):
        return False

    file_path = resolve_storage_path(media)
    if not file_path.exists():
        return False

    archive_dir = Path(settings.storage_dir).parent / "archive" / media.workspace_id
    archive_dir.mkdir(parents=True, exist_ok=True)
    archive_path = archive_dir / file_path.name
    suffix_index = 2
    while archive_path.exists():
        archive_path = archive_dir / f"{archive_path.stem}-{suffix_index}{archive_path.suffix}"
        suffix_index += 1

    archive_path.write_bytes(file_path.read_bytes())
    _remove_file_and_cleanup_dirs(file_path)
    media.storage_key = str(archive_path.relative_to(Path(settings.storage_dir).parent))
    metadata = media.metadata_json if isinstance(media.metadata_json, dict) else {}
    media.metadata_json = {
        **metadata,
        "storage_tier": "archive",
        "archived_at": datetime.now(timezone.utc).isoformat(),
    }
    return True


def build_workspace_media_retention_report(
    db: Session,
    workspace_id: str,
    *,
    older_than_days: int = 90,
    limit: int = 5,
) -> dict:
    items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    now = datetime.now(timezone.utc)
    total_size_bytes = 0
    missing_file_count = 0
    oldest_media_age_days: int | None = None
    archived_item_count = 0
    archived_item_size_bytes = 0
    remote_item_count = 0
    remote_item_size_bytes = 0
    tracked_storage_keys: set[str] = set()
    report_items: list[dict] = []

    for item in items:
        created_at = _coerce_utc(item.created_at)
        age_days = max((now - created_at).days, 0)
        size_bytes = int(item.size_bytes or 0)
        uses_local_storage = media_uses_local_storage(item)
        file_missing = uses_local_storage and not resolve_storage_path(item).exists()
        storage_tier = get_media_storage_tier(item)

        total_size_bytes += size_bytes
        if file_missing:
            missing_file_count += 1
        if not uses_local_storage:
            remote_item_count += 1
            remote_item_size_bytes += size_bytes
        if storage_tier == "archive":
            archived_item_count += 1
            archived_item_size_bytes += size_bytes
        if oldest_media_age_days is None or age_days > oldest_media_age_days:
            oldest_media_age_days = age_days
        if uses_local_storage:
            tracked_storage_keys.add(item.storage_key)
        report_items.append(
            {
                "media_id": item.id,
                "record_id": item.record_id,
                "original_filename": item.original_filename,
                "media_type": item.media_type,
                "storage_provider": item.storage_provider,
                "storage_tier": storage_tier,
                "processing_status": item.processing_status,
                "size_bytes": size_bytes,
                "size_label": format_size_label(size_bytes),
                "created_at": item.created_at,
                "age_days": age_days,
                "file_missing": file_missing,
            }
        )

    old_items = [item for item in report_items if item["age_days"] >= older_than_days]
    retention_candidates = [
        item
        for item in old_items
        if item["storage_tier"] != "archive" and is_local_storage_provider(item["storage_provider"])
    ]
    orphan_file_count, orphan_file_size_bytes = _scan_workspace_orphan_files(workspace_id, tracked_storage_keys)
    largest_items = sorted(
        report_items,
        key=lambda item: (-item["size_bytes"], -item["age_days"], item["original_filename"].lower()),
    )[:limit]
    retention_candidates = sorted(
        retention_candidates,
        key=lambda item: (-item["size_bytes"], -item["age_days"], item["original_filename"].lower()),
    )[:limit]
    old_item_size_bytes = sum(item["size_bytes"] for item in old_items)

    return {
        "workspace_id": workspace_id,
        "older_than_days": older_than_days,
        "total_count": len(report_items),
        "total_size_bytes": total_size_bytes,
        "total_size_label": format_size_label(total_size_bytes),
        "oldest_media_age_days": oldest_media_age_days,
        "old_item_count": len(old_items),
        "old_item_size_bytes": old_item_size_bytes,
        "old_item_size_label": format_size_label(old_item_size_bytes),
        "archived_item_count": archived_item_count,
        "archived_item_size_bytes": archived_item_size_bytes,
        "archived_item_size_label": format_size_label(archived_item_size_bytes),
        "remote_item_count": remote_item_count,
        "remote_item_size_bytes": remote_item_size_bytes,
        "remote_item_size_label": format_size_label(remote_item_size_bytes),
        "missing_file_count": missing_file_count,
        "orphan_file_count": orphan_file_count,
        "orphan_file_size_bytes": orphan_file_size_bytes,
        "orphan_file_size_label": format_size_label(orphan_file_size_bytes),
        "largest_items": largest_items,
        "retention_candidates": retention_candidates,
    }


def cleanup_workspace_media_retention(
    db: Session,
    workspace_id: str,
    *,
    media_ids: list[str],
    older_than_days: int = 90,
    purge_orphan_files: bool = False,
    dry_run: bool = False,
) -> dict:
    now = datetime.now(timezone.utc)
    workspace_items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    tracked_storage_keys = {item.storage_key for item in workspace_items}
    media_id_set = set(media_ids)
    matched_items_by_id = {item.id: item for item in workspace_items if item.id in media_id_set}
    candidate_items: list[MediaAsset] = []
    skipped_reason_by_media_id: dict[str, str] = {}
    affected_record_ids: set[str] = set()

    for media_id in media_ids:
        item = matched_items_by_id.get(media_id)
        if item is None:
            skipped_reason_by_media_id[media_id] = "not_found"
            continue

        created_at = _coerce_utc(item.created_at)
        age_days = max((now - created_at).days, 0)
        if not media_uses_local_storage(item):
            skipped_reason_by_media_id[media_id] = "storage_provider_cleanup_not_supported"
            continue

        file_missing = not resolve_storage_path(item).exists()
        if get_media_storage_tier(item) == "archive":
            skipped_reason_by_media_id[media_id] = "already_archived"
            continue
        if age_days < older_than_days and not file_missing:
            skipped_reason_by_media_id[media_id] = "not_old_enough"
            continue

        candidate_items.append(item)
        affected_record_ids.add(item.record_id)

    orphan_files = _list_workspace_orphan_files(workspace_id, tracked_storage_keys) if purge_orphan_files else []
    candidate_media_size_bytes = sum(int(item.size_bytes or 0) for item in candidate_items)
    orphan_file_size_bytes = sum(file_path.stat().st_size for file_path in orphan_files)

    if not dry_run:
        for item in candidate_items:
            remove_storage_file(item)
            db.delete(item)
        db.commit()

        for record_id in sorted(affected_record_ids):
            rebuild_record_knowledge(db, record_id)

        for orphan_file in orphan_files:
            if orphan_file.exists():
                _remove_file_and_cleanup_dirs(orphan_file)

    return {
        "workspace_id": workspace_id,
        "older_than_days": older_than_days,
        "dry_run": dry_run,
        "candidate_media_count": len(candidate_items),
        "candidate_media_size_bytes": candidate_media_size_bytes,
        "candidate_media_size_label": format_size_label(candidate_media_size_bytes),
        "orphan_file_count": len(orphan_files),
        "orphan_file_size_bytes": orphan_file_size_bytes,
        "orphan_file_size_label": format_size_label(orphan_file_size_bytes),
        "affected_record_ids": sorted(affected_record_ids),
        "skipped_media_ids": list(skipped_reason_by_media_id.keys()),
        "skipped_reason_by_media_id": skipped_reason_by_media_id,
    }


def archive_workspace_media_retention(
    db: Session,
    workspace_id: str,
    *,
    media_ids: list[str],
    older_than_days: int = 90,
    dry_run: bool = False,
) -> dict:
    now = datetime.now(timezone.utc)
    workspace_items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    media_id_set = set(media_ids)
    matched_items_by_id = {item.id: item for item in workspace_items if item.id in media_id_set}
    candidate_items: list[MediaAsset] = []
    skipped_reason_by_media_id: dict[str, str] = {}
    affected_record_ids: set[str] = set()

    for media_id in media_ids:
        item = matched_items_by_id.get(media_id)
        if item is None:
            skipped_reason_by_media_id[media_id] = "not_found"
            continue

        if get_media_storage_tier(item) == "archive":
            skipped_reason_by_media_id[media_id] = "already_archived"
            continue
        if not media_uses_local_storage(item):
            skipped_reason_by_media_id[media_id] = "storage_provider_archive_not_supported"
            continue

        created_at = _coerce_utc(item.created_at)
        age_days = max((now - created_at).days, 0)
        file_missing = not resolve_storage_path(item).exists()
        if file_missing:
            skipped_reason_by_media_id[media_id] = "missing_storage_file"
            continue
        if age_days < older_than_days:
            skipped_reason_by_media_id[media_id] = "not_old_enough"
            continue

        candidate_items.append(item)
        affected_record_ids.add(item.record_id)

    candidate_media_size_bytes = sum(int(item.size_bytes or 0) for item in candidate_items)

    if not dry_run:
        for item in candidate_items:
            archive_workspace_media_item(item)
            db.add(item)
        db.commit()

        for record_id in sorted(affected_record_ids):
            rebuild_record_knowledge(db, record_id)

    return {
        "workspace_id": workspace_id,
        "older_than_days": older_than_days,
        "dry_run": dry_run,
        "candidate_media_count": len(candidate_items),
        "candidate_media_size_bytes": candidate_media_size_bytes,
        "candidate_media_size_label": format_size_label(candidate_media_size_bytes),
        "affected_record_ids": sorted(affected_record_ids),
        "skipped_media_ids": list(skipped_reason_by_media_id.keys()),
        "skipped_reason_by_media_id": skipped_reason_by_media_id,
    }
