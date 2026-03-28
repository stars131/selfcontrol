from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member, require_workspace_write_access
from app.api.routes.search_preset_route_helpers import (
    get_workspace_search_preset_or_404,
    normalize_search_preset_filters,
    normalize_search_preset_name,
)
from app.db.session import get_db
from app.models.search_preset import SearchPreset
from app.models.user import User
from app.schemas.search_preset import SearchPresetCreate, SearchPresetRead, SearchPresetUpdate
from app.services.audit import log_audit_event


router = APIRouter()


@router.get("/{workspace_id}/search-presets")
def list_search_presets(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
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
    require_workspace_write_access(workspace_id, current_user, db)
    name = normalize_search_preset_name(payload.name)

    item = SearchPreset(
        workspace_id=workspace_id,
        created_by=current_user.id,
        name=name,
        filters_json=normalize_search_preset_filters(payload.filters),
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
    require_workspace_write_access(workspace_id, current_user, db)
    item = get_workspace_search_preset_or_404(db, workspace_id=workspace_id, preset_id=preset_id)

    if payload.name is not None:
        item.name = normalize_search_preset_name(payload.name)
    if payload.filters is not None:
        item.filters_json = normalize_search_preset_filters(payload.filters)

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
    item = get_workspace_search_preset_or_404(db, workspace_id=workspace_id, preset_id=preset_id)

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
