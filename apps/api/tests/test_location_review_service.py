from __future__ import annotations

from datetime import datetime, timezone

from app.services.location_review import (
    MAX_LOCATION_HISTORY_ENTRIES,
    normalize_location,
    prepare_record_extra_data,
)


def test_normalize_location_defaults_source_and_skips_invalid_values() -> None:
    assert normalize_location(None) is None
    assert normalize_location({"latitude": True, "longitude": False}) is None

    normalized = normalize_location(
        {
            "place_name": "  Noodle House  ",
            "address": "  Block A  ",
            "latitude": "30.2741",
            "longitude": True,
            "source": "   ",
        }
    )

    assert normalized == {
        "place_name": "Noodle House",
        "address": "Block A",
        "latitude": 30.2741,
        "source": "manual",
    }


def test_prepare_record_extra_data_preserves_review_metadata_when_unchanged() -> None:
    now = datetime(2026, 3, 29, 8, 30, tzinfo=timezone.utc)
    existing = {
        "category": "lunch",
        "location": {
            "place_name": "Noodle House",
            "address": "Block A",
            "latitude": 30.2741,
            "longitude": 120.1551,
            "source": "search",
        },
        "location_review": {
            "status": "confirmed",
            "note": "verified",
            "confirmed_at": "2026-03-20T08:00:00+00:00",
            "updated_at": "2026-03-20T08:00:00+00:00",
            "updated_by": "user-1",
        },
        "location_history": [
            {
                "action_code": "set",
                "changed_at": "2026-03-20T08:00:00+00:00",
                "changed_by": "user-1",
            }
        ],
    }

    merged, location_changed, review_changed = prepare_record_extra_data(
        existing_extra_data=existing,
        incoming_extra_data={
            "category": "dinner",
            "location": {
                "place_name": "Noodle House",
                "address": "Block A",
                "latitude": 30.2741,
                "longitude": 120.1551,
                "source": "search",
            },
            "location_review": {
                "status": "confirmed",
                "note": "verified",
            },
        },
        actor_user_id="user-2",
        now=now,
    )

    assert location_changed is False
    assert review_changed is False
    assert merged["category"] == "dinner"
    assert merged["location_review"]["updated_at"] == "2026-03-20T08:00:00+00:00"
    assert merged["location_review"]["updated_by"] == "user-1"
    assert merged["location_review"]["confirmed_at"] == "2026-03-20T08:00:00+00:00"
    assert len(merged["location_history"]) == 1


def test_prepare_record_extra_data_truncates_history_when_review_changes() -> None:
    now = datetime(2026, 3, 29, 9, 0, tzinfo=timezone.utc)
    existing = {
        "location": {
            "place_name": "Noodle House",
            "address": "Block A",
            "latitude": 30.2741,
            "longitude": 120.1551,
            "source": "search",
        },
        "location_review": {
            "status": "pending",
            "updated_at": "2026-03-20T08:00:00+00:00",
            "updated_by": "user-1",
        },
        "location_history": [
            {
                "action_code": "review" if index else "set",
                "changed_at": f"2026-03-{index + 1:02d}T08:00:00+00:00",
                "changed_by": "user-1",
                "review_status": "pending",
                "place_name": "Noodle House",
            }
            for index in range(MAX_LOCATION_HISTORY_ENTRIES)
        ],
    }

    merged, location_changed, review_changed = prepare_record_extra_data(
        existing_extra_data=existing,
        incoming_extra_data={
            "location_review": {
                "status": "confirmed",
                "note": "checked on map",
            }
        },
        actor_user_id="reviewer-1",
        now=now,
    )

    assert location_changed is False
    assert review_changed is True
    assert merged["location_review"]["status"] == "confirmed"
    assert merged["location_review"]["note"] == "checked on map"
    assert merged["location_review"]["updated_by"] == "reviewer-1"
    assert merged["location_review"]["updated_at"] == now.isoformat()
    assert merged["location_review"]["confirmed_at"] == now.isoformat()
    assert len(merged["location_history"]) == MAX_LOCATION_HISTORY_ENTRIES
    assert merged["location_history"][0]["changed_at"] == "2026-03-02T08:00:00+00:00"
    assert merged["location_history"][-1]["action_code"] == "review"
    assert merged["location_history"][-1]["review_status"] == "confirmed"
    assert merged["location_history"][-1]["changed_by"] == "reviewer-1"
