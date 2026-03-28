from __future__ import annotations

from collections import Counter
from datetime import date, datetime

from app.models.record import Record
from app.schemas.record import RecordRead
from app.schemas.timeline import TimelineDayRead


def effective_record_timestamp(record: Record) -> datetime:
    return record.occurred_at or record.created_at


def extract_record_place_name(record: Record) -> str | None:
    if not isinstance(record.extra_data, dict):
        return None
    location = record.extra_data.get("location")
    if not isinstance(location, dict):
        return None

    for key in ("place_name", "address"):
        value = location.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return None


def filter_timeline_records(
    records: list[Record],
    *,
    start_date: date | None,
    end_date: date | None,
) -> list[Record]:
    filtered_records: list[Record] = []
    for record in records:
        timeline_date = effective_record_timestamp(record).date()
        if start_date and timeline_date < start_date:
            continue
        if end_date and timeline_date > end_date:
            continue
        filtered_records.append(record)

    filtered_records.sort(key=effective_record_timestamp, reverse=True)
    return filtered_records


def build_timeline_days(records: list[Record]) -> list[TimelineDayRead]:
    grouped: dict[str, list[Record]] = {}
    for record in records:
        day_key = effective_record_timestamp(record).date().isoformat()
        grouped.setdefault(day_key, []).append(record)

    items: list[TimelineDayRead] = []
    for day_key, day_records in grouped.items():
        place_counter = Counter(
            place_name
            for place_name in (extract_record_place_name(record) for record in day_records)
            if place_name
        )
        top_places = [
            name
            for name, _ in sorted(
                place_counter.items(),
                key=lambda item: (-item[1], item[0]),
            )[:3]
        ]
        items.append(
            TimelineDayRead(
                date=day_key,
                count=len(day_records),
                avoid_count=sum(1 for record in day_records if record.is_avoid),
                top_places=top_places,
                items=[RecordRead.model_validate(record) for record in day_records],
            )
        )

    items.sort(key=lambda item: item.date, reverse=True)
    return items
