from __future__ import annotations

from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

from app.services.media_retention_actions import (
    MediaRetentionActionSelection,
    build_media_retention_action_result,
    select_archive_media_candidates,
    select_cleanup_media_candidates,
)


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


def test_select_cleanup_media_candidates_returns_candidates_and_skip_reasons(
    monkeypatch,
) -> None:
    old_local = build_media()
    recent_local = build_media(
        id="media-2",
        storage_key="uploads/workspace-1/b.txt",
        created_at=datetime.now(timezone.utc) - timedelta(days=2),
    )
    archived_local = build_media(id="media-3", storage_key="uploads/workspace-1/c.txt")
    remote_media = build_media(
        id="media-4",
        storage_provider="custom",
        storage_key="remote/workspace-1/d.txt",
    )
    missing_recent_local = build_media(
        id="media-5",
        storage_key="uploads/workspace-1/e.txt",
        created_at=datetime.now(timezone.utc),
    )

    monkeypatch.setattr(
        "app.services.media_retention_actions.media_uses_local_storage",
        lambda item: item.storage_provider == "local",
    )
    monkeypatch.setattr(
        "app.services.media_retention_actions.get_media_storage_tier",
        lambda item: "archive" if item.id == "media-3" else "primary",
    )
    monkeypatch.setattr(
        "app.services.media_retention_actions.resolve_storage_path",
        lambda item: SimpleNamespace(exists=lambda: item.id != "media-5"),
    )

    selection = select_cleanup_media_candidates(
        [old_local, recent_local, archived_local, remote_media, missing_recent_local],
        ["media-1", "media-2", "media-3", "media-4", "media-5", "missing"],
        older_than_days=90,
    )

    assert [item.id for item in selection.candidate_items] == ["media-1", "media-5"]
    assert selection.affected_record_ids == {"record-1"}
    assert selection.tracked_storage_keys == {
        "uploads/workspace-1/a.txt",
        "uploads/workspace-1/b.txt",
        "uploads/workspace-1/c.txt",
        "remote/workspace-1/d.txt",
        "uploads/workspace-1/e.txt",
    }
    assert selection.skipped_reason_by_media_id == {
        "media-2": "not_old_enough",
        "media-3": "already_archived",
        "media-4": "storage_provider_cleanup_not_supported",
        "missing": "not_found",
    }


def test_select_archive_media_candidates_requires_old_existing_local_files(
    monkeypatch,
) -> None:
    old_local = build_media()
    recent_local = build_media(
        id="media-2",
        storage_key="uploads/workspace-1/b.txt",
        created_at=datetime.now(timezone.utc) - timedelta(days=2),
    )
    archived_local = build_media(id="media-3", storage_key="uploads/workspace-1/c.txt")
    remote_media = build_media(
        id="media-4",
        storage_provider="custom",
        storage_key="remote/workspace-1/d.txt",
    )
    missing_old_local = build_media(id="media-5", storage_key="uploads/workspace-1/e.txt")

    monkeypatch.setattr(
        "app.services.media_retention_actions.media_uses_local_storage",
        lambda item: item.storage_provider == "local",
    )
    monkeypatch.setattr(
        "app.services.media_retention_actions.get_media_storage_tier",
        lambda item: "archive" if item.id == "media-3" else "primary",
    )
    monkeypatch.setattr(
        "app.services.media_retention_actions.resolve_storage_path",
        lambda item: SimpleNamespace(exists=lambda: item.id != "media-5"),
    )

    selection = select_archive_media_candidates(
        [old_local, recent_local, archived_local, remote_media, missing_old_local],
        ["media-1", "media-2", "media-3", "media-4", "media-5", "missing"],
        older_than_days=90,
    )

    assert [item.id for item in selection.candidate_items] == ["media-1"]
    assert selection.affected_record_ids == {"record-1"}
    assert selection.skipped_reason_by_media_id == {
        "media-2": "not_old_enough",
        "media-3": "already_archived",
        "media-4": "storage_provider_archive_not_supported",
        "media-5": "missing_storage_file",
        "missing": "not_found",
    }


def test_select_cleanup_media_candidates_clamps_future_created_at_to_zero_age(
    monkeypatch,
) -> None:
    future_local = build_media(
        id="media-future",
        storage_key="uploads/workspace-1/future.txt",
        created_at=datetime.now(timezone.utc) + timedelta(days=10),
    )

    monkeypatch.setattr(
        "app.services.media_retention_actions.media_uses_local_storage",
        lambda item: True,
    )
    monkeypatch.setattr(
        "app.services.media_retention_actions.get_media_storage_tier",
        lambda item: "primary",
    )
    monkeypatch.setattr(
        "app.services.media_retention_actions.resolve_storage_path",
        lambda item: SimpleNamespace(exists=lambda: True),
    )

    selection = select_cleanup_media_candidates(
        [future_local],
        ["media-future"],
        older_than_days=90,
    )

    assert selection.candidate_items == []
    assert selection.skipped_reason_by_media_id == {"media-future": "not_old_enough"}


def test_build_media_retention_action_result_adds_orphan_stats_when_requested(
    tmp_path,
) -> None:
    orphan_a = tmp_path / "orphan-a.bin"
    orphan_a.write_bytes(b"1234")
    orphan_b = tmp_path / "orphan-b.bin"
    orphan_b.write_bytes(b"123456")
    selection = MediaRetentionActionSelection(
        candidate_items=[
            build_media(size_bytes=4),
            build_media(id="media-2", record_id="record-2", size_bytes=6),
        ],
        affected_record_ids={"record-2", "record-1"},
        skipped_reason_by_media_id={"missing": "not_found"},
    )

    result = build_media_retention_action_result(
        workspace_id="workspace-1",
        older_than_days=90,
        dry_run=True,
        selection=selection,
        orphan_files=[orphan_a, orphan_b],
    )

    assert result["candidate_media_count"] == 2
    assert result["candidate_media_size_bytes"] == 10
    assert result["affected_record_ids"] == ["record-1", "record-2"]
    assert result["orphan_file_count"] == 2
    assert result["orphan_file_size_bytes"] == 10
    assert result["skipped_reason_by_media_id"] == {"missing": "not_found"}


def test_build_media_retention_action_result_without_orphans_keeps_base_fields() -> None:
    selection = MediaRetentionActionSelection(
        candidate_items=[build_media(size_bytes=5)],
        affected_record_ids={"record-1"},
        skipped_reason_by_media_id={"missing": "not_found"},
    )

    result = build_media_retention_action_result(
        workspace_id="workspace-1",
        older_than_days=30,
        dry_run=False,
        selection=selection,
    )

    assert result == {
        "workspace_id": "workspace-1",
        "older_than_days": 30,
        "dry_run": False,
        "candidate_media_count": 1,
        "candidate_media_size_bytes": 5,
        "candidate_media_size_label": "5 B",
        "affected_record_ids": ["record-1"],
        "skipped_media_ids": ["missing"],
        "skipped_reason_by_media_id": {"missing": "not_found"},
    }
