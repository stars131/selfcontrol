from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.search_preset import SearchPreset
from app.schemas.search_preset import SearchPresetFilters


VALID_REVIEW_STATUS = {"all", "pending", "confirmed", "needs_review"}
VALID_MAPPED_ONLY = {"all", "mapped", "unmapped"}
VALID_IS_AVOID = {"all", "avoid", "normal"}


def normalize_search_preset_filters(payload: SearchPresetFilters) -> dict[str, str]:
    query = payload.query.strip()
    type_code = payload.type_code.strip() or "all"
    is_avoid = payload.is_avoid.strip().lower() or "all"
    place_query = payload.place_query.strip()
    review_status = payload.review_status.strip().lower() or "all"
    mapped_only = payload.mapped_only.strip().lower() or "all"

    if is_avoid not in VALID_IS_AVOID:
        raise HTTPException(status_code=400, detail="Invalid avoid filter")
    if review_status not in VALID_REVIEW_STATUS:
        raise HTTPException(status_code=400, detail="Invalid review status")
    if mapped_only not in VALID_MAPPED_ONLY:
        raise HTTPException(status_code=400, detail="Invalid map status")

    return {
        "query": query,
        "type_code": type_code,
        "is_avoid": is_avoid,
        "place_query": place_query,
        "review_status": review_status,
        "mapped_only": mapped_only,
    }


def normalize_search_preset_name(value: str) -> str:
    name = value.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Preset name is required")
    return name


def get_workspace_search_preset_or_404(db: Session, *, workspace_id: str, preset_id: str) -> SearchPreset:
    item = db.get(SearchPreset, preset_id)
    if not item or item.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Search preset not found")
    return item
