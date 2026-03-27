from __future__ import annotations

from types import SimpleNamespace

from app.services.media_remote_storage_contract import WEBHOOK_CONTRACT_VERSION
from app.services.media_remote_storage_payloads import (
    build_remote_upload_metadata,
    coerce_remote_size_bytes,
    coerce_remote_storage_key,
    fallback_to_local_on_upload_failure_enabled,
    sanitize_remote_metadata_value,
)


def build_config(**overrides):
    payload = {"options_json": {}}
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_fallback_to_local_on_upload_failure_enabled_supports_booleanish_values() -> None:
    assert (
        fallback_to_local_on_upload_failure_enabled(
            build_config(options_json={"fallback_to_local_on_upload_failure": "enabled"})
        )
        is True
    )
    assert (
        fallback_to_local_on_upload_failure_enabled(
            build_config(options_json={"fallback_to_local_on_upload_failure": 0})
        )
        is False
    )


def test_coerce_remote_storage_key_and_size_bytes_validate_payload() -> None:
    assert coerce_remote_storage_key(" remote/workspace/file.bin ") == "remote/workspace/file.bin"
    assert coerce_remote_size_bytes("12", fallback=5) == 12
    assert coerce_remote_size_bytes("", fallback=5) == 5


def test_sanitize_remote_metadata_value_trims_invalid_entries_and_depth() -> None:
    value = {
        "bucket": "primary",
        "": "skip",
        "bad\nkey": "skip",
        "flags": ["warm", {"tier": {"deep": {"nested": {"too_deep": 1}}}}],
    }

    sanitized = sanitize_remote_metadata_value(value)

    assert sanitized["bucket"] == "primary"
    assert "bad\nkey" not in sanitized
    assert sanitized["flags"][1]["tier"]["deep"] == "{'nested': {'too_deep': 1}}"


def test_build_remote_upload_metadata_adds_contract_and_request_fields() -> None:
    response = SimpleNamespace(headers={"x-request-id": "req-123"})
    payload = {
        "provider_asset_id": "asset-123",
        "metadata_json": {"bucket": "primary", "flags": ["warm"]},
    }

    metadata = build_remote_upload_metadata(payload, response)

    assert metadata["bucket"] == "primary"
    assert metadata["provider_asset_id"] == "asset-123"
    assert metadata["webhook_request_id"] == "req-123"
    assert metadata["remote_storage_mode"] == "custom_webhook"
    assert metadata["remote_contract_version"] == WEBHOOK_CONTRACT_VERSION
