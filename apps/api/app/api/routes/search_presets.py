from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.search_preset import SearchPreset
from app.models.user import User
from app.schemas.search_preset import SearchPresetCreate, SearchPresetFilters, SearchPresetRead, SearchPresetUpdate
from app.services.audit import log_audit_event


router = APIRouter()

VALID_REVIEW_STATUS = {"all", "pending", "confirmed", "needs_review"}
VALID_MAPPED_ONLY = {"all", "mapped", "unmapped"}
VALID_IS_AVOID = {"all", "avoid", "normal"}


def normalize_filters(payload: SearchPresetFilters) -> dict[str, str]:
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


@router.get("/{workspace_id}/search-presets")
def list_search_presets(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    items = (
        db.query(SearchPreset)
        .filter(SearchPreset.workspace_id == workspace_id)
        .order_by(SearchPreset.updated_at.desc(), SearchPreset.created_at.desc())
        .all()
    )
    return {"success": True, "data": {"items": [SearchPresetRead.model_validate(item).model_dump() for item in items]}}


@router.post("/{workspace_id}/search-presets")
def create_search_preset(
    workspace_id: str,
    payload: SearchPresetCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Preset name is required")

    item = SearchPreset(
        workspace_id=workspace_id,
        created_by=current_user.id,
        name=name,
        filters_json=normalize_filters(payload.filters),
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="search_preset.create",
        resource_type="search_preset",
        resource_id=item.id,
        message=f"Created search preset {item.name}",
        metadata_json={"name": item.name},
    )
    return {"success": True, "data": {"preset": SearchPresetRead.model_validate(item).model_dump()}}


@router.patch("/{workspace_id}/search-presets/{preset_id}")
def update_search_preset(
    workspace_id: str,
    preset_id: str,
    payload: SearchPresetUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    item = db.get(SearchPreset, preset_id)
    if not item or item.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Search preset not found")

    if payload.name is not None:
        name = payload.name.strip()
        if not name:
            raise HTTPException(status_code=400, detail="Preset name is required")
        item.name = name
    if payload.filters is not None:
        item.filters_json = normalize_filters(payload.filters)

    db.add(item)
    db.commit()
    db.refresh(item)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="search_preset.update",
        resource_type="search_preset",
        resource_id=item.id,
        message=f"Updated search preset {item.name}",
        metadata_json={"name": item.name},
    )
    return {"success": True, "data": {"preset": SearchPresetRead.model_validate(item).model_dump()}}


@router.delete("/{workspace_id}/search-presets/{preset_id}")
def delete_search_preset(
    workspace_id: str,
    preset_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    item = db.get(SearchPreset, preset_id)
    if not item or item.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Search preset not found")

    preset_name = item.name
    db.delete(item)
    db.commit()
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="search_preset.delete",
        resource_type="search_preset",
        resource_id=preset_id,
        message=f"Deleted search preset {preset_name}",
        metadata_json={"name": preset_name},
    )
    return {"success": True, "data": {"deleted": True}}
