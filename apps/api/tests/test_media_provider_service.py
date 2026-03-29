from __future__ import annotations

from types import SimpleNamespace

from app.services.media_provider import (
    AUDIO_PROMPT,
    IMAGE_PROMPT,
    VIDEO_PROMPT,
    extract_text_via_provider,
)
from app.services.media_provider_types import DeferredMediaProcessingError, MediaProviderExtractionResult


def test_extract_text_via_provider_rejects_unsupported_media_types(tmp_path) -> None:
    file_path = tmp_path / "sample.txt"
    file_path.write_text("plain text", encoding="utf-8")
    media = SimpleNamespace(workspace_id="workspace-1", media_type="text")

    try:
        extract_text_via_provider(None, media, file_path)
    except DeferredMediaProcessingError as exc:
        assert "No provider extraction pipeline" in str(exc)
    else:
        raise AssertionError("Expected unsupported media type to be deferred")


def test_extract_text_via_provider_rejects_disabled_or_none_provider(tmp_path, monkeypatch) -> None:
    file_path = tmp_path / "image.png"
    file_path.write_bytes(b"image-bytes")
    media = SimpleNamespace(workspace_id="workspace-1", media_type="image")

    monkeypatch.setattr(
        "app.services.media_provider.get_effective_provider_config",
        lambda db, workspace_id, feature_code: SimpleNamespace(
            is_enabled=False,
            provider_code="none",
        ),
    )

    try:
        extract_text_via_provider(None, media, file_path)
    except DeferredMediaProcessingError as exc:
        assert "image_ocr provider is not enabled" in str(exc)
    else:
        raise AssertionError("Expected disabled provider to be deferred")


def test_extract_text_via_provider_rejects_unsupported_transport_mode(tmp_path, monkeypatch) -> None:
    file_path = tmp_path / "audio.m4a"
    file_path.write_bytes(b"audio-bytes")
    media = SimpleNamespace(workspace_id="workspace-1", media_type="audio")

    monkeypatch.setattr(
        "app.services.media_provider.get_effective_provider_config",
        lambda db, workspace_id, feature_code: SimpleNamespace(
            is_enabled=True,
            provider_code="custom",
            model_name="internal-asr",
        ),
    )
    monkeypatch.setattr("app.services.media_provider.infer_transport_mode", lambda config: "unsupported")

    try:
        extract_text_via_provider(None, media, file_path)
    except DeferredMediaProcessingError as exc:
        assert "Provider custom is not supported for audio_asr yet" in str(exc)
    else:
        raise AssertionError("Expected unsupported transport to be deferred")


def test_extract_text_via_provider_dispatches_with_feature_and_prompt_contracts(
    tmp_path,
    monkeypatch,
) -> None:
    file_path = tmp_path / "video.mp4"
    file_path.write_bytes(b"video-bytes")
    media = SimpleNamespace(workspace_id="workspace-1", media_type="video")
    captured: dict = {}
    config = SimpleNamespace(is_enabled=True, provider_code="openai", model_name="gpt-4o-mini-transcribe")

    monkeypatch.setattr(
        "app.services.media_provider.get_effective_provider_config",
        lambda db, workspace_id, feature_code: config,
    )
    monkeypatch.setattr("app.services.media_provider.infer_transport_mode", lambda provider_config: "openai_compatible")
    monkeypatch.setattr(
        "app.services.media_provider.dispatch_media_provider_extraction",
        lambda provider_config, resolved_file_path, **kwargs: captured.update(
            {
                "config": provider_config,
                "file_path": resolved_file_path,
                **kwargs,
            }
        )
        or MediaProviderExtractionResult(
            text="video transcript",
            extraction_mode="openai_compatible",
            provider_code="openai",
            feature_code="video_transcription",
            model_name="gpt-4o-mini-transcribe",
            metadata_json={"transport_mode": "openai_compatible"},
        ),
    )

    result = extract_text_via_provider(None, media, file_path)

    assert result == MediaProviderExtractionResult(
        text="video transcript",
        extraction_mode="openai_compatible",
        provider_code="openai",
        feature_code="video_transcription",
        model_name="gpt-4o-mini-transcribe",
        metadata_json={"transport_mode": "openai_compatible"},
    )
    assert captured["config"] is config
    assert captured["file_path"] == file_path
    assert captured["feature_code"] == "video_transcription"
    assert captured["transport_mode"] == "openai_compatible"
    assert captured["image_prompt"] == IMAGE_PROMPT
    assert captured["audio_prompt"] == AUDIO_PROMPT
    assert captured["video_prompt"] == VIDEO_PROMPT
