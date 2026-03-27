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
