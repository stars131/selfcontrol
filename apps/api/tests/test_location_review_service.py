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


def test_prepare_record_extra_data_sets_new_location_with_pending_review_history() -> None:
    now = datetime(2026, 3, 29, 10, 0, tzinfo=timezone.utc)

    merged, location_changed, review_changed = prepare_record_extra_data(
        existing_extra_data={"category": "snack"},
        incoming_extra_data={
            "location": {
                "place_name": "Tea Shop",
                "address": "Lane 8",
                "latitude": "31.2304",
                "longitude": "121.4737",
                "source": "map_search",
            }
        },
        actor_user_id="user-3",
        now=now,
    )

    assert location_changed is True
    assert review_changed is True
    assert merged["category"] == "snack"
    assert merged["location"]["place_name"] == "Tea Shop"
    assert merged["location_review"]["status"] == "pending"
    assert merged["location_review"]["updated_by"] == "user-3"
    assert merged["location_review"]["updated_at"] == now.isoformat()
    assert merged["location_history"] == [
        {
            "action_code": "set",
            "changed_at": now.isoformat(),
            "changed_by": "user-3",
            "review_status": "pending",
            "place_name": "Tea Shop",
            "address": "Lane 8",
            "latitude": 31.2304,
            "longitude": 121.4737,
            "source": "map_search",
        }
    ]


def test_prepare_record_extra_data_removes_location_and_review_with_history_entry() -> None:
    now = datetime(2026, 3, 29, 11, 0, tzinfo=timezone.utc)
    existing = {
        "location": {
            "place_name": "Tea Shop",
            "address": "Lane 8",
            "latitude": 31.2304,
            "longitude": 121.4737,
            "source": "map_search",
        },
        "location_review": {
            "status": "confirmed",
            "note": "checked",
            "confirmed_at": "2026-03-20T08:00:00+00:00",
            "updated_at": "2026-03-20T08:00:00+00:00",
            "updated_by": "user-1",
        },
        "location_history": "invalid-history",
    }

    merged, location_changed, review_changed = prepare_record_extra_data(
        existing_extra_data=existing,
        incoming_extra_data={"location": None},
        actor_user_id="user-4",
        now=now,
    )

    assert location_changed is True
    assert review_changed is True
    assert "location" not in merged
    assert "location_review" not in merged
    assert merged["location_history"] == [
        {
            "action_code": "removed",
            "changed_at": now.isoformat(),
            "changed_by": "user-4",
            "review_status": "confirmed",
            "review_note": "checked",
            "place_name": "Tea Shop",
            "address": "Lane 8",
            "latitude": 31.2304,
            "longitude": 121.4737,
            "source": "map_search",
        }
    ]
