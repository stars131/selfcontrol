from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from app.services.media_retention_common import (
    coerce_retention_datetime,
    list_workspace_orphan_files,
    scan_workspace_orphan_files,
)


def test_coerce_retention_datetime_normalizes_naive_and_aware_values() -> None:
    naive = datetime(2026, 3, 27, 10, 0, 0)
    aware = datetime(2026, 3, 27, 10, 0, 0, tzinfo=timezone.utc)

    assert coerce_retention_datetime(naive).tzinfo == timezone.utc
    assert coerce_retention_datetime(aware) == aware


def test_list_and_scan_workspace_orphan_files_detect_untracked_files(tmp_path, monkeypatch) -> None:
    storage_dir = tmp_path / "uploads"
    workspace_dir = storage_dir / "workspace-1"
    workspace_dir.mkdir(parents=True, exist_ok=True)
    tracked_file = workspace_dir / "tracked.txt"
    orphan_file = workspace_dir / "orphan.txt"
    tracked_file.write_text("tracked", encoding="utf-8")
    orphan_file.write_text("orphan", encoding="utf-8")

    monkeypatch.setattr("app.services.media_retention_common.settings.storage_dir", str(storage_dir))
    tracked_key = str(Path("uploads") / "workspace-1" / "tracked.txt")

    orphan_files = list_workspace_orphan_files("workspace-1", {tracked_key})

    assert orphan_files == [orphan_file]
    assert scan_workspace_orphan_files("workspace-1", {tracked_key}) == (
        1,
        orphan_file.stat().st_size,
    )
