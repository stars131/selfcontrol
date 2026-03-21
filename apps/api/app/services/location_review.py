from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
from math import isfinite


VALID_LOCATION_REVIEW_STATUSES = {"pending", "confirmed", "needs_review"}
MAX_LOCATION_HISTORY_ENTRIES = 50


def _read_string(value: object) -> str | None:
    if isinstance(value, str):
        normalized = value.strip()
        if normalized:
            return normalized
    return None


def _read_float(value: object) -> float | None:
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return float(value) if isfinite(float(value)) else None
    if isinstance(value, str):
        raw = value.strip()
        if not raw:
            return None
        try:
            parsed = float(raw)
        except ValueError:
            return None
        return parsed if isfinite(parsed) else None
    return None


def normalize_location(value: object) -> dict | None:
    if value is None or not isinstance(value, dict):
        return None

    location: dict[str, object] = {}
    place_name = _read_string(value.get("place_name"))
    address = _read_string(value.get("address"))
    latitude = _read_float(value.get("latitude"))
    longitude = _read_float(value.get("longitude"))
    source = _read_string(value.get("source")) or "manual"

    if place_name:
        location["place_name"] = place_name
    if address:
        location["address"] = address
    if latitude is not None:
        location["latitude"] = latitude
    if longitude is not None:
        location["longitude"] = longitude
    if not location:
        return None

    location["source"] = source
    return location


def _normalize_review_status(value: object) -> str | None:
    if not isinstance(value, str):
        return None
    normalized = value.strip().lower()
    return normalized if normalized in VALID_LOCATION_REVIEW_STATUSES else None


def _normalize_review(value: object) -> dict | None:
    if not isinstance(value, dict):
        return None

    status = _normalize_review_status(value.get("status"))
    note = _read_string(value.get("note"))
    updated_at = _read_string(value.get("updated_at"))
    updated_by = _read_string(value.get("updated_by"))
    confirmed_at = _read_string(value.get("confirmed_at"))

    review: dict[str, object] = {}
    if status:
        review["status"] = status
    if note:
        review["note"] = note
    if updated_at:
        review["updated_at"] = updated_at
    if updated_by:
        review["updated_by"] = updated_by
    if confirmed_at:
        review["confirmed_at"] = confirmed_at
    return review or None


def _location_signature(location: dict | None) -> tuple:
    if not location:
        return ()
    return (
        location.get("place_name"),
        location.get("address"),
        location.get("latitude"),
        location.get("longitude"),
        location.get("source"),
    )


def _review_signature(review: dict | None) -> tuple:
    if not review:
        return ()
    return (
        review.get("status"),
        review.get("note"),
    )


def _iso_now(now: datetime | None = None) -> str:
    current = now or datetime.now(timezone.utc)
    return current.astimezone(timezone.utc).isoformat()


def _build_review(
    *,
    existing_review: dict | None,
    incoming_review: object,
    location_exists: bool,
    location_changed: bool,
    actor_user_id: str,
    now: datetime,
) -> tuple[dict | None, bool]:
    if not location_exists:
        return None, bool(existing_review)

    existing = existing_review or {}
    incoming = incoming_review if isinstance(incoming_review, dict) else {}
    incoming_status = _normalize_review_status(incoming.get("status"))
    incoming_note = _read_string(incoming.get("note"))
    existing_status = _normalize_review_status(existing.get("status"))
    existing_note = _read_string(existing.get("note"))
    now_iso = _iso_now(now)

    if location_changed:
        status = incoming_status or "pending"
        note = incoming_note
    elif incoming:
        status = incoming_status or existing_status or "pending"
        note = incoming_note if "note" in incoming else existing_note
    else:
        status = existing_status or "pending"
        note = existing_note

    review: dict[str, object] = {"status": status}
    if note:
        review["note"] = note

    previous_signature = _review_signature(existing_review)
    next_signature = _review_signature(review)
    review_changed = previous_signature != next_signature

    if status == "confirmed":
        review["confirmed_at"] = (
            _read_string(incoming.get("confirmed_at"))
            or _read_string(existing.get("confirmed_at"))
            or now_iso
        )

    if review_changed or location_changed or not existing_review:
        review["updated_at"] = now_iso
        review["updated_by"] = actor_user_id
    else:
        if _read_string(existing.get("updated_at")):
            review["updated_at"] = existing["updated_at"]
        if _read_string(existing.get("updated_by")):
            review["updated_by"] = existing["updated_by"]

    return review, review_changed or location_changed or not existing_review


