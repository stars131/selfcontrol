from __future__ import annotations

from datetime import datetime, timezone

from app.services.workspace_transfer_manifest import (
    WORKSPACE_EXPORT_SCHEMA_VERSION,
    build_imported_reference_metadata,
    isoformat_optional_datetime,
    parse_optional_datetime,
)


def test_workspace_transfer_schema_version_is_stable() -> None:
    assert WORKSPACE_EXPORT_SCHEMA_VERSION == "workspace-export-v1"


def test_isoformat_optional_datetime_normalizes_none_naive_and_aware_values() -> None:
    naive = datetime(2026, 3, 29, 10, 15, 30)
    aware = datetime(2026, 3, 29, 10, 15, 30, tzinfo=timezone.utc)

    assert isoformat_optional_datetime(None) is None
    assert isoformat_optional_datetime(naive) == "2026-03-29T10:15:30+00:00"
    assert isoformat_optional_datetime(aware) == "2026-03-29T10:15:30+00:00"


def test_parse_optional_datetime_accepts_iso_strings_and_rejects_invalid_values() -> None:
    assert parse_optional_datetime(None) is None
    assert parse_optional_datetime("") is None
    assert parse_optional_datetime("   ") is None
    assert parse_optional_datetime("not-a-date") is None

    parsed_with_z = parse_optional_datetime("2026-03-29T10:15:30Z")
    parsed_with_offset = parse_optional_datetime("2026-03-29T18:15:30+08:00")

    assert parsed_with_z == datetime(2026, 3, 29, 10, 15, 30, tzinfo=timezone.utc)
    assert parsed_with_offset == datetime.fromisoformat("2026-03-29T18:15:30+08:00")


def test_build_imported_reference_metadata_preserves_existing_keys_and_adds_reference_markers() -> None:
    original = {
        "remote_reference": {"bucket": "memo", "object_key": "voice.m4a"},
        "nested": {"provider": "custom"},
    }

    imported = build_imported_reference_metadata(original)

    assert imported["remote_reference"] == {"bucket": "memo", "object_key": "voice.m4a"}
    assert imported["nested"] == {"provider": "custom"}
    assert imported["import_mode"] == "reference_only"
    assert isinstance(imported["reference_only_imported_at"], str)
