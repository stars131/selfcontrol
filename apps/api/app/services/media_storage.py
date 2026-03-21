from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_processing import format_size_label


def resolve_storage_path(media: MediaAsset) -> Path:
    return Path(settings.storage_dir).parent / media.storage_key


def remove_storage_file(media: MediaAsset) -> bool:
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
        if item.storage_provider == "local" and not resolve_storage_path(item).exists():
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
    tracked_storage_keys: set[str] = set()
    report_items: list[dict] = []

    for item in items:
        created_at = _coerce_utc(item.created_at)
        age_days = max((now - created_at).days, 0)
        size_bytes = int(item.size_bytes or 0)
        file_missing = item.storage_provider == "local" and not resolve_storage_path(item).exists()

        total_size_bytes += size_bytes
        if file_missing:
            missing_file_count += 1
        if oldest_media_age_days is None or age_days > oldest_media_age_days:
            oldest_media_age_days = age_days
        tracked_storage_keys.add(item.storage_key)
        report_items.append(
            {
                "media_id": item.id,
                "record_id": item.record_id,
                "original_filename": item.original_filename,
                "media_type": item.media_type,
                "processing_status": item.processing_status,
                "size_bytes": size_bytes,
                "size_label": format_size_label(size_bytes),
                "created_at": item.created_at,
                "age_days": age_days,
                "file_missing": file_missing,
            }
        )

    old_items = [item for item in report_items if item["age_days"] >= older_than_days]
    orphan_file_count, orphan_file_size_bytes = _scan_workspace_orphan_files(workspace_id, tracked_storage_keys)
    largest_items = sorted(
        report_items,
        key=lambda item: (-item["size_bytes"], -item["age_days"], item["original_filename"].lower()),
    )[:limit]
    retention_candidates = sorted(
        old_items,
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
        file_missing = item.storage_provider == "local" and not resolve_storage_path(item).exists()
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
            if item.storage_provider == "local":
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
