from __future__ import annotations

from types import SimpleNamespace

from app.services.media_provider_http import (
    call_custom_webhook,
    call_openai_compatible_audio_transcription,
    call_openai_compatible_image_ocr,
    serialize_chat_content,
)


def build_config(**overrides):
    payload = {
        "provider_code": "custom",
        "model_name": None,
        "api_base_url": "https://provider.example.test/v1",
        "options_json": {},
        "api_key_env_name": "PROVIDER_SECRET",
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


class FakeResponse:
    def __init__(self, *, json_body=None, text="", content_type="application/json"):
        self._json_body = json_body or {}
        self.text = text
        self.headers = {"content-type": content_type}

    def raise_for_status(self) -> None:
        return None

    def json(self):
        return self._json_body


def test_serialize_chat_content_supports_strings_lists_and_other_values() -> None:
    assert serialize_chat_content(" hello ") == "hello"
    assert serialize_chat_content([{"text": "one "}, {"text": " two"}]) == "one\ntwo"
    assert serialize_chat_content(123) == "123"


def test_call_openai_compatible_image_ocr_parses_chat_response(tmp_path, monkeypatch) -> None:
    file_path = tmp_path / "photo.png"
    file_path.write_bytes(b"png-bytes")
    monkeypatch.setattr("app.services.media_provider_http.get_secret_for_provider", lambda config: "secret")
    monkeypatch.setattr("app.services.media_provider_http.get_effective_api_base_url", lambda config: "https://api.example.test/v1")
    monkeypatch.setattr(
        "app.services.media_provider_http.httpx.post",
        lambda *args, **kwargs: FakeResponse(
            json_body={"choices": [{"message": {"content": [{"text": "menu text"}]}}]},
        ),
    )

    result = call_openai_compatible_image_ocr(build_config(provider_code="openai"), file_path, prompt="read text")

    assert result.text == "menu text"
    assert result.feature_code == "image_ocr"
    assert result.metadata_json["transport_mode"] == "openai_compatible"


def test_call_openai_compatible_audio_transcription_parses_json_response(tmp_path, monkeypatch) -> None:
    file_path = tmp_path / "voice.mp3"
    file_path.write_bytes(b"audio-bytes")
    monkeypatch.setattr("app.services.media_provider_http.get_secret_for_provider", lambda config: "secret")
    monkeypatch.setattr("app.services.media_provider_http.get_effective_api_base_url", lambda config: "https://api.example.test/v1")
    monkeypatch.setattr(
        "app.services.media_provider_http.httpx.post",
        lambda *args, **kwargs: FakeResponse(json_body={"text": "speech text"}),
    )

    result = call_openai_compatible_audio_transcription(
        build_config(provider_code="openai"),
        file_path,
        feature_code="audio_asr",
        prompt="transcribe",
    )

    assert result.text == "speech text"
    assert result.feature_code == "audio_asr"


def test_call_custom_webhook_merges_provider_metadata(tmp_path, monkeypatch) -> None:
    file_path = tmp_path / "voice.mp3"
    file_path.write_bytes(b"audio-bytes")
    monkeypatch.setattr("app.services.media_provider_http.get_secret_for_provider", lambda config: "secret")
    monkeypatch.setattr(
        "app.services.media_provider_http.httpx.post",
        lambda *args, **kwargs: FakeResponse(
            json_body={"text": "custom text", "metadata": {"language": "zh"}},
        ),
    )

    result = call_custom_webhook(
        build_config(provider_code="custom", api_base_url="https://provider.example.test/webhook"),
        file_path,
        feature_code="audio_asr",
        prompt="transcribe",
    )

    assert result.text == "custom text"
    assert result.metadata_json["transport_mode"] == "webhook_json"
    assert result.metadata_json["language"] == "zh"