def _normalize_history(value: object) -> list[dict]:
    if not isinstance(value, list):
        return []
    return [deepcopy(item) for item in value if isinstance(item, dict)]


def _build_history_entry(
    *,
    action_code: str,
    location_snapshot: dict | None,
    review: dict | None,
    actor_user_id: str,
    now: datetime,
) -> dict:
    snapshot = location_snapshot or {}
    review_data = review or {}
    entry = {
        "changed_at": _iso_now(now),
        "changed_by": actor_user_id,
        "action_code": action_code,
        "review_status": review_data.get("status"),
        "review_note": review_data.get("note"),
        "place_name": snapshot.get("place_name"),
        "address": snapshot.get("address"),
        "latitude": snapshot.get("latitude"),
        "longitude": snapshot.get("longitude"),
        "source": snapshot.get("source"),
    }
    return {key: value for key, value in entry.items() if value is not None}


def prepare_record_extra_data(
    *,
    existing_extra_data: dict | None,
    incoming_extra_data: dict | None,
    actor_user_id: str,
    now: datetime | None = None,
) -> tuple[dict, bool, bool]:
    current_time = now or datetime.now(timezone.utc)
    existing = deepcopy(existing_extra_data) if isinstance(existing_extra_data, dict) else {}
    incoming = incoming_extra_data if isinstance(incoming_extra_data, dict) else {}
    merged = deepcopy(existing)

    for key, value in incoming.items():
        if key not in {"location", "location_review", "location_history"}:
            merged[key] = deepcopy(value)

    current_location = normalize_location(existing.get("location"))
    has_explicit_location = "location" in incoming
    next_location = normalize_location(incoming.get("location")) if has_explicit_location else current_location
    location_changed = _location_signature(current_location) != _location_signature(next_location)

    existing_review = _normalize_review(existing.get("location_review"))
    next_review, review_changed = _build_review(
        existing_review=existing_review,
        incoming_review=incoming.get("location_review"),
        location_exists=next_location is not None,
        location_changed=location_changed,
        actor_user_id=actor_user_id,
        now=current_time,
    )

    if next_location is None:
        merged.pop("location", None)
    else:
        merged["location"] = next_location

    if next_review is None:
        merged.pop("location_review", None)
    else:
        merged["location_review"] = next_review

    history = _normalize_history(existing.get("location_history"))
    history_action: str | None = None
    history_snapshot: dict | None = None
    history_review: dict | None = next_review

    if location_changed:
        if current_location is None and next_location is not None:
            history_action = "set"
            history_snapshot = next_location
        elif current_location is not None and next_location is None:
            history_action = "removed"
            history_snapshot = current_location
            history_review = existing_review
        elif current_location is not None and next_location is not None:
            history_action = "moved"
            history_snapshot = next_location
    elif review_changed and next_location is not None:
        history_action = "review"
        history_snapshot = next_location

    if history_action and history_snapshot:
        history.append(
            _build_history_entry(
                action_code=history_action,
                location_snapshot=history_snapshot,
                review=history_review,
                actor_user_id=actor_user_id,
                now=current_time,
            )
        )

    if history:
        merged["location_history"] = history[-MAX_LOCATION_HISTORY_ENTRIES:]
    else:
        merged.pop("location_history", None)

    return merged, location_changed, review_changed
