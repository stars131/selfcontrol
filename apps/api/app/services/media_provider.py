from __future__ import annotations

import base64
import json
import mimetypes
import os
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path

import httpx
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.provider_configs import ProviderFeatureConfig, get_effective_provider_config


IMAGE_PROMPT = (
    "Extract all visible text from this image. Return plain text only. "
    "If there is no clear text, provide a concise searchable description."
)
AUDIO_PROMPT = "Transcribe the spoken content into clean plain text."
VIDEO_PROMPT = "Transcribe the video's spoken content into clean plain text."
DEFAULT_OPENAI_VISION_MODEL = "gpt-4o-mini"
DEFAULT_OPENAI_AUDIO_MODEL = "gpt-4o-mini-transcribe"


class DeferredMediaProcessingError(Exception):
    pass


@dataclass
class MediaProviderExtractionResult:
    text: str
    extraction_mode: str
    provider_code: str
    feature_code: str
    model_name: str | None
    metadata_json: dict


def resolve_media_feature_code(media: MediaAsset) -> str | None:
    if media.media_type == "image":
        return "image_ocr"
    if media.media_type == "audio":
        return "audio_asr"
    if media.media_type == "video":
        return "video_transcription"
    return None


def get_effective_api_base_url(config: ProviderFeatureConfig) -> str:
    if config.api_base_url:
        return config.api_base_url.rstrip("/")
    if config.provider_code == "openai":
        return "https://api.openai.com/v1"
    if config.provider_code == "openrouter":
        return "https://openrouter.ai/api/v1"
    raise DeferredMediaProcessingError("API base URL is required for this provider")


def get_secret_for_provider(config: ProviderFeatureConfig) -> str | None:
    env_name = (config.api_key_env_name or "").strip()
    if not env_name:
        if config.provider_code == "openai":
            env_name = "OPENAI_API_KEY"
        elif config.provider_code == "openrouter":
            env_name = "OPENROUTER_API_KEY"

    if not env_name:
        return None

    secret = os.getenv(env_name, "").strip()
    if not secret:
        raise DeferredMediaProcessingError(f"Required secret environment variable is missing: {env_name}")
    return secret


def infer_transport_mode(config: ProviderFeatureConfig) -> str:
    explicit = str(config.options_json.get("transport_mode", "")).strip().lower()
    if explicit in {"openai_compatible", "webhook_json"}:
        return explicit

    if config.provider_code in {"openai", "openrouter"}:
        return "openai_compatible"

    if config.provider_code == "custom":
        base_url = (config.api_base_url or "").lower()
        if base_url.endswith("/v1") or "/v1/" in base_url:
            return "openai_compatible"
        return "webhook_json"

    return "unsupported"


def serialize_chat_content(value) -> str:
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, list):
        parts: list[str] = []
        for item in value:
            if isinstance(item, dict):
                text = item.get("text")
                if isinstance(text, str) and text.strip():
                    parts.append(text.strip())
        return "\n".join(parts).strip()
    return str(value).strip()


def call_openai_compatible_image_ocr(
    config: ProviderFeatureConfig,
    file_path: Path,
) -> MediaProviderExtractionResult:
    secret = get_secret_for_provider(config)
    base_url = get_effective_api_base_url(config)
    mime_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
    data_url = f"data:{mime_type};base64,{base64.b64encode(file_path.read_bytes()).decode('ascii')}"
    payload = {
        "model": config.model_name or DEFAULT_OPENAI_VISION_MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": IMAGE_PROMPT},
                    {"type": "image_url", "image_url": {"url": data_url}},
                ],
            }
        ],
        "temperature": 0,
    }
    headers = {"Authorization": f"Bearer {secret}"} if secret else {}
    response = httpx.post(
        f"{base_url}/chat/completions",
        headers=headers,
        json=payload,
        timeout=settings.provider_request_timeout_seconds,
    )
    response.raise_for_status()
    body = response.json()
    text = serialize_chat_content(((body.get("choices") or [{}])[0].get("message") or {}).get("content"))
    if not text:
        raise ValueError("Provider returned empty OCR text")
    return MediaProviderExtractionResult(
        text=text,
        extraction_mode="provider_openai_compatible_image",
        provider_code=config.provider_code,
        feature_code="image_ocr",
        model_name=config.model_name or DEFAULT_OPENAI_VISION_MODEL,
        metadata_json={"transport_mode": "openai_compatible"},
    )


