from __future__ import annotations

from collections.abc import Callable
from pathlib import Path

from app.models.media import MediaAsset
from app.services.media_provider_types import DeferredMediaProcessingError, MediaProviderExtractionResult
from app.services.provider_configs import ProviderFeatureConfig


def resolve_media_feature_code(media: MediaAsset) -> str | None:
    if media.media_type == "image":
        return "image_ocr"
    if media.media_type == "audio":
        return "audio_asr"
    if media.media_type == "video":
        return "video_transcription"
    return None


def dispatch_media_provider_extraction(
    config: ProviderFeatureConfig,
    file_path: Path,
    *,
    feature_code: str,
    transport_mode: str,
    image_prompt: str,
    audio_prompt: str,
    video_prompt: str,
    call_openai_compatible_image_ocr_fn: Callable[..., MediaProviderExtractionResult],
    call_openai_compatible_audio_transcription_fn: Callable[..., MediaProviderExtractionResult],
    call_custom_webhook_fn: Callable[..., MediaProviderExtractionResult],
    transcribe_openai_compatible_video_fn: Callable[..., MediaProviderExtractionResult],
) -> MediaProviderExtractionResult:
    if feature_code == "image_ocr":
        if transport_mode == "openai_compatible":
            return call_openai_compatible_image_ocr_fn(config, file_path, prompt=image_prompt)
        return call_custom_webhook_fn(config, file_path, feature_code=feature_code, prompt=image_prompt)

    if feature_code == "audio_asr":
        if transport_mode == "openai_compatible":
            return call_openai_compatible_audio_transcription_fn(
                config,
                file_path,
                feature_code=feature_code,
                prompt=audio_prompt,
            )
        return call_custom_webhook_fn(config, file_path, feature_code=feature_code, prompt=audio_prompt)

    if feature_code == "video_transcription":
        if transport_mode == "openai_compatible":
            return transcribe_openai_compatible_video_fn(
                config,
                file_path,
                feature_code=feature_code,
                prompt=video_prompt,
                call_openai_compatible_audio_transcription_fn=call_openai_compatible_audio_transcription_fn,
            )
        return call_custom_webhook_fn(config, file_path, feature_code=feature_code, prompt=video_prompt)

    raise DeferredMediaProcessingError("Unsupported media provider pipeline")
