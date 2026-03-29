from __future__ import annotations

from datetime import datetime, timezone
from types import SimpleNamespace

from app.api.routes.timeline_route_helpers import (
    build_timeline_days,
    effective_record_timestamp,
    extract_record_place_name,
    filter_timeline_records,
)


def make_record(
    *,
    record_id: str,
    created_at: datetime,
    occurred_at: datetime | None = None,
    title: str | None = None,
    is_avoid: bool = False,
    extra_data=None,
) -> SimpleNamespace:
    return SimpleNamespace(
        id=record_id,
        workspace_id="workspace-1",
        creator_id="user-1",
        type_code="food",
        title=title,
        content="content",
        rating=5,
        is_avoid=is_avoid,
        occurred_at=occurred_at,
        source_type="manual",
        status="active",
        extra_data={} if extra_data is None else extra_data,
        created_at=created_at,
        updated_at=created_at,
    )


def test_effective_record_timestamp_and_place_extraction_cover_fallback_rules() -> None:
    created_at = datetime(2026, 3, 28, 9, 30, tzinfo=timezone.utc)
    occurred_at = datetime(2026, 3, 29, 11, 45, tzinfo=timezone.utc)

    occurred_record = make_record(
        record_id="record-1",
        created_at=created_at,
        occurred_at=occurred_at,
        extra_data={"location": {"place_name": "  Noodle House  ", "address": "Road 1"}},
    )
    address_only_record = make_record(
        record_id="record-2",
        created_at=created_at,
        extra_data={"location": {"place_name": " ", "address": "  Street 9  "}},
    )
    invalid_location_record = make_record(
        record_id="record-3",
        created_at=created_at,
        extra_data={"location": "invalid"},
    )
    invalid_extra_data_record = make_record(
        record_id="record-4",
        created_at=created_at,
        extra_data=[],
    )

    assert effective_record_timestamp(occurred_record) == occurred_at
    assert effective_record_timestamp(address_only_record) == created_at
    assert extract_record_place_name(occurred_record) == "Noodle House"
    assert extract_record_place_name(address_only_record) == "Street 9"
    assert extract_record_place_name(invalid_location_record) is None
    assert extract_record_place_name(invalid_extra_data_record) is None


def test_filter_timeline_records_applies_date_range_and_descending_sort() -> None:
    records = [
        make_record(
            record_id="older",
            created_at=datetime(2026, 3, 25, 8, 0, tzinfo=timezone.utc),
        ),
        make_record(
            record_id="middle",
            created_at=datetime(2026, 3, 26, 10, 0, tzinfo=timezone.utc),
            occurred_at=datetime(2026, 3, 27, 9, 0, tzinfo=timezone.utc),
        ),
        make_record(
            record_id="newer",
            created_at=datetime(2026, 3, 28, 7, 0, tzinfo=timezone.utc),
        ),
    ]

    filtered = filter_timeline_records(
        records,
        start_date=datetime(2026, 3, 26, tzinfo=timezone.utc).date(),
        end_date=datetime(2026, 3, 28, tzinfo=timezone.utc).date(),
    )

    assert [record.id for record in filtered] == ["newer", "middle"]


def test_build_timeline_days_groups_records_and_summarizes_top_places() -> None:
    records = [
        make_record(
            record_id="recent-1",
            created_at=datetime(2026, 3, 29, 10, 0, tzinfo=timezone.utc),
            title="Recent 1",
            is_avoid=False,
            extra_data={"location": {"place_name": "Tea House"}},
        ),
        make_record(
            record_id="recent-2",
            created_at=datetime(2026, 3, 29, 9, 0, tzinfo=timezone.utc),
            title="Recent 2",
            is_avoid=True,
            extra_data={"location": {"place_name": "Tea House"}},
        ),
        make_record(
            record_id="recent-3",
            created_at=datetime(2026, 3, 29, 8, 30, tzinfo=timezone.utc),
            title="Recent 3",
            is_avoid=False,
            extra_data={"location": {"address": "Bakery Lane"}},
        ),
        make_record(
            record_id="older-1",
            created_at=datetime(2026, 3, 28, 12, 0, tzinfo=timezone.utc),
            title="Older 1",
            is_avoid=True,
            extra_data={"location": {"place_name": "Cafe A"}},
        ),
        make_record(
            record_id="older-2",
            created_at=datetime(2026, 3, 28, 11, 0, tzinfo=timezone.utc),
            title="Older 2",
            is_avoid=False,
            extra_data={"location": {"place_name": "Cafe B"}},
        ),
        make_record(
            record_id="older-3",
            created_at=datetime(2026, 3, 28, 10, 0, tzinfo=timezone.utc),
            title="Older 3",
            is_avoid=False,
            extra_data={"location": {"place_name": "Cafe A"}},
        ),
    ]

    timeline_days = build_timeline_days(records)

    assert [item.date for item in timeline_days] == ["2026-03-29", "2026-03-28"]

    recent_day = timeline_days[0]
    assert recent_day.count == 3
    assert recent_day.avoid_count == 1
    assert recent_day.top_places == ["Tea House", "Bakery Lane"]
    assert [item.id for item in recent_day.items] == ["recent-1", "recent-2", "recent-3"]

    older_day = timeline_days[1]
    assert older_day.count == 3
    assert older_day.avoid_count == 1
    assert older_day.top_places == ["Cafe A", "Cafe B"]
    assert [item.id for item in older_day.items] == ["older-1", "older-2", "older-3"]
