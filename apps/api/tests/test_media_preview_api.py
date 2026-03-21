from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import media as media_route
from app.api.routes import records as records_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, share_link  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


PNG_1X1 = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xcf\xc0\x00\x00\x03\x01"
    b"\x01\x00\xc9\xfe\x92\xef\x00\x00\x00\x00IEND\xaeB`\x82"
)


def build_media_client(tmp_path, monkeypatch) -> tuple[TestClient, str, str, sessionmaker]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        user = User(
            username="media-user",
            email="media@example.com",
            password_hash="test-hash",
            display_name="Media User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Media Workspace",
            slug="media-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.add(
            Record(
                workspace_id=workspace.id,
                creator_id=user.id,
                type_code="memo",
                title="Media record",
                content="Has file",
                source_type="manual",
                status="active",
                extra_data={},
            )
        )
        db.commit()

        user_id = user.id
        workspace_id = workspace.id
        record_id = db.query(Record).filter(Record.workspace_id == workspace.id).first().id

    monkeypatch.setattr(media_route.settings, "storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.media_processing.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.media_processing.rebuild_record_knowledge", lambda db, record_id: None)
    monkeypatch.setattr(media_route, "log_audit_event", lambda *args, **kwargs: None)
    monkeypatch.setattr(records_route, "log_audit_event", lambda *args, **kwargs: None)

    app = FastAPI()
    app.include_router(media_route.router, prefix="/api/v1/workspaces")
    app.include_router(records_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        db = session_local()
        try:
            return db.get(User, user_id)
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user
    return TestClient(app), workspace_id, record_id, session_local


def test_media_upload_returns_preview_metadata_and_content(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)

    response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )

    assert response.status_code == 200
    media_payload = response.json()["data"]["media"]
    assert media_payload["processing_status"] in {"completed", "deferred"}
    assert media_payload["metadata_json"]["preview_kind"] == "image"
    assert media_payload["metadata_json"]["width"] == 1
    assert media_payload["metadata_json"]["height"] == 1
    assert media_payload["metadata_json"]["file_extension"] == ".png"
    assert media_payload["metadata_json"]["size_label"].endswith("B")

    content_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/content")

    assert content_response.status_code == 200
    assert content_response.headers["content-type"] == "image/png"
    assert content_response.content == PNG_1X1


def test_media_delete_cleans_file_and_updates_storage_summary(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    stored_path = tmp_path / media_payload["storage_key"]
    assert stored_path.exists()

    summary_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/storage-summary")
    assert summary_response.status_code == 200
    summary = summary_response.json()["data"]["summary"]
    assert summary["total_count"] == 1
    assert summary["total_size_bytes"] == len(PNG_1X1)
    assert summary["by_media_type"]["image"] == 1

    delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}")
    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True
    assert not stored_path.exists()

    summary_after_delete = client.get(f"/api/v1/workspaces/{workspace_id}/media/storage-summary")
    assert summary_after_delete.status_code == 200
    assert summary_after_delete.json()["data"]["summary"]["total_count"] == 0


