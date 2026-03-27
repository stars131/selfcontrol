from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.media import MediaAsset
from app.services.media_file_analysis import format_size_label
from app.services.media_retention_common import (
    coerce_retention_datetime,
    scan_workspace_orphan_files,
)
from app.services.media_storage import (
    get_media_storage_tier,
    is_local_storage_provider,
    media_uses_local_storage,
    resolve_storage_path,
)


def build_media_retention_report_from_items(
    items: list[MediaAsset],
    *,
    workspace_id: str,
    older_than_days: int = 90,
    limit: int = 5,
) -> dict:
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
        created_at = coerce_retention_datetime(item.created_at)
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
        if item["storage_tier"] != "archive"
        and is_local_storage_provider(item["storage_provider"])
    ]
    orphan_file_count, orphan_file_size_bytes = scan_workspace_orphan_files(
        workspace_id, tracked_storage_keys
    )
    largest_items = sorted(
        report_items,
        key=lambda item: (
            -item["size_bytes"],
            -item["age_days"],
            item["original_filename"].lower(),
        ),
    )[:limit]
    retention_candidates = sorted(
        retention_candidates,
        key=lambda item: (
            -item["size_bytes"],
            -item["age_days"],
            item["original_filename"].lower(),
        ),
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


def build_workspace_media_retention_report(
    db: Session,
    workspace_id: str,
    *,
    older_than_days: int = 90,
    limit: int = 5,
) -> dict:
    items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    return build_media_retention_report_from_items(
        items,
        workspace_id=workspace_id,
        older_than_days=older_than_days,
        limit=limit,
    )
