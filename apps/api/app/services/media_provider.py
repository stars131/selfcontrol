from __future__ import annotations

from pathlib import Path

from sqlalchemy.orm import Session

from app.models.media import MediaAsset
from app.services.media_provider_http import (
    call_custom_webhook,
    call_openai_compatible_audio_transcription,
    call_openai_compatible_image_ocr,
    get_effective_api_base_url,
    get_secret_for_provider,
    serialize_chat_content,
)
from app.services.media_provider_types import DeferredMediaProcessingError, MediaProviderExtractionResult
from app.services.media_provider_video import extract_audio_from_video, transcribe_openai_compatible_video
from app.services.provider_transport import (
    infer_provider_transport_mode,
)
from app.services.provider_configs import (
    ProviderFeatureConfig,
    get_effective_provider_config,
)


IMAGE_PROMPT = (
    "Extract all visible text from this image. Return plain text only. "
    "If there is no clear text, provide a concise searchable description."
)
AUDIO_PROMPT = "Transcribe the spoken content into clean plain text."
VIDEO_PROMPT = "Transcribe the video's spoken content into clean plain text."


def resolve_media_feature_code(media: MediaAsset) -> str | None:
    if media.media_type == "image":
        return "image_ocr"
    if media.media_type == "audio":
        return "audio_asr"
    if media.media_type == "video":
        return "video_transcription"
    return None


def infer_transport_mode(config: ProviderFeatureConfig) -> str:
    return infer_provider_transport_mode(config)


def extract_text_via_provider(db: Session, media: MediaAsset, file_path: Path) -> MediaProviderExtractionResult:
    feature_code = resolve_media_feature_code(media)
    if not feature_code:
        raise DeferredMediaProcessingError("No provider extraction pipeline for this media type")

    config = get_effective_provider_config(db, media.workspace_id, feature_code)
    if not config.is_enabled or config.provider_code == "none":
        raise DeferredMediaProcessingError(f"{feature_code} provider is not enabled")

    transport_mode = infer_transport_mode(config)
    if transport_mode == "unsupported":
        raise DeferredMediaProcessingError(f"Provider {config.provider_code} is not supported for {feature_code} yet")

    if feature_code == "image_ocr":
        if transport_mode == "openai_compatible":
            return call_openai_compatible_image_ocr(config, file_path)
        return call_custom_webhook(config, file_path, feature_code=feature_code, prompt=IMAGE_PROMPT)

    if feature_code == "audio_asr":
        if transport_mode == "openai_compatible":
            return call_openai_compatible_audio_transcription(config, file_path, feature_code, AUDIO_PROMPT)
        return call_custom_webhook(config, file_path, feature_code=feature_code, prompt=AUDIO_PROMPT)

    if feature_code == "video_transcription":
        if transport_mode == "openai_compatible":
            return transcribe_openai_compatible_video(
                config,
                file_path,
                feature_code=feature_code,
                prompt=VIDEO_PROMPT,
                call_openai_compatible_audio_transcription_fn=call_openai_compatible_audio_transcription,
            )
        return call_custom_webhook(config, file_path, feature_code=feature_code, prompt=VIDEO_PROMPT)

    raise DeferredMediaProcessingError("Unsupported media provider pipeline")
