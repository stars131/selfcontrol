from __future__ import annotations

import json
from hashlib import sha256
from pathlib import Path

from app.models.media import MediaAsset


TEXT_MIME_PREFIXES = ("text/",)
TEXT_MIME_TYPES = {
    "application/json",
    "application/ld+json",
    "application/xml",
    "application/javascript",
    "application/x-javascript",
    "application/csv",
    "application/x-yaml",
}
TEXT_FILE_EXTENSIONS = {
    ".txt",
    ".md",
    ".markdown",
    ".csv",
    ".json",
    ".jsonl",
    ".yaml",
    ".yml",
    ".xml",
    ".log",
    ".rtf",
}
MAX_EXTRACTED_TEXT_LENGTH = 12_000


def is_text_like_media(media: MediaAsset) -> bool:
    suffix = Path(media.original_filename or "").suffix.lower()
    if media.mime_type.startswith(TEXT_MIME_PREFIXES):
        return True
    if media.mime_type in TEXT_MIME_TYPES:
        return True
    return suffix in TEXT_FILE_EXTENSIONS


def decode_best_effort(content: bytes) -> str:
    for encoding in ("utf-8", "utf-8-sig", "gb18030", "gbk", "big5", "latin-1"):
        try:
            return content.decode(encoding)
        except UnicodeDecodeError:
            continue
    return content.decode("utf-8", errors="replace")


def format_size_label(size_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB", "TB"]
    value = float(size_bytes)
    for unit in units:
        if value < 1024 or unit == units[-1]:
            if unit == "B":
                return f"{int(value)} {unit}"
            return f"{value:.1f} {unit}"
        value /= 1024
    return f"{size_bytes} B"


def read_png_dimensions(content: bytes) -> tuple[int, int] | None:
    if len(content) < 24 or content[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    width = int.from_bytes(content[16:20], "big")
    height = int.from_bytes(content[20:24], "big")
    return width, height


def read_gif_dimensions(content: bytes) -> tuple[int, int] | None:
    if len(content) < 10 or content[:6] not in {b"GIF87a", b"GIF89a"}:
        return None
    width = int.from_bytes(content[6:8], "little")
    height = int.from_bytes(content[8:10], "little")
    return width, height


def read_jpeg_dimensions(content: bytes) -> tuple[int, int] | None:
    if len(content) < 4 or content[:2] != b"\xff\xd8":
        return None

    offset = 2
    while offset + 9 < len(content):
        if content[offset] != 0xFF:
            offset += 1
            continue

        marker = content[offset + 1]
        offset += 2
        if marker in {0xD8, 0xD9}:
            continue

        if offset + 2 > len(content):
            return None
        segment_length = int.from_bytes(content[offset : offset + 2], "big")
        if segment_length < 2 or offset + segment_length > len(content):
            return None

        if marker in {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}:
            if offset + 7 > len(content):
                return None
            height = int.from_bytes(content[offset + 3 : offset + 5], "big")
            width = int.from_bytes(content[offset + 5 : offset + 7], "big")
            return width, height

        offset += segment_length
    return None


def read_image_dimensions(media: MediaAsset, file_path: Path) -> tuple[int, int] | None:
    if media.media_type != "image":
        return None
    content = file_path.read_bytes()
    for reader in (read_png_dimensions, read_gif_dimensions, read_jpeg_dimensions):
        dimensions = reader(content)
        if dimensions:
            return dimensions
    return None


def collect_media_metadata(media: MediaAsset, file_path: Path, extracted_text: str | None = None) -> dict:
    metadata = dict(media.metadata_json or {})
    file_suffix = file_path.suffix.lower()
    metadata["file_extension"] = file_suffix
    metadata["preview_kind"] = media.media_type if media.media_type in {"image", "audio", "video"} else "none"
    metadata["size_label"] = format_size_label(media.size_bytes)
    metadata["sha256"] = sha256(file_path.read_bytes()).hexdigest()

    dimensions = read_image_dimensions(media, file_path)
    if dimensions:
        width, height = dimensions
        metadata["width"] = width
        metadata["height"] = height

    if extracted_text:
        metadata["text_char_count"] = len(extracted_text)
        metadata["text_line_count"] = extracted_text.count("\n") + 1

    return metadata


def normalize_extracted_text(media: MediaAsset, raw_text: str) -> str:
    suffix = Path(media.original_filename or "").suffix.lower()
    text = raw_text.strip()
    if suffix in {".json", ".jsonl"} or media.mime_type in {"application/json", "application/ld+json"}:
        try:
            parsed = json.loads(text)
            text = json.dumps(parsed, ensure_ascii=False, indent=2)
        except json.JSONDecodeError:
            pass
    return text[:MAX_EXTRACTED_TEXT_LENGTH]
