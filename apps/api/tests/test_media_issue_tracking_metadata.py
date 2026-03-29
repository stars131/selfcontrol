from __future__ import annotations

from datetime import datetime, timezone
from types import SimpleNamespace

from app.services.media_issue_tracking_metadata import (
    read_media_issue_int,
    read_media_issue_metadata,
    read_media_issue_text,
    read_processing_retry_state,
    sort_media_processing_issues,
)


def test_read_processing_retry_state_normalizes_string_values() -> None:
    media = SimpleNamespace(metadata_json={"processing_retry_state": " Manual_Only "})

    assert read_processing_retry_state(media) == "manual_only"


def test_read_media_issue_metadata_returns_empty_dict_for_non_dict_metadata() -> None:
    assert read_media_issue_metadata(SimpleNamespace(metadata_json=["not", "a", "dict"])) == {}


def test_read_processing_retry_state_returns_none_for_missing_or_blank_values() -> None:
    assert read_processing_retry_state(SimpleNamespace(metadata_json={})) is None
    assert (
        read_processing_retry_state(
            SimpleNamespace(metadata_json={"processing_retry_state": 3}),
        )
        is None
    )
    assert (
        read_processing_retry_state(
            SimpleNamespace(metadata_json={"processing_retry_state": "   "}),
        )
        is None
    )


def test_read_media_issue_helpers_extract_valid_text_and_int_values() -> None:
    metadata = {
        "processing_source": "remote_fetch",
        "processing_retry_count": "3",
        "processing_retry_max_attempts": "invalid",
    }

    assert read_media_issue_metadata(SimpleNamespace(metadata_json=metadata)) == metadata
    assert read_media_issue_text(metadata, "processing_source") == "remote_fetch"
    assert read_media_issue_int(metadata, "processing_retry_count") == 3
    assert read_media_issue_int(metadata, "processing_retry_max_attempts") is None


def test_read_media_issue_helpers_reject_non_string_text_and_signed_or_blank_ints() -> None:
    metadata = {
        "processing_source": ["remote_fetch"],
        "processing_retry_count": 7,
        "processing_retry_limit_signed": "-2",
        "processing_retry_limit_plus": "+4",
        "processing_retry_limit_blank": "  ",
    }

    assert read_media_issue_text(metadata, "processing_source") is None
    assert read_media_issue_int(metadata, "processing_retry_count") == 7
    assert read_media_issue_int(metadata, "processing_retry_limit_signed") is None
    assert read_media_issue_int(metadata, "processing_retry_limit_plus") is None
    assert read_media_issue_int(metadata, "processing_retry_limit_blank") is None


def test_sort_media_processing_issues_orders_failure_then_attempt_then_update() -> None:
    issues = [
        {
            "processing_last_failure_at": "2026-03-21T09:00:00+00:00",
            "processing_last_attempt_at": "2026-03-21T09:05:00+00:00",
            "updated_at": datetime(2026, 3, 21, 9, 6, tzinfo=timezone.utc),
        },
        {
            "processing_last_failure_at": "2026-03-21T10:00:00+00:00",
            "processing_last_attempt_at": "2026-03-21T10:05:00+00:00",
            "updated_at": datetime(2026, 3, 21, 10, 6, tzinfo=timezone.utc),
        },
    ]

    sorted_items = sort_media_processing_issues(issues)

    assert sorted_items[0]["processing_last_failure_at"] == "2026-03-21T10:00:00+00:00"


def test_sort_media_processing_issues_uses_attempt_and_updated_at_as_tiebreakers() -> None:
    oldest_attempt = {
        "processing_last_failure_at": "2026-03-21T10:00:00+00:00",
        "processing_last_attempt_at": "2026-03-21T10:04:00+00:00",
        "updated_at": "2026-03-21T10:07:00+00:00",
    }
    earlier_update = {
        "processing_last_failure_at": "2026-03-21T10:00:00+00:00",
        "processing_last_attempt_at": "2026-03-21T10:05:00+00:00",
        "updated_at": datetime(2026, 3, 21, 10, 6, tzinfo=timezone.utc),
    }
    later_update = {
        "processing_last_failure_at": "2026-03-21T10:00:00+00:00",
        "processing_last_attempt_at": "2026-03-21T10:05:00+00:00",
        "updated_at": datetime(2026, 3, 21, 10, 8, tzinfo=timezone.utc),
    }
    issues = [oldest_attempt, earlier_update, later_update]

    sorted_items = sort_media_processing_issues(issues)

    assert sorted_items == [later_update, earlier_update, oldest_attempt]
