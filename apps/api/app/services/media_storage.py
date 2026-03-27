from __future__ import annotations

from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.media_file_analysis import format_size_label

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

    remove_file_and_cleanup_dirs(file_path)
    return True


def remove_file_and_cleanup_dirs(file_path: Path) -> None:
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