def call_openai_compatible_audio_transcription(
    config: ProviderFeatureConfig,
    file_path: Path,
    feature_code: str,
    prompt: str,
) -> MediaProviderExtractionResult:
    secret = get_secret_for_provider(config)
    base_url = get_effective_api_base_url(config)
    model_name = config.model_name or DEFAULT_OPENAI_AUDIO_MODEL
    headers = {"Authorization": f"Bearer {secret}"} if secret else {}
    with file_path.open("rb") as handle:
        response = httpx.post(
            f"{base_url}/audio/transcriptions",
            headers=headers,
            data={"model": model_name, "prompt": prompt, "response_format": "json"},
            files={"file": (file_path.name, handle, mimetypes.guess_type(file_path.name)[0] or "application/octet-stream")},
            timeout=settings.provider_request_timeout_seconds,
        )
    response.raise_for_status()
    if response.headers.get("content-type", "").lower().startswith("application/json"):
        body = response.json()
        text = str(body.get("text") or "").strip()
    else:
        text = response.text.strip()
    if not text:
        raise ValueError("Provider returned empty transcription text")
    return MediaProviderExtractionResult(
        text=text,
        extraction_mode="provider_openai_compatible_audio",
        provider_code=config.provider_code,
        feature_code=feature_code,
        model_name=model_name,
        metadata_json={"transport_mode": "openai_compatible"},
    )


def call_custom_webhook(
    config: ProviderFeatureConfig,
    file_path: Path,
    *,
    feature_code: str,
    prompt: str,
) -> MediaProviderExtractionResult:
    if not config.api_base_url:
        raise DeferredMediaProcessingError("Custom provider requires api_base_url")

    secret = get_secret_for_provider(config)
    headers = {"Authorization": f"Bearer {secret}"} if secret else {}
    with file_path.open("rb") as handle:
        response = httpx.post(
            config.api_base_url,
            headers=headers,
            data={
                "feature_code": feature_code,
                "provider_code": config.provider_code,
                "model_name": config.model_name or "",
                "prompt": prompt,
                "options_json": json.dumps(config.options_json or {}),
            },
            files={"file": (file_path.name, handle, mimetypes.guess_type(file_path.name)[0] or "application/octet-stream")},
            timeout=settings.provider_request_timeout_seconds,
        )
    response.raise_for_status()
    content_type = response.headers.get("content-type", "").lower()
    if content_type.startswith("application/json"):
        body = response.json()
        text = str(body.get("text") or "").strip()
        metadata_json = body.get("metadata") or {}
    else:
        text = response.text.strip()
        metadata_json = {}
    if not text:
        raise ValueError("Custom provider returned empty extraction text")
    return MediaProviderExtractionResult(
        text=text,
        extraction_mode="provider_custom_webhook",
        provider_code=config.provider_code,
        feature_code=feature_code,
        model_name=config.model_name,
        metadata_json={"transport_mode": "webhook_json", **metadata_json},
    )


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
            audio_path = extract_audio_from_video(file_path)
            try:
                result = call_openai_compatible_audio_transcription(config, audio_path, feature_code, VIDEO_PROMPT)
                result.metadata_json["video_audio_extract_path"] = audio_path.name
                return result
            finally:
                try:
                    audio_path.unlink(missing_ok=True)
                except OSError:
                    pass
        return call_custom_webhook(config, file_path, feature_code=feature_code, prompt=VIDEO_PROMPT)

    raise DeferredMediaProcessingError("Unsupported media provider pipeline")
