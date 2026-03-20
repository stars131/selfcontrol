from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.user import User
from app.services.audit import log_audit_event
from app.services.provider_configs import list_provider_configs, upsert_provider_config


router = APIRouter()


class ProviderConfigUpdateRequest(BaseModel):
    provider_code: str
    model_name: str | None = None
    is_enabled: bool = False
    api_base_url: str | None = None
    api_key_env_name: str | None = None
    options_json: dict = Field(default_factory=dict)


@router.get("/{workspace_id}/provider-configs")
def get_provider_configs(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    items = list_provider_configs(db, workspace_id)
    return {"success": True, "data": {"items": [item.to_dict() for item in items]}}


@router.put("/{workspace_id}/provider-configs/{feature_code}")
def put_provider_config(
    workspace_id: str,
    feature_code: str,
    payload: ProviderConfigUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    try:
        item = upsert_provider_config(
            db,
            workspace_id,
            feature_code,
            provider_code=payload.provider_code,
            model_name=payload.model_name,
            is_enabled=payload.is_enabled,
            api_base_url=payload.api_base_url,
            api_key_env_name=payload.api_key_env_name,
            options_json=payload.options_json,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="provider_config.update",
        resource_type="provider_config",
        resource_id=feature_code,
        message=f"Updated provider config for {feature_code}",
        metadata_json={"provider_code": item.provider_code, "is_enabled": item.is_enabled},
    )
    return {"success": True, "data": {"config": item.to_dict()}}
