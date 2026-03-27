from __future__ import annotations

import base64
import json
import mimetypes
from pathlib import Path

import httpx

from app.core.config import settings
from app.services.media_provider_types import DeferredMediaProcessingError, MediaProviderExtractionResult
from app.services.provider_configs import ProviderFeatureConfig
from app.services.provider_transport import resolve_provider_api_base_url, resolve_provider_secret


DEFAULT_OPENAI_VISION_MODEL = "gpt-4o-mini"
DEFAULT_OPENAI_AUDIO_MODEL = "gpt-4o-mini-transcribe"


def get_effective_api_base_url(config: ProviderFeatureConfig) -> str:
    return resolve_provider_api_base_url(config, error_type=DeferredMediaProcessingError)


def get_secret_for_provider(config: ProviderFeatureConfig) -> str | None:
    return resolve_provider_secret(config, error_type=DeferredMediaProcessingError)


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
    *,
    prompt: str,
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
                    {"type": "text", "text": prompt},
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
    *,
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
