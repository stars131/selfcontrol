from __future__ import annotations

import shutil
import subprocess
import tempfile
from collections.abc import Callable
from pathlib import Path

from app.core.config import settings
from app.services.media_provider_types import DeferredMediaProcessingError, MediaProviderExtractionResult
from app.services.provider_configs import ProviderFeatureConfig


def extract_audio_from_video(video_path: Path) -> Path:
    ffmpeg_path = shutil.which("ffmpeg")
    if not ffmpeg_path:
        raise DeferredMediaProcessingError("Video transcription requires ffmpeg to be installed on the server")

    tmp_dir = Path(settings.processing_tmp_dir)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=tmp_dir, suffix=".mp3", delete=False) as temp_file:
        temp_path = Path(temp_file.name)

    process = subprocess.run(
        [
            ffmpeg_path,
            "-y",
            "-i",
            str(video_path),
            "-vn",
            "-acodec",
            "mp3",
            str(temp_path),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if process.returncode != 0:
        try:
            temp_path.unlink(missing_ok=True)
        except OSError:
            pass
        stderr = process.stderr.strip() or "ffmpeg failed"
        raise ValueError(stderr)
    return temp_path


def transcribe_openai_compatible_video(
    config: ProviderFeatureConfig,
    file_path: Path,
    *,
    feature_code: str,
    prompt: str,
    call_openai_compatible_audio_transcription_fn: Callable[..., MediaProviderExtractionResult],
) -> MediaProviderExtractionResult:
    audio_path = extract_audio_from_video(file_path)
    try:
        result = call_openai_compatible_audio_transcription_fn(
            config,
            audio_path,
            feature_code=feature_code,
            prompt=prompt,
        )
        result.metadata_json["video_audio_extract_path"] = audio_path.name
        return result
    finally:
        try:
            audio_path.unlink(missing_ok=True)
        except OSError:
            pass
