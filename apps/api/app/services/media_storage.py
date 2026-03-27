from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_processing import format_size_label

LOCAL_STORAGE_PROVIDER = "local"


def is_local_storage_provider(provider_code: str | None) -> bool:
    return (provider_code or "").strip().lower() == LOCAL_STORAGE_PROVIDER


def media_uses_local_storage(media: MediaAsset) -> bool:
    return is_local_storage_provider(media.storage_provider)


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
