from __future__ import annotations

from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

from app.services.media_retention_reporting import build_media_retention_report_from_items


def build_media(**overrides):
    now = datetime.now(timezone.utc)
    payload = {
        "id": "media-1",
        "record_id": "record-1",
        "workspace_id": "workspace-1",
        "original_filename": "a.txt",
        "media_type": "text",
        "storage_provider": "local",
        "storage_key": "uploads/workspace-1/a.txt",
        "processing_status": "completed",
        "size_bytes": 12,
        "created_at": now - timedelta(days=120),
        "metadata_json": {},
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_build_media_retention_report_from_items_aggregates_counts(monkeypatch) -> None:
    local_old = build_media()
    remote_old = build_media(
        id="media-2",
        original_filename="b.mp4",
        media_type="video",
        storage_provider="custom",
        storage_key="remote/workspace-1/b.mp4",
        size_bytes=30,
    )
    archived_old = build_media(
        id="media-3",
        original_filename="c.txt",
        storage_key="archive/workspace-1/c.txt",
        size_bytes=20,
    )

    monkeypatch.setattr(
        "app.services.media_retention_reporting.media_uses_local_storage",
        lambda item: item.storage_provider == "local",
    )
    monkeypatch.setattr(
        "app.services.media_retention_reporting.resolve_storage_path",
        lambda item: SimpleNamespace(exists=lambda: item.id != "media-1"),
    )
    monkeypatch.setattr(
        "app.services.media_retention_reporting.get_media_storage_tier",
        lambda item: "archive" if item.id == "media-3" else "primary",
    )
    monkeypatch.setattr(
        "app.services.media_retention_reporting.is_local_storage_provider",
        lambda provider_code: provider_code == "local",
    )
    monkeypatch.setattr(
        "app.services.media_retention_reporting.scan_workspace_orphan_files",
        lambda workspace_id, tracked_storage_keys: (2, 40),
    )

    report = build_media_retention_report_from_items(
        [local_old, remote_old, archived_old],
        workspace_id="workspace-1",
        older_than_days=90,
        limit=5,
    )

    assert report["total_count"] == 3
    assert report["missing_file_count"] == 1
    assert report["remote_item_count"] == 1
    assert report["remote_item_size_bytes"] == 30
    assert report["archived_item_count"] == 1
    assert report["archived_item_size_bytes"] == 20
    assert report["orphan_file_count"] == 2
    assert report["old_item_count"] == 3
    assert [item["media_id"] for item in report["largest_items"]] == ["media-2", "media-3", "media-1"]
    assert [item["media_id"] for item in report["retention_candidates"]] == ["media-1"]
