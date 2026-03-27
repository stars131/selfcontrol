from __future__ import annotations

from types import SimpleNamespace

from app.services.media_processing_outcomes import (
    build_provider_completed_processing_payload,
    build_provider_deferred_processing_payload,
    build_text_direct_processing_payload,
    finalize_media_processing,
)
from app.services.media_provider import MediaProviderExtractionResult


def build_media_stub(**overrides):
    payload = {
        "record_id": "record-1",
        "media_type": "audio",
        "original_filename": "voice.m4a",
        "mime_type": "audio/mp4",
        "size_bytes": 12,
        "metadata_json": {},
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_build_text_direct_processing_payload_reads_and_labels_text(tmp_path) -> None:
    media = build_media_stub(
        media_type="text",
        original_filename="note.json",
        mime_type="application/json",
    )
    file_path = tmp_path / "note.json"
    file_path.write_text('{"dish":"noodle"}', encoding="utf-8")

    extracted_text, metadata = build_text_direct_processing_payload(media, file_path)

    assert '"dish": "noodle"' in extracted_text
    assert metadata["extraction_mode"] == "text_direct"
    assert metadata["file_extension"] == ".json"


def test_build_provider_deferred_processing_payload_preserves_searchable_placeholder(tmp_path) -> None:
    media = build_media_stub(media_type="video", original_filename="clip.mp4", mime_type="video/mp4")
    file_path = tmp_path / "clip.mp4"
    file_path.write_bytes(b"video-bytes")

    extracted_text, metadata = build_provider_deferred_processing_payload(
        media,
        file_path,
        "provider processing is not ready",
    )

    assert "Provider processing is not ready" in extracted_text
    assert metadata["extraction_mode"] == "provider_deferred"
    assert metadata["file_extension"] == ".mp4"


def test_build_provider_completed_processing_payload_merges_provider_metadata(tmp_path) -> None:
    media = build_media_stub(media_type="audio", original_filename="voice.m4a", mime_type="audio/mp4")
    file_path = tmp_path / "voice.m4a"
    file_path.write_bytes(b"audio-bytes")

    extracted_text, metadata = build_provider_completed_processing_payload(
        media,
        file_path,
        MediaProviderExtractionResult(
            text="  best fried rice  ",
            extraction_mode="provider_remote",
            provider_code="custom",
            feature_code="audio_asr",
            model_name="whisper-x",
            metadata_json={"language": "zh"},
        ),
    )

    assert extracted_text == "best fried rice"
    assert metadata["extraction_mode"] == "provider_remote"
    assert metadata["provider_code"] == "custom"
    assert metadata["feature_code"] == "audio_asr"
    assert metadata["model_name"] == "whisper-x"
    assert metadata["language"] == "zh"


def test_finalize_media_processing_commits_refreshes_and_rebuilds() -> None:
    calls: list[tuple[str, object]] = []

    class FakeSession:
        def add(self, media):
            calls.append(("add", media))

        def commit(self):
            calls.append(("commit", None))

        def refresh(self, media):
            calls.append(("refresh", media))

    media = build_media_stub()

    def fake_rebuild(db, record_id: str) -> None:
        calls.append(("rebuild", record_id))

    result = finalize_media_processing(
        FakeSession(),
        media,
        rebuild_record_knowledge_fn=fake_rebuild,
    )

    assert result is media
    assert calls == [
        ("add", media),
        ("commit", None),
        ("refresh", media),
        ("rebuild", "record-1"),
        ("refresh", media),
    ]
