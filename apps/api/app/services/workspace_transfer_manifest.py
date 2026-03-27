from __future__ import annotations

from datetime import datetime, timezone

WORKSPACE_EXPORT_SCHEMA_VERSION = "workspace-export-v1"


def isoformat_optional_datetime(value: datetime | None) -> str | None:
    if value is None:
        return None
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    return value.isoformat()


def parse_optional_datetime(value: object) -> datetime | None:
    if not isinstance(value, str) or not value.strip():
        return None
    normalized = value.replace("Z", "+00:00")
    try:
        return datetime.fromisoformat(normalized)
    except ValueError:
        return None


def build_imported_reference_metadata(metadata_json: dict) -> dict:
    return {
        **metadata_json,
        "import_mode": "reference_only",
        "reference_only_imported_at": datetime.now(timezone.utc).isoformat(),
    }
