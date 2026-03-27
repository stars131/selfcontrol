from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from app.core.config import settings


def coerce_retention_datetime(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def list_workspace_orphan_files(
    workspace_id: str, tracked_storage_keys: set[str]
) -> list[Path]:
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


def scan_workspace_orphan_files(
    workspace_id: str, tracked_storage_keys: set[str]
) -> tuple[int, int]:
    orphan_files = list_workspace_orphan_files(workspace_id, tracked_storage_keys)
    return len(orphan_files), sum(file_path.stat().st_size for file_path in orphan_files)
