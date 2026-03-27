from __future__ import annotations

from hashlib import sha256
from types import SimpleNamespace

from app.services.media_file_analysis import (
    collect_media_metadata,
    decode_best_effort,
    format_size_label,
    is_text_like_media,
    normalize_extracted_text,
)


def build_media_stub(**overrides):
    payload = {
        "original_filename": "note.txt",
        "mime_type": "text/plain",
        "media_type": "text",
        "size_bytes": 12,
        "metadata_json": {},
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_is_text_like_media_and_decode_best_effort_support_common_text_inputs() -> None:
    text_media = build_media_stub(original_filename="memo.yaml", mime_type="application/x-yaml")
    binary_media = build_media_stub(original_filename="clip.mp4", mime_type="video/mp4", media_type="video")

    assert is_text_like_media(text_media) is True
    assert is_text_like_media(binary_media) is False
    assert decode_best_effort("中文内容".encode("gb18030")) == "中文内容"


def test_normalize_extracted_text_pretty_prints_json_and_trims_whitespace() -> None:
    media = build_media_stub(original_filename="payload.json", mime_type="application/json")

    normalized = normalize_extracted_text(media, '  {"name":"noodle","score":5}  ')

    assert normalized == '{\n  "name": "noodle",\n  "score": 5\n}'


def test_collect_media_metadata_records_size_hash_and_image_dimensions(tmp_path) -> None:
    png_bytes = (
        b"\x89PNG\r\n\x1a\n"
        b"\x00\x00\x00\rIHDR"
        b"\x00\x00\x00\x10"
        b"\x00\x00\x00\x08"
        b"\x08\x02\x00\x00\x00"
        b"\x00\x00\x00\x00"
    )
    image_path = tmp_path / "sample.png"
    image_path.write_bytes(png_bytes)
    media = build_media_stub(
        original_filename="sample.png",
        mime_type="image/png",
        media_type="image",
        size_bytes=len(png_bytes),
        metadata_json={"source": "camera"},
    )

    metadata = collect_media_metadata(media, image_path, extracted_text="hello\nworld")

    assert metadata["source"] == "camera"
    assert metadata["file_extension"] == ".png"
    assert metadata["preview_kind"] == "image"
    assert metadata["size_label"] == format_size_label(len(png_bytes))
    assert metadata["sha256"] == sha256(png_bytes).hexdigest()
    assert metadata["width"] == 16
    assert metadata["height"] == 8
    assert metadata["text_char_count"] == 11
    assert metadata["text_line_count"] == 2
