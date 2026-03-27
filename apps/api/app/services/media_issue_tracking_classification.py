from __future__ import annotations

from app.models.media import MediaAsset
from app.services.media_issue_tracking_metadata import (
    LOCAL_STORAGE_PROVIDER,
    read_media_issue_metadata,
    read_processing_retry_state,
)


def resolve_media_feature_code_for_issue(item: MediaAsset) -> str | None:
    if item.media_type == "image":
        return "image_ocr"
    if item.media_type == "audio":
        return "audio_asr"
    if item.media_type == "video":
        return "video_transcription"
    return None


def resolve_settings_feature_code(
    item: MediaAsset, *, remote_fetch_failed: bool
) -> str | None:
    if remote_fetch_failed or item.storage_provider != LOCAL_STORAGE_PROVIDER:
        return "media_storage"
    return resolve_media_feature_code_for_issue(item)


def classify_media_issue(item: MediaAsset) -> dict[str, object]:
    metadata = read_media_issue_metadata(item)
    retry_state = read_processing_retry_state(item)
    error_text = str(item.processing_error or "").strip()
    normalized_error = error_text.lower()
    remote_fetch_status = (
        metadata.get("remote_fetch_status")
        if isinstance(metadata.get("remote_fetch_status"), str)
        else None
    )
    remote_fetch_failed = remote_fetch_status == "failed"

    if (
        item.storage_provider == LOCAL_STORAGE_PROVIDER
        and "stored file not found" in normalized_error
    ):
        return {
            "issue_category": "local_file_missing",
            "issue_label": "Local file missing",
            "recommended_action_code": "restore_or_delete_local_file",
            "recommended_action_label": "Restore file or delete record media",
            "recommended_action_detail": "The metadata still exists, but the local file is missing from disk.",
            "recommended_settings_feature_code": None,
            "can_bulk_retry": False,
        }
    if "provider is not enabled" in normalized_error:
        return {
            "issue_category": "provider_disabled",
            "issue_label": "Provider disabled",
            "recommended_action_code": "enable_provider",
            "recommended_action_label": "Enable the extraction provider",
            "recommended_action_detail": "Turn on the workspace OCR, ASR, or video transcription provider before retrying.",
            "recommended_settings_feature_code": resolve_media_feature_code_for_issue(item),
            "can_bulk_retry": False,
        }
    if (
        "secret environment variable is missing" in normalized_error
        or "server-side secret is not configured" in normalized_error
    ):
        return {
            "issue_category": "missing_secret",
            "issue_label": "Missing provider secret",
            "recommended_action_code": "configure_secret",
            "recommended_action_label": "Configure the provider secret",
            "recommended_action_detail": "Set the required server-side API key environment variable, then retry processing.",
            "recommended_settings_feature_code": resolve_settings_feature_code(
                item, remote_fetch_failed=remote_fetch_failed
            ),
            "can_bulk_retry": False,
        }
    if "api base url" in normalized_error or "service root" in normalized_error:
        return {
            "issue_category": "provider_config_error",
            "issue_label": "Provider config error",
            "recommended_action_code": "fix_provider_config",
            "recommended_action_label": "Fix media storage provider settings",
            "recommended_action_detail": "Review the workspace media storage endpoint and provider configuration before retrying.",
            "recommended_settings_feature_code": resolve_settings_feature_code(
                item, remote_fetch_failed=remote_fetch_failed
            ),
            "can_bulk_retry": False,
        }
    if "not supported" in normalized_error:
        return {
            "issue_category": "provider_unsupported",
            "issue_label": "Unsupported provider path",
            "recommended_action_code": "switch_provider",
            "recommended_action_label": "Choose a supported provider",
            "recommended_action_detail": "The selected provider flow is not supported for this media type or transport mode yet.",
            "recommended_settings_feature_code": resolve_settings_feature_code(
                item, remote_fetch_failed=remote_fetch_failed
            ),
            "can_bulk_retry": False,
        }
    if "not found" in normalized_error and item.storage_provider != LOCAL_STORAGE_PROVIDER:
        return {
            "issue_category": "remote_asset_missing",
            "issue_label": "Remote asset missing",
            "recommended_action_code": "review_remote_asset",
            "recommended_action_label": "Verify remote asset or remove stale reference",
            "recommended_action_detail": "The stored remote object could not be fetched and may have been deleted outside SelfControl.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": False,
        }
    if any(
        marker in normalized_error
        for marker in (
            "rate limit",
            "429",
            "502",
            "503",
            "504",
            "timed out",
            "timeout",
            "request failed",
            "temporarily",
            "temporary",
        )
    ):
        return {
            "issue_category": "transient_remote_failure",
            "issue_label": "Transient remote failure",
            "recommended_action_code": "retry_after_remote_check",
            "recommended_action_label": "Retry after checking remote service health",
            "recommended_action_detail": "The remote provider looks temporarily unavailable or rate-limited.",
            "recommended_settings_feature_code": resolve_settings_feature_code(
                item, remote_fetch_failed=remote_fetch_failed
            ),
            "can_bulk_retry": True,
        }
    if "not ready" in normalized_error:
        return {
            "issue_category": "provider_not_ready",
            "issue_label": "Provider not ready",
            "recommended_action_code": "retry_when_ready",
            "recommended_action_label": "Retry when provider processing is ready",
            "recommended_action_detail": "The upstream provider accepted the media but has not finished processing it yet.",
            "recommended_settings_feature_code": resolve_media_feature_code_for_issue(item),
            "can_bulk_retry": True,
        }
    if retry_state == "exhausted":
        return {
            "issue_category": "retry_budget_exhausted",
            "issue_label": "Retry budget exhausted",
            "recommended_action_code": "increase_retry_budget_or_retry_now",
            "recommended_action_label": "Tune retry policy or retry manually",
            "recommended_action_detail": "Automatic retries stopped after reaching the workspace retry limit.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    if retry_state == "disabled":
        return {
            "issue_category": "auto_retry_disabled",
            "issue_label": "Auto retry disabled",
            "recommended_action_code": "enable_auto_retry_or_retry_now",
            "recommended_action_label": "Enable auto retry or retry manually",
            "recommended_action_detail": "This workspace currently disables automatic remote media retries.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    if retry_state == "manual_only":
        return {
            "issue_category": "manual_recovery_required",
            "issue_label": "Manual recovery required",
            "recommended_action_code": "manual_retry",
            "recommended_action_label": "Retry manually after review",
            "recommended_action_detail": "This issue was marked as unsuitable for automatic retry and needs operator review.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    if remote_fetch_status == "failed":
        return {
            "issue_category": "remote_fetch_failed",
            "issue_label": "Remote fetch failed",
            "recommended_action_code": "check_remote_storage_health",
            "recommended_action_label": "Check remote storage health",
            "recommended_action_detail": "The server failed while fetching the remote media content for processing.",
            "recommended_settings_feature_code": "media_storage",
            "can_bulk_retry": True,
        }
    return {
        "issue_category": "unknown_processing_issue",
        "issue_label": "Unknown processing issue",
        "recommended_action_code": "review_and_retry",
        "recommended_action_label": "Review error details and retry",
        "recommended_action_detail": "Inspect provider settings and the stored error details before retrying.",
        "recommended_settings_feature_code": resolve_settings_feature_code(
            item, remote_fetch_failed=remote_fetch_failed
        ),
        "can_bulk_retry": item.storage_provider != LOCAL_STORAGE_PROVIDER,
    }
