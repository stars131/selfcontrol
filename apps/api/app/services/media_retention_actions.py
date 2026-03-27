from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

from app.models.media import MediaAsset
from app.services.media_file_analysis import format_size_label
from app.services.media_retention_common import coerce_retention_datetime
from app.services.media_storage import (
    get_media_storage_tier,
    media_uses_local_storage,
    resolve_storage_path,
)


@dataclass
class MediaRetentionActionSelection:
    candidate_items: list[MediaAsset]
    affected_record_ids: set[str] = field(default_factory=set)
    skipped_reason_by_media_id: dict[str, str] = field(default_factory=dict)
    tracked_storage_keys: set[str] = field(default_factory=set)


def select_cleanup_media_candidates(
    items: Sequence[MediaAsset],
    media_ids: Sequence[str],
    *,
    older_than_days: int = 90,
    now: datetime | None = None,
) -> MediaRetentionActionSelection:
    reference_now = now or datetime.now(timezone.utc)
    media_id_set = set(media_ids)
    matched_items_by_id = {item.id: item for item in items if item.id in media_id_set}
    selection = MediaRetentionActionSelection(
        candidate_items=[],
        tracked_storage_keys={item.storage_key for item in items},
    )

    for media_id in media_ids:
        item = matched_items_by_id.get(media_id)
        if item is None:
            selection.skipped_reason_by_media_id[media_id] = "not_found"
            continue

        created_at = coerce_retention_datetime(item.created_at)
        age_days = max((reference_now - created_at).days, 0)
        if not media_uses_local_storage(item):
            selection.skipped_reason_by_media_id[media_id] = (
                "storage_provider_cleanup_not_supported"
            )
            continue

        file_missing = not resolve_storage_path(item).exists()
        if get_media_storage_tier(item) == "archive":
            selection.skipped_reason_by_media_id[media_id] = "already_archived"
            continue
        if age_days < older_than_days and not file_missing:
            selection.skipped_reason_by_media_id[media_id] = "not_old_enough"
            continue

        selection.candidate_items.append(item)
        selection.affected_record_ids.add(item.record_id)

    return selection


def select_archive_media_candidates(
    items: Sequence[MediaAsset],
    media_ids: Sequence[str],
    *,
    older_than_days: int = 90,
    now: datetime | None = None,
) -> MediaRetentionActionSelection:
    reference_now = now or datetime.now(timezone.utc)
    media_id_set = set(media_ids)
    matched_items_by_id = {item.id: item for item in items if item.id in media_id_set}
    selection = MediaRetentionActionSelection(candidate_items=[])

    for media_id in media_ids:
        item = matched_items_by_id.get(media_id)
        if item is None:
            selection.skipped_reason_by_media_id[media_id] = "not_found"
            continue

        if get_media_storage_tier(item) == "archive":
            selection.skipped_reason_by_media_id[media_id] = "already_archived"
            continue
        if not media_uses_local_storage(item):
            selection.skipped_reason_by_media_id[media_id] = (
                "storage_provider_archive_not_supported"
            )
            continue

        created_at = coerce_retention_datetime(item.created_at)
        age_days = max((reference_now - created_at).days, 0)
        file_missing = not resolve_storage_path(item).exists()
        if file_missing:
            selection.skipped_reason_by_media_id[media_id] = "missing_storage_file"
            continue
        if age_days < older_than_days:
            selection.skipped_reason_by_media_id[media_id] = "not_old_enough"
            continue

        selection.candidate_items.append(item)
        selection.affected_record_ids.add(item.record_id)

    return selection


def build_media_retention_action_result(
    *,
    workspace_id: str,
    older_than_days: int,
    dry_run: bool,
    selection: MediaRetentionActionSelection,
    orphan_files: Sequence[Path] | None = None,
) -> dict:
    candidate_media_size_bytes = sum(
        int(item.size_bytes or 0) for item in selection.candidate_items
    )
    result = {
        "workspace_id": workspace_id,
        "older_than_days": older_than_days,
        "dry_run": dry_run,
        "candidate_media_count": len(selection.candidate_items),
        "candidate_media_size_bytes": candidate_media_size_bytes,
        "candidate_media_size_label": format_size_label(candidate_media_size_bytes),
        "affected_record_ids": sorted(selection.affected_record_ids),
        "skipped_media_ids": list(selection.skipped_reason_by_media_id.keys()),
        "skipped_reason_by_media_id": selection.skipped_reason_by_media_id,
    }

    if orphan_files is None:
        return result

    orphan_file_list = list(orphan_files)
    orphan_file_size_bytes = sum(file_path.stat().st_size for file_path in orphan_file_list)
    result.update(
        {
            "orphan_file_count": len(orphan_file_list),
            "orphan_file_size_bytes": orphan_file_size_bytes,
            "orphan_file_size_label": format_size_label(orphan_file_size_bytes),
        }
    )
    return result
