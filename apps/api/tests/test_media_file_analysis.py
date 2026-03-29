from __future__ import annotations

from hashlib import sha256
from types import SimpleNamespace

from app.services.media_file_analysis import (
    MAX_EXTRACTED_TEXT_LENGTH,
    collect_media_metadata,
    decode_best_effort,
    format_size_label,
    is_text_like_media,
    normalize_extracted_text,
    read_gif_dimensions,
    read_image_dimensions,
    read_jpeg_dimensions,
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


def test_normalize_extracted_text_keeps_invalid_json_and_applies_length_limit() -> None:
    media = build_media_stub(original_filename="payload.json", mime_type="application/json")
    raw_text = "  {" + ("x" * (MAX_EXTRACTED_TEXT_LENGTH + 10))

    normalized = normalize_extracted_text(media, raw_text)

    assert normalized == ("{" + ("x" * (MAX_EXTRACTED_TEXT_LENGTH - 1)))


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


def test_collect_media_metadata_handles_none_metadata_and_non_image_preview(tmp_path) -> None:
    media_path = tmp_path / "clip.bin"
    media_bytes = b"not-an-image"
    media_path.write_bytes(media_bytes)
    media = build_media_stub(
        original_filename="clip.bin",
        mime_type="application/octet-stream",
        media_type="document",
        size_bytes=len(media_bytes),
        metadata_json=None,
    )

    metadata = collect_media_metadata(media, media_path)

    assert metadata["file_extension"] == ".bin"
    assert metadata["preview_kind"] == "none"
    assert metadata["size_label"] == format_size_label(len(media_bytes))
    assert metadata["sha256"] == sha256(media_bytes).hexdigest()
    assert "width" not in metadata
    assert "text_char_count" not in metadata


def test_read_gif_dimensions_and_read_image_dimensions_support_gif_files(tmp_path) -> None:
    gif_bytes = b"GIF89a" + (16).to_bytes(2, "little") + (8).to_bytes(2, "little") + b"\x00"
    image_path = tmp_path / "sample.gif"
    image_path.write_bytes(gif_bytes)
    media = build_media_stub(
        original_filename="sample.gif",
        mime_type="image/gif",
        media_type="image",
        size_bytes=len(gif_bytes),
    )

    assert read_gif_dimensions(gif_bytes) == (16, 8)
    assert read_image_dimensions(media, image_path) == (16, 8)


def test_read_jpeg_dimensions_supports_baseline_sof_markers() -> None:
    jpeg_bytes = (
        b"\xff\xd8"
        b"\xff\xe0\x00\x04AA"
        b"\xff\xc0\x00\x11\x08\x00\x08\x00\x10\x03\x01\x11\x00\x02\x11\x01\x03\x11\x01"
        b"\xff\xd9"
    )

    assert read_jpeg_dimensions(jpeg_bytes) == (16, 8)
