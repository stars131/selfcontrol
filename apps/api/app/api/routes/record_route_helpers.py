from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.record import Record


def read_record_location(record: Record) -> dict[str, object]:
    if not isinstance(record.extra_data, dict):
        return {}
    location = record.extra_data.get("location")
    return location if isinstance(location, dict) else {}


def record_has_coordinates(record: Record) -> bool:
    location = read_record_location(record)
    latitude = location.get("latitude")
    longitude = location.get("longitude")
    return isinstance(latitude, (int, float)) and isinstance(longitude, (int, float))


def record_matches_location_query(record: Record, location_query: str) -> bool:
    query = location_query.strip().lower()
    if not query:
        return True

    location = read_record_location(record)
    haystacks = [
        location.get("place_name"),
        location.get("address"),
    ]
    return any(isinstance(value, str) and query in value.lower() for value in haystacks)


def record_matches_review_status(record: Record, review_status: str) -> bool:
    normalized = review_status.strip().lower()
    if not normalized:
        return True

    if not isinstance(record.extra_data, dict):
        return normalized == "pending"

    review = record.extra_data.get("location_review")
    if not isinstance(review, dict):
        return normalized == "pending"

    status = review.get("status")
    return isinstance(status, str) and status.lower() == normalized


def filter_records_by_location_fields(
    records: list[Record],
    *,
    location_query: str | None,
    review_status: str | None,
    has_coordinates: bool | None,
) -> list[Record]:
    filtered_records = records
    if location_query:
        filtered_records = [record for record in filtered_records if record_matches_location_query(record, location_query)]
    if review_status:
        filtered_records = [record for record in filtered_records if record_matches_review_status(record, review_status)]
    if has_coordinates is not None:
        filtered_records = [record for record in filtered_records if record_has_coordinates(record) is has_coordinates]
    return filtered_records


def get_workspace_record_or_404(db: Session, *, workspace_id: str, record_id: str) -> Record:
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")
    return record
