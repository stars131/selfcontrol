from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

from app.services.media_provider_dispatch import dispatch_media_provider_extraction, resolve_media_feature_code
from app.services.media_provider_types import DeferredMediaProcessingError, MediaProviderExtractionResult


def test_resolve_media_feature_code_maps_supported_types() -> None:
    assert resolve_media_feature_code(SimpleNamespace(media_type="image")) == "image_ocr"
    assert resolve_media_feature_code(SimpleNamespace(media_type="audio")) == "audio_asr"
    assert resolve_media_feature_code(SimpleNamespace(media_type="video")) == "video_transcription"
    assert resolve_media_feature_code(SimpleNamespace(media_type="text")) is None


def test_dispatch_media_provider_extraction_routes_image_audio_and_video_calls(tmp_path) -> None:
    config = SimpleNamespace(provider_code="openai")
    file_path = tmp_path / "sample.bin"
    file_path.write_bytes(b"sample")

    image_result = dispatch_media_provider_extraction(
        config,
        file_path,
        feature_code="image_ocr",
        transport_mode="openai_compatible",
        image_prompt="image",
        audio_prompt="audio",
        video_prompt="video",
        call_openai_compatible_image_ocr_fn=lambda *args, **kwargs: MediaProviderExtractionResult(
            text="image",
            extraction_mode="image",
            provider_code="openai",
            feature_code="image_ocr",
            model_name=None,
            metadata_json={},
        ),
        call_openai_compatible_audio_transcription_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
        call_custom_webhook_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
        transcribe_openai_compatible_video_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
    )
    assert image_result.feature_code == "image_ocr"

    audio_result = dispatch_media_provider_extraction(
        config,
        file_path,
        feature_code="audio_asr",
        transport_mode="openai_compatible",
        image_prompt="image",
        audio_prompt="audio",
        video_prompt="video",
        call_openai_compatible_image_ocr_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
        call_openai_compatible_audio_transcription_fn=lambda *args, **kwargs: MediaProviderExtractionResult(
            text="audio",
            extraction_mode="audio",
            provider_code="openai",
            feature_code="audio_asr",
            model_name=None,
            metadata_json={},
        ),
        call_custom_webhook_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
        transcribe_openai_compatible_video_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
    )
    assert audio_result.feature_code == "audio_asr"

    video_result = dispatch_media_provider_extraction(
        config,
        file_path,
        feature_code="video_transcription",
        transport_mode="openai_compatible",
        image_prompt="image",
        audio_prompt="audio",
        video_prompt="video",
        call_openai_compatible_image_ocr_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
        call_openai_compatible_audio_transcription_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
        call_custom_webhook_fn=lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("no")),
        transcribe_openai_compatible_video_fn=lambda *args, **kwargs: MediaProviderExtractionResult(
            text="video",
            extraction_mode="video",
            provider_code="openai",
            feature_code="video_transcription",
            model_name=None,
            metadata_json={},
        ),
    )
    assert video_result.feature_code == "video_transcription"


def test_dispatch_media_provider_extraction_rejects_unknown_feature(tmp_path) -> None:
    file_path = tmp_path / "sample.bin"
    file_path.write_bytes(b"sample")

    try:
        dispatch_media_provider_extraction(
            SimpleNamespace(provider_code="custom"),
            file_path,
            feature_code="unknown",
            transport_mode="webhook_json",
            image_prompt="image",
            audio_prompt="audio",
            video_prompt="video",
            call_openai_compatible_image_ocr_fn=lambda *args, **kwargs: None,
            call_openai_compatible_audio_transcription_fn=lambda *args, **kwargs: None,
            call_custom_webhook_fn=lambda *args, **kwargs: None,
            transcribe_openai_compatible_video_fn=lambda *args, **kwargs: None,
        )
    except DeferredMediaProcessingError as exc:
        assert "Unsupported" in str(exc)
    else:
        raise AssertionError("Expected DeferredMediaProcessingError")
