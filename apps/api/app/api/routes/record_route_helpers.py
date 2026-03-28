from __future__ import annotations

from collections.abc import Callable

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.media import MediaAsset
from app.models.record import Record
from app.services.media_storage import media_uses_local_storage, remove_storage_file


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


def apply_record_updates(record: Record, changes: dict) -> None:
    for field, value in changes.items():
        setattr(record, field, value)


def remove_record_media_assets(
    db: Session,
    media_assets: list[MediaAsset],
    *,
    delete_remote_media_fn: Callable[[Session, MediaAsset], None],
) -> int:
    removed_media_count = 0
    for media in media_assets:
        if media_uses_local_storage(media):
            if remove_storage_file(media):
                removed_media_count += 1
            continue

        try:
            delete_remote_media_fn(db, media)
            removed_media_count += 1
        except Exception:  # noqa: BLE001
            continue
    return removed_media_count
