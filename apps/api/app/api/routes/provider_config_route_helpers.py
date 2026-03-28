from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.services.provider_configs import upsert_provider_config


def upsert_provider_config_or_400(
    db: Session,
    *,
    workspace_id: str,
    feature_code: str,
    provider_code: str,
    model_name: str | None,
    is_enabled: bool,
    api_base_url: str | None,
    api_key_env_name: str | None,
    options_json: dict,
):
    try:
        return upsert_provider_config(
            db,
            workspace_id,
            feature_code,
            provider_code=provider_code,
            model_name=model_name,
            is_enabled=is_enabled,
            api_base_url=api_base_url,
            api_key_env_name=api_key_env_name,
            options_json=options_json,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
