from __future__ import annotations

from fastapi import HTTPException

from app.api.routes import provider_config_route_helpers
from app.api.routes.provider_config_route_helpers import upsert_provider_config_or_400


def test_upsert_provider_config_or_400_returns_service_result(monkeypatch) -> None:
    captured_call: dict[str, object] = {}
    expected_result = {
        "workspace_id": "workspace-1",
        "feature_code": "chat",
        "provider_code": "openai",
    }

    def fake_upsert_provider_config(
        db,
        workspace_id,
        feature_code,
        *,
        provider_code,
        model_name,
        is_enabled,
        api_base_url,
        api_key_env_name,
        options_json,
    ):
        captured_call.update(
            {
                "db": db,
                "workspace_id": workspace_id,
                "feature_code": feature_code,
                "provider_code": provider_code,
                "model_name": model_name,
                "is_enabled": is_enabled,
                "api_base_url": api_base_url,
                "api_key_env_name": api_key_env_name,
                "options_json": options_json,
            }
        )
        return expected_result

    monkeypatch.setattr(provider_config_route_helpers, "upsert_provider_config", fake_upsert_provider_config)

    db = object()
    result = upsert_provider_config_or_400(
        db,
        workspace_id="workspace-1",
        feature_code="chat",
        provider_code="openai",
        model_name="gpt-test",
        is_enabled=True,
        api_base_url="https://api.example.com",
        api_key_env_name="CHAT_API_KEY",
        options_json={"temperature": 0.2},
    )

    assert result == expected_result
    assert captured_call == {
        "db": db,
        "workspace_id": "workspace-1",
        "feature_code": "chat",
        "provider_code": "openai",
        "model_name": "gpt-test",
        "is_enabled": True,
        "api_base_url": "https://api.example.com",
        "api_key_env_name": "CHAT_API_KEY",
        "options_json": {"temperature": 0.2},
    }


def test_upsert_provider_config_or_400_maps_value_error_to_http_400(monkeypatch) -> None:
    def fake_upsert_provider_config(*args, **kwargs):
        raise ValueError("Unsupported provider option")

    monkeypatch.setattr(provider_config_route_helpers, "upsert_provider_config", fake_upsert_provider_config)

    try:
        upsert_provider_config_or_400(
            object(),
            workspace_id="workspace-1",
            feature_code="chat",
            provider_code="openai",
            model_name=None,
            is_enabled=False,
            api_base_url=None,
            api_key_env_name=None,
            options_json={},
        )
    except HTTPException as exc:
        assert exc.status_code == 400
        assert exc.detail == "Unsupported provider option"
    else:
        raise AssertionError("Expected provider config helper to map ValueError to HTTP 400")
