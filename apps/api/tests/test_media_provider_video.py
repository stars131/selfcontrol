from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

from app.services.media_provider_types import DeferredMediaProcessingError, MediaProviderExtractionResult
from app.services.media_provider_video import extract_audio_from_video, transcribe_openai_compatible_video


def test_extract_audio_from_video_requires_ffmpeg(tmp_path, monkeypatch) -> None:
    video_path = tmp_path / "clip.mp4"
    video_path.write_bytes(b"video-bytes")
    monkeypatch.setattr("app.services.media_provider_video.shutil.which", lambda name: None)

    try:
        extract_audio_from_video(video_path)
    except DeferredMediaProcessingError as exc:
        assert "ffmpeg" in str(exc)
    else:
        raise AssertionError("Expected DeferredMediaProcessingError")


def test_extract_audio_from_video_returns_temp_audio_file(tmp_path, monkeypatch) -> None:
    video_path = tmp_path / "clip.mp4"
    video_path.write_bytes(b"video-bytes")
    monkeypatch.setattr("app.services.media_provider_video.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    monkeypatch.setattr("app.services.media_provider_video.shutil.which", lambda name: "ffmpeg")

    def fake_run(*args, **kwargs):
        output_path = Path(args[0][-1])
        output_path.write_bytes(b"audio-bytes")
        return SimpleNamespace(returncode=0, stderr="")

    monkeypatch.setattr("app.services.media_provider_video.subprocess.run", fake_run)

    audio_path = extract_audio_from_video(video_path)

    assert audio_path.exists()
    assert audio_path.suffix == ".mp3"


def test_transcribe_openai_compatible_video_cleans_up_temp_audio(tmp_path, monkeypatch) -> None:
    video_path = tmp_path / "clip.mp4"
    video_path.write_bytes(b"video-bytes")
    audio_path = tmp_path / "tmp" / "clip-audio.mp3"
    audio_path.parent.mkdir(parents=True, exist_ok=True)
    audio_path.write_bytes(b"audio-bytes")

    monkeypatch.setattr("app.services.media_provider_video.extract_audio_from_video", lambda path: audio_path)

    result = transcribe_openai_compatible_video(
        SimpleNamespace(provider_code="openai", model_name="gpt-4o-mini-transcribe"),
        video_path,
        feature_code="video_transcription",
        prompt="transcribe video",
        call_openai_compatible_audio_transcription_fn=lambda config, path, **kwargs: MediaProviderExtractionResult(
            text="video text",
            extraction_mode="provider_openai_compatible_audio",
            provider_code="openai",
            feature_code="video_transcription",
            model_name="gpt-4o-mini-transcribe",
            metadata_json={},
        ),
    )

    assert result.text == "video text"
    assert result.metadata_json["video_audio_extract_path"] == "clip-audio.mp3"
    assert audio_path.exists() is False
