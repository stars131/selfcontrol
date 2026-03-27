from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_file_analysis import format_size_label
from app.services.media_retention_common import (
    coerce_retention_datetime,
    list_workspace_orphan_files,
)
from app.services.media_retention_reporting import build_workspace_media_retention_report
from app.services.media_storage import (
    get_media_storage_tier,
    media_uses_local_storage,
    remove_file_and_cleanup_dirs,
    remove_storage_file,
    resolve_storage_path,
)


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
    remove_file_and_cleanup_dirs(file_path)
    media.storage_key = str(archive_path.relative_to(Path(settings.storage_dir).parent))
    metadata = media.metadata_json if isinstance(media.metadata_json, dict) else {}
    media.metadata_json = {
        **metadata,
        "storage_tier": "archive",
        "archived_at": datetime.now(timezone.utc).isoformat(),
    }
    return True
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

        created_at = coerce_retention_datetime(item.created_at)
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

    orphan_files = (
        list_workspace_orphan_files(workspace_id, tracked_storage_keys)
        if purge_orphan_files
        else []
    )
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
                remove_file_and_cleanup_dirs(orphan_file)

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

        created_at = coerce_retention_datetime(item.created_at)
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
