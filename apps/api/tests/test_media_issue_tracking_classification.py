from __future__ import annotations

from types import SimpleNamespace

from app.services.media_issue_tracking_classification import (
    classify_media_issue,
    resolve_media_feature_code_for_issue,
    resolve_settings_feature_code,
)


def build_media(**overrides):
    payload = {
        "media_type": "audio",
        "storage_provider": "custom",
        "processing_error": "",
        "metadata_json": {},
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_resolve_media_feature_code_for_issue_maps_supported_types() -> None:
    assert resolve_media_feature_code_for_issue(build_media(media_type="image")) == "image_ocr"
    assert resolve_media_feature_code_for_issue(build_media(media_type="audio")) == "audio_asr"
    assert resolve_media_feature_code_for_issue(build_media(media_type="video")) == "video_transcription"
    assert resolve_media_feature_code_for_issue(build_media(media_type="text")) is None


def test_resolve_settings_feature_code_prefers_media_storage_for_remote_or_fetch_failures() -> None:
    assert (
        resolve_settings_feature_code(
            build_media(storage_provider="custom"), remote_fetch_failed=False
        )
        == "media_storage"
    )
    assert (
        resolve_settings_feature_code(
            build_media(storage_provider="local", media_type="image"),
            remote_fetch_failed=True,
        )
        == "media_storage"
    )
    assert (
        resolve_settings_feature_code(
            build_media(storage_provider="local", media_type="image"),
            remote_fetch_failed=False,
        )
        == "image_ocr"
    )


def test_classify_media_issue_covers_provider_disabled_transient_and_manual_paths() -> None:
    disabled = classify_media_issue(
        build_media(processing_error="audio_asr provider is not enabled")
    )
    transient = classify_media_issue(
        build_media(processing_error="Remote media upload request failed with status 503")
    )
    manual = classify_media_issue(
        build_media(
            processing_error="needs review",
            metadata_json={"processing_retry_state": "manual_only"},
        )
    )

    assert disabled["issue_category"] == "provider_disabled"
    assert disabled["recommended_settings_feature_code"] == "audio_asr"
    assert transient["issue_category"] == "transient_remote_failure"
    assert transient["can_bulk_retry"] is True
    assert manual["issue_category"] == "manual_recovery_required"
    assert manual["recommended_settings_feature_code"] == "media_storage"


def test_classify_media_issue_covers_missing_local_and_remote_assets() -> None:
    local_missing = classify_media_issue(
        build_media(
            storage_provider="local",
            processing_error="Stored file not found on disk",
        )
    )
    remote_missing = classify_media_issue(
        build_media(
            storage_provider="custom",
            processing_error="Remote object not found during fetch",
        )
    )

    assert local_missing["issue_category"] == "local_file_missing"
    assert local_missing["can_bulk_retry"] is False
    assert remote_missing["issue_category"] == "remote_asset_missing"
    assert remote_missing["recommended_settings_feature_code"] == "media_storage"


def test_classify_media_issue_covers_secret_config_and_unsupported_provider_paths() -> None:
    missing_secret = classify_media_issue(
        build_media(
            storage_provider="local",
            media_type="video",
            processing_error="Server-side secret is not configured",
        )
    )
    config_error = classify_media_issue(
        build_media(
            processing_error="Media storage service root is invalid",
            metadata_json={"remote_fetch_status": "failed"},
        )
    )
    unsupported = classify_media_issue(
        build_media(
            processing_error="Selected transport is not supported",
            metadata_json={"remote_fetch_status": "failed"},
        )
    )

    assert missing_secret["issue_category"] == "missing_secret"
    assert missing_secret["recommended_settings_feature_code"] == "video_transcription"
    assert config_error["issue_category"] == "provider_config_error"
    assert config_error["recommended_settings_feature_code"] == "media_storage"
    assert unsupported["issue_category"] == "provider_unsupported"
    assert unsupported["recommended_settings_feature_code"] == "media_storage"


def test_classify_media_issue_covers_retry_budget_ready_and_fetch_failure_states() -> None:
    not_ready = classify_media_issue(
        build_media(
            storage_provider="local",
            media_type="image",
            processing_error="provider result is not ready yet",
        )
    )
    exhausted = classify_media_issue(
        build_media(
            processing_error="retry later",
            metadata_json={"processing_retry_state": "exhausted"},
        )
    )
    disabled = classify_media_issue(
        build_media(
            processing_error="retry later",
            metadata_json={"processing_retry_state": "disabled"},
        )
    )
    fetch_failed = classify_media_issue(
        build_media(
            processing_error="retry later",
            metadata_json={"remote_fetch_status": "failed"},
        )
    )

    assert not_ready["issue_category"] == "provider_not_ready"
    assert not_ready["recommended_settings_feature_code"] == "image_ocr"
    assert exhausted["issue_category"] == "retry_budget_exhausted"
    assert exhausted["can_bulk_retry"] is True
    assert disabled["issue_category"] == "auto_retry_disabled"
    assert disabled["can_bulk_retry"] is True
    assert fetch_failed["issue_category"] == "remote_fetch_failed"
    assert fetch_failed["recommended_settings_feature_code"] == "media_storage"


def test_classify_media_issue_returns_unknown_processing_issue_defaults() -> None:
    unknown_remote = classify_media_issue(
        build_media(processing_error="unexpected parser drift")
    )
    unknown_local = classify_media_issue(
        build_media(
            storage_provider="local",
            media_type="text",
            processing_error="unexpected parser drift",
        )
    )

    assert unknown_remote["issue_category"] == "unknown_processing_issue"
    assert unknown_remote["can_bulk_retry"] is True
    assert unknown_remote["recommended_settings_feature_code"] == "media_storage"
    assert unknown_local["issue_category"] == "unknown_processing_issue"
    assert unknown_local["can_bulk_retry"] is False
    assert unknown_local["recommended_settings_feature_code"] is None
