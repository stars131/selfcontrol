from __future__ import annotations

from types import SimpleNamespace

from app.services.media_processing_execution import (
    apply_media_processing_failure,
    execute_media_processing_for_file,
)
from app.services.media_provider import DeferredMediaProcessingError, MediaProviderExtractionResult
from app.services.media_retry_policy import RemoteMediaRetryPolicy


def build_media_stub(**overrides):
    payload = {
        "media_type": "text",
        "original_filename": "note.txt",
        "mime_type": "text/plain",
        "size_bytes": 12,
        "metadata_json": {},
        "storage_provider": "custom",
        "extracted_text": None,
        "processing_status": "pending",
        "processing_error": None,
        "processed_at": None,
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_execute_media_processing_for_file_handles_text_branch(tmp_path) -> None:
    media = build_media_stub()
    file_path = tmp_path / "note.txt"
    file_path.write_text("hello memo", encoding="utf-8")

    execute_media_processing_for_file(
        object(),
        media,
        file_path,
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=2,
            backoff_seconds=[30],
        ),
        extract_text_via_provider_fn=lambda db, item, path: (_ for _ in ()).throw(RuntimeError("should not call provider")),
    )

    assert media.processing_status == "completed"
    assert media.extracted_text == "hello memo"
    assert media.metadata_json["extraction_mode"] == "text_direct"


def test_execute_media_processing_for_file_handles_provider_deferred_branch(tmp_path) -> None:
    media = build_media_stub(
        media_type="audio",
        original_filename="voice.m4a",
        mime_type="audio/mp4",
    )
    file_path = tmp_path / "voice.m4a"
    file_path.write_bytes(b"audio-bytes")

    execute_media_processing_for_file(
        object(),
        media,
        file_path,
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=2,
            backoff_seconds=[30],
        ),
        extract_text_via_provider_fn=lambda db, item, path: (_ for _ in ()).throw(
            DeferredMediaProcessingError("provider processing is not ready")
        ),
    )

    assert media.processing_status == "deferred"
    assert media.metadata_json["extraction_mode"] == "provider_deferred"
    assert media.metadata_json["processing_retry_state"] == "scheduled"


def test_execute_media_processing_for_file_handles_provider_success_branch(tmp_path) -> None:
    media = build_media_stub(
        media_type="audio",
        original_filename="voice.m4a",
        mime_type="audio/mp4",
    )
    file_path = tmp_path / "voice.m4a"
    file_path.write_bytes(b"audio-bytes")

    execute_media_processing_for_file(
        object(),
        media,
        file_path,
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=2,
            backoff_seconds=[30],
        ),
        extract_text_via_provider_fn=lambda db, item, path: MediaProviderExtractionResult(
            text="  noodle shop  ",
            extraction_mode="provider_remote",
            provider_code="custom",
            feature_code="audio_asr",
            model_name="whisper-x",
            metadata_json={"language": "zh"},
        ),
    )

    assert media.processing_status == "completed"
    assert media.extracted_text == "noodle shop"
    assert media.metadata_json["provider_code"] == "custom"
    assert media.metadata_json["feature_code"] == "audio_asr"


def test_apply_media_processing_failure_collects_metadata_when_file_exists(tmp_path) -> None:
    media = build_media_stub(
        media_type="image",
        original_filename="photo.png",
        mime_type="image/png",
        size_bytes=33,
    )
    file_path = tmp_path / "photo.png"
    file_path.write_bytes(
        b"\x89PNG\r\n\x1a\n"
        b"\x00\x00\x00\rIHDR"
        b"\x00\x00\x00\x01"
        b"\x00\x00\x00\x01"
        b"\x08\x02\x00\x00\x00"
        b"\x00\x00\x00\x00"
    )

    apply_media_processing_failure(
        media,
        RuntimeError("Remote media download timed out"),
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=2,
            backoff_seconds=[45],
        ),
        file_path=file_path,
    )

    assert media.processing_status == "failed"
    assert media.metadata_json["file_extension"] == ".png"
    assert media.metadata_json["remote_fetch_status"] == "failed"
