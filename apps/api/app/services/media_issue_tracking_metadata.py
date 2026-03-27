from __future__ import annotations

from app.models.media import MediaAsset


LOCAL_STORAGE_PROVIDER = "local"
DEAD_LETTER_RETRY_STATES = {"manual_only", "exhausted", "disabled"}


def read_media_issue_metadata(media: MediaAsset) -> dict:
    return media.metadata_json if isinstance(media.metadata_json, dict) else {}


def read_processing_retry_state(media: MediaAsset) -> str | None:
    metadata = read_media_issue_metadata(media)
    value = metadata.get("processing_retry_state")
    if not isinstance(value, str):
        return None
    normalized = value.strip().lower()
    return normalized or None


def read_media_issue_text(metadata: dict, field: str) -> str | None:
    value = metadata.get(field)
    return value if isinstance(value, str) else None


def read_media_issue_int(metadata: dict, field: str) -> int | None:
    value = metadata.get(field)
    return int(value) if str(value or "").strip().isdigit() else None


def sort_media_processing_issues(items: list[dict]) -> list[dict]:
    items.sort(
        key=lambda item: (
            item["processing_last_failure_at"] or "",
            item["processing_last_attempt_at"] or "",
            item["updated_at"].isoformat()
            if hasattr(item["updated_at"], "isoformat")
            else str(item["updated_at"]),
        ),
        reverse=True,
    )
    return items
