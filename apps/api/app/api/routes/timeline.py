from __future__ import annotations

from collections import Counter
from datetime import date, datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.record import Record
from app.models.user import User
from app.schemas.record import RecordRead
from app.schemas.timeline import TimelineDayRead


router = APIRouter()


def _effective_timestamp(record: Record) -> datetime:
    return record.occurred_at or record.created_at


def _extract_place_name(record: Record) -> str | None:
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


@router.get("/{workspace_id}/timeline")
def list_timeline(
    workspace_id: str,
    type_code: str | None = Query(default=None),
    is_avoid: bool | None = Query(default=None),
    start_date: date | None = Query(default=None),
    end_date: date | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)

    query = db.query(Record).filter(Record.workspace_id == workspace_id)
    if type_code:
        query = query.filter(Record.type_code == type_code)
    if is_avoid is not None:
        query = query.filter(Record.is_avoid == is_avoid)

    records = query.all()
    filtered_records: list[Record] = []
    for record in records:
        timeline_date = _effective_timestamp(record).date()
        if start_date and timeline_date < start_date:
            continue
        if end_date and timeline_date > end_date:
            continue
        filtered_records.append(record)

    filtered_records.sort(key=_effective_timestamp, reverse=True)

    grouped: dict[str, list[Record]] = {}
    for record in filtered_records:
        day_key = _effective_timestamp(record).date().isoformat()
        grouped.setdefault(day_key, []).append(record)

    items: list[TimelineDayRead] = []
    for day_key, day_records in grouped.items():
        place_counter = Counter(
            place_name
            for place_name in (_extract_place_name(record) for record in day_records)
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
    return {
        "success": True,
        "data": {
            "items": [item.model_dump() for item in items],
            "total_days": len(items),
            "total_records": len(filtered_records),
        },
    }