def test_record_delete_cleans_attached_media_files(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    stored_path = tmp_path / media_payload["storage_key"]
    assert stored_path.exists()

    record_delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/records/{record_id}")
    assert record_delete_response.status_code == 200
    assert record_delete_response.json()["data"]["deleted"] is True
    assert not stored_path.exists()

    list_media_response = client.get(f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media")
    assert list_media_response.status_code == 200
    assert list_media_response.json()["data"]["items"] == []


def test_media_upload_can_be_dispatched_async(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)
    queued_media_ids: list[str] = []

    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")

    class FakeTask:
        @staticmethod
        def delay(media_id: str) -> None:
            queued_media_ids.append(media_id)

    monkeypatch.setattr("app.worker.process_media_asset_task", FakeTask())

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )

    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    assert media_payload["processing_status"] == "pending"
    assert media_payload["processed_at"] is None
    assert queued_media_ids == [media_payload["id"]]

    retry_response = client.post(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/retry")
    assert retry_response.status_code == 200
    retry_payload = retry_response.json()["data"]["media"]
    assert retry_payload["processing_status"] == "pending"
    assert queued_media_ids == [media_payload["id"], media_payload["id"]]


def test_media_retention_report_counts_old_missing_and_orphan_files(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    old_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert old_upload_response.status_code == 200
    old_media_payload = old_upload_response.json()["data"]["media"]

    large_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("large-video.txt", b"v" * 4096, "text/plain")},
    )
    assert large_upload_response.status_code == 200
    large_media_payload = large_upload_response.json()["data"]["media"]

    with session_local() as db:
        old_media = db.get(MediaAsset, old_media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(old_media)
        db.commit()

    missing_file_path = tmp_path / large_media_payload["storage_key"]
    assert missing_file_path.exists()
    missing_file_path.unlink()

    orphan_file_path = tmp_path / "uploads" / workspace_id / "orphan.bin"
    orphan_file_path.parent.mkdir(parents=True, exist_ok=True)
    orphan_file_path.write_bytes(b"orphan-file")

    retention_response = client.get(
        f"/api/v1/workspaces/{workspace_id}/media/retention-report?older_than_days=90&limit=5"
    )

    assert retention_response.status_code == 200
    report = retention_response.json()["data"]["report"]
    assert report["workspace_id"] == workspace_id
    assert report["older_than_days"] == 90
    assert report["total_count"] == 2
    assert report["old_item_count"] == 1
    assert report["old_item_size_bytes"] == len(b"old snack note")
    assert report["missing_file_count"] == 1
    assert report["orphan_file_count"] == 1
    assert report["orphan_file_size_bytes"] == len(b"orphan-file")
    assert report["oldest_media_age_days"] >= 179

    assert [item["original_filename"] for item in report["largest_items"]] == [
        "large-video.txt",
        "old-note.txt",
    ]
    assert report["largest_items"][0]["file_missing"] is True

    assert [item["original_filename"] for item in report["retention_candidates"]] == ["old-note.txt"]
    assert report["retention_candidates"][0]["age_days"] >= 179


def test_media_retention_cleanup_supports_dry_run_and_execution(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    old_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert old_upload_response.status_code == 200
    old_media_payload = old_upload_response.json()["data"]["media"]

    recent_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("recent-note.txt", b"recent snack note", "text/plain")},
    )
    assert recent_upload_response.status_code == 200
    recent_media_payload = recent_upload_response.json()["data"]["media"]

    with session_local() as db:
        old_media = db.get(MediaAsset, old_media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(old_media)
        db.commit()

    old_file_path = tmp_path / old_media_payload["storage_key"]
    recent_file_path = tmp_path / recent_media_payload["storage_key"]
    assert old_file_path.exists()
    assert recent_file_path.exists()

    orphan_file_path = tmp_path / "uploads" / workspace_id / "orphan.bin"
    orphan_file_path.parent.mkdir(parents=True, exist_ok=True)
    orphan_file_path.write_bytes(b"orphan-file")

    dry_run_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-cleanup",
        json={
            "media_ids": [old_media_payload["id"], recent_media_payload["id"]],
            "older_than_days": 90,
            "purge_orphan_files": True,
            "dry_run": True,
        },
    )

    assert dry_run_response.status_code == 200
    dry_run_result = dry_run_response.json()["data"]["result"]
    assert dry_run_result["dry_run"] is True
    assert dry_run_result["candidate_media_count"] == 1
    assert dry_run_result["candidate_media_size_bytes"] == len(b"old snack note")
    assert dry_run_result["orphan_file_count"] == 1
    assert dry_run_result["skipped_reason_by_media_id"][recent_media_payload["id"]] == "not_old_enough"
    assert old_file_path.exists()
    assert recent_file_path.exists()
    assert orphan_file_path.exists()

    cleanup_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-cleanup",
        json={
            "media_ids": [old_media_payload["id"], recent_media_payload["id"]],
            "older_than_days": 90,
            "purge_orphan_files": True,
            "dry_run": False,
        },
    )

    assert cleanup_response.status_code == 200
    cleanup_result = cleanup_response.json()["data"]["result"]
    assert cleanup_result["dry_run"] is False
    assert cleanup_result["candidate_media_count"] == 1
    assert cleanup_result["orphan_file_count"] == 1
    assert cleanup_result["affected_record_ids"] == [record_id]

    assert not old_file_path.exists()
    assert recent_file_path.exists()
    assert not orphan_file_path.exists()

    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media")
    assert list_response.status_code == 200
    assert [item["original_filename"] for item in list_response.json()["data"]["items"]] == ["recent-note.txt"]


def test_media_retention_cleanup_is_owner_only(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]

    with session_local() as db:
        member = db.query(WorkspaceMember).filter(WorkspaceMember.workspace_id == workspace_id).first()
        assert member is not None
        member.role = "editor"
        old_media = db.get(MediaAsset, media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(member)
        db.add(old_media)
        db.commit()

    cleanup_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-cleanup",
        json={
            "media_ids": [media_payload["id"]],
            "older_than_days": 90,
            "purge_orphan_files": False,
            "dry_run": False,
        },
    )

    assert cleanup_response.status_code == 403


def test_media_retention_archive_moves_file_and_updates_report(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]

    with session_local() as db:
        old_media = db.get(MediaAsset, media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(old_media)
        db.commit()

    original_file_path = tmp_path / media_payload["storage_key"]
    assert original_file_path.exists()

    archive_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-archive",
        json={
            "media_ids": [media_payload["id"]],
            "older_than_days": 90,
            "dry_run": False,
        },
    )

    assert archive_response.status_code == 200
    archive_result = archive_response.json()["data"]["result"]
    assert archive_result["candidate_media_count"] == 1
    assert archive_result["affected_record_ids"] == [record_id]
    assert not original_file_path.exists()

    status_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/status")
    assert status_response.status_code == 200
    archived_media = status_response.json()["data"]["media"]
    assert archived_media["metadata_json"]["storage_tier"] == "archive"
    archived_file_path = tmp_path / archived_media["storage_key"]
    assert archived_file_path.exists()
    assert "\\archive\\" in str(archived_file_path) or "/archive/" in str(archived_file_path)

    content_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/content")
    assert content_response.status_code == 200
    assert content_response.content == b"old snack note"

    report_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/retention-report?older_than_days=90&limit=5")
    assert report_response.status_code == 200
    report = report_response.json()["data"]["report"]
    assert report["archived_item_count"] == 1
    assert report["archived_item_size_bytes"] == len(b"old snack note")
    assert report["retention_candidates"] == []
    assert report["largest_items"][0]["storage_tier"] == "archive"


def test_media_retention_archive_is_owner_only(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]

    with session_local() as db:
        member = db.query(WorkspaceMember).filter(WorkspaceMember.workspace_id == workspace_id).first()
        assert member is not None
        member.role = "editor"
        old_media = db.get(MediaAsset, media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(member)
        db.add(old_media)
        db.commit()

    archive_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-archive",
        json={
            "media_ids": [media_payload["id"]],
            "older_than_days": 90,
            "dry_run": False,
        },
    )

    assert archive_response.status_code == 403
