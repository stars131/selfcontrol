from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_retention_actions import (
    build_media_retention_action_result,
    select_archive_media_candidates,
    select_cleanup_media_candidates,
)
from app.services.media_retention_common import list_workspace_orphan_files
from app.services.media_retention_reporting import build_workspace_media_retention_report
from app.services.media_storage import (
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
    workspace_items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    selection = select_cleanup_media_candidates(
        workspace_items,
        media_ids,
        older_than_days=older_than_days,
    )

    orphan_files = (
        list_workspace_orphan_files(workspace_id, selection.tracked_storage_keys)
        if purge_orphan_files
        else []
    )
    result = build_media_retention_action_result(
        workspace_id=workspace_id,
        older_than_days=older_than_days,
        dry_run=dry_run,
        selection=selection,
        orphan_files=orphan_files,
    )

    if not dry_run:
        for item in selection.candidate_items:
            remove_storage_file(item)
            db.delete(item)
        db.commit()

        for record_id in sorted(selection.affected_record_ids):
            rebuild_record_knowledge(db, record_id)

        for orphan_file in orphan_files:
            if orphan_file.exists():
                remove_file_and_cleanup_dirs(orphan_file)

    return result


def archive_workspace_media_retention(
    db: Session,
    workspace_id: str,
    *,
    media_ids: list[str],
    older_than_days: int = 90,
    dry_run: bool = False,
) -> dict:
    workspace_items = db.query(MediaAsset).filter(MediaAsset.workspace_id == workspace_id).all()
    selection = select_archive_media_candidates(
        workspace_items,
        media_ids,
        older_than_days=older_than_days,
    )
    result = build_media_retention_action_result(
        workspace_id=workspace_id,
        older_than_days=older_than_days,
        dry_run=dry_run,
        selection=selection,
    )

    if not dry_run:
        for item in selection.candidate_items:
            archive_workspace_media_item(item)
            db.add(item)
        db.commit()

        for record_id in sorted(selection.affected_record_ids):
            rebuild_record_knowledge(db, record_id)

    return result
