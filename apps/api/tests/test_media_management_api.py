from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import media as media_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_media_management_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        owner = User(
            username="media-management-owner",
            email="media-management-owner@example.com",
            password_hash="test-hash",
            display_name="Media Management Owner",
        )
        editor = User(
            username="media-management-editor",
            email="media-management-editor@example.com",
            password_hash="test-hash",
            display_name="Media Management Editor",
        )
        viewer = User(
            username="media-management-viewer",
            email="media-management-viewer@example.com",
            password_hash="test-hash",
            display_name="Media Management Viewer",
        )
        db.add_all([owner, editor, viewer])
        db.flush()

        workspace = Workspace(
            name="Media Management Workspace",
            slug="media-management-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=editor.id, role="editor"),
                WorkspaceMember(workspace_id=workspace.id, user_id=viewer.id, role="viewer"),
            ]
        )
        db.flush()

        primary_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Primary media record",
            content="Primary media content",
            source_type="manual",
            status="active",
            extra_data={},
        )
        secondary_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Secondary media record",
            content="Secondary media content",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([primary_record, secondary_record])
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
            "primary_record_id": primary_record.id,
            "secondary_record_id": secondary_record.id,
        }

    current_role = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(media_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, ids[current_role["value"]])
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, ids, current_role


def add_media_asset(
    session_local: sessionmaker,
    *,
    workspace_id: str,
    record_id: str,
    uploaded_by: str,
    original_filename: str,
    storage_key: str,
    created_at: datetime,
) -> str:
    with session_local() as db:
        item = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=uploaded_by,
            media_type="image",
            storage_provider="local",
            storage_key=storage_key,
            original_filename=original_filename,
            mime_type="image/png",
            size_bytes=128,
            metadata_json={"source": "api-test"},
            processing_status="completed",
            created_at=created_at,
            updated_at=created_at,
        )
        db.add(item)
        db.commit()
        return item.id


def build_processing_issue(*, media_id: str, updated_at: datetime) -> dict[str, object]:
    return {
        "media_id": media_id,
        "record_id": "record-1",
        "original_filename": f"{media_id}.png",
        "media_type": "image",
        "storage_provider": "custom",
        "processing_status": "failed",
        "processing_error": "remote fetch timed out",
        "extraction_mode": "provider_remote",
        "processing_source": "remote_fetch",
        "processing_last_attempt_at": "2026-03-30T12:00:00Z",
        "processing_last_failure_at": "2026-03-30T12:00:05Z",
        "remote_fetch_status": "failed",
        "processing_retry_state": "manual_only",
        "processing_retry_count": 1,
        "processing_retry_max_attempts": 3,
        "processing_retry_next_attempt_at": None,
        "issue_category": "transient_remote_failure",
        "issue_label": "Remote fetch failed",
        "recommended_action_code": "retry_after_remote_check",
        "recommended_action_label": "Retry later",
        "recommended_action_detail": "Retry after checking storage health",
        "recommended_settings_feature_code": "media_storage",
        "can_bulk_retry": True,
        "updated_at": updated_at,
    }


def test_media_management_api_lists_record_media_in_descending_created_order() -> None:
    client, session_local, ids, current_role = build_media_management_client()
    current_role["value"] = "viewer_id"
    now = datetime(2026, 3, 31, 9, 0, tzinfo=timezone.utc)

    newest_id = add_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["primary_record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="newest.png",
        storage_key="uploads/newest.png",
        created_at=now,
    )
    older_id = add_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["primary_record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="older.png",
        storage_key="uploads/older.png",
        created_at=now - timedelta(minutes=5),
    )
    _other_record_id = add_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["secondary_record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="other-record.png",
        storage_key="uploads/other-record.png",
        created_at=now + timedelta(minutes=5),
    )

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['primary_record_id']}/media")

    assert response.status_code == 200
    items = response.json()["data"]["items"]
    assert [item["id"] for item in items] == [newest_id, older_id]


def test_media_management_api_storage_summary_and_processing_overview_pass_through(monkeypatch) -> None:
    client, _session_local, ids, current_role = build_media_management_client()
    current_role["value"] = "viewer_id"
    captured_summary: dict[str, object] = {}
    captured_overview: dict[str, object] = {}
    updated_at = datetime(2026, 3, 31, 10, 0, tzinfo=timezone.utc)

    def fake_summarize_workspace_media_storage(db, workspace_id):
        captured_summary["workspace_id"] = workspace_id
        return {
            "workspace_id": workspace_id,
            "total_count": 3,
            "total_size_bytes": 512,
            "total_size_label": "512 B",
            "missing_file_count": 1,
            "by_media_type": {"image": 2, "video": 1},
            "by_processing_status": {"completed": 2, "failed": 1},
            "largest_item_name": "clip.mp4",
            "largest_item_size_bytes": 256,
            "largest_item_size_label": "256 B",
        }

    def fake_build_workspace_media_processing_overview(db, workspace_id, *, issue_limit):
        captured_overview.update({"workspace_id": workspace_id, "issue_limit": issue_limit})
        return {
            "workspace_id": workspace_id,
            "total_count": 3,
            "local_item_count": 1,
            "remote_item_count": 2,
            "completed_count": 1,
            "pending_count": 0,
            "processing_count": 0,
            "deferred_count": 1,
            "failed_count": 1,
            "by_processing_status": {"completed": 1, "deferred": 1, "failed": 1},
            "by_storage_provider": {"local": 1, "custom": 2},
            "by_issue_category": {"transient_remote_failure": 1},
            "recent_issues": [build_processing_issue(media_id="media-issue-1", updated_at=updated_at)],
        }

    monkeypatch.setattr(media_route, "summarize_workspace_media_storage", fake_summarize_workspace_media_storage)
    monkeypatch.setattr(
        media_route,
        "build_workspace_media_processing_overview",
        fake_build_workspace_media_processing_overview,
    )

    summary_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/media/storage-summary")
    overview_response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/processing-overview",
        params={"issue_limit": 7},
    )

    assert summary_response.status_code == 200
    assert captured_summary == {"workspace_id": ids["workspace_id"]}
    assert summary_response.json()["data"]["summary"]["largest_item_name"] == "clip.mp4"

    assert overview_response.status_code == 200
    assert captured_overview == {
        "workspace_id": ids["workspace_id"],
        "issue_limit": 7,
    }
    assert overview_response.json()["data"]["overview"]["recent_issues"][0]["media_id"] == "media-issue-1"


def test_media_management_api_status_route_returns_scoped_media_for_members() -> None:
    client, session_local, ids, current_role = build_media_management_client()
    current_role["value"] = "viewer_id"
    media_id = add_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["primary_record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="status.png",
        storage_key="uploads/status.png",
        created_at=datetime(2026, 3, 31, 11, 0, tzinfo=timezone.utc),
    )

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}/status")

    assert response.status_code == 200
    payload = response.json()["data"]["media"]
    assert payload["id"] == media_id
    assert payload["record_id"] == ids["primary_record_id"]


def test_media_management_api_retry_logs_audit_for_write_access(monkeypatch) -> None:
    client, session_local, ids, current_role = build_media_management_client()
    current_role["value"] = "editor_id"
    media_id = add_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["primary_record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="retry.png",
        storage_key="uploads/retry.png",
        created_at=datetime(2026, 3, 31, 12, 0, tzinfo=timezone.utc),
    )
    audit_calls: list[dict[str, object]] = []

    def fake_dispatch_media_processing(db, media_id):
        media_item = db.get(MediaAsset, media_id)
        assert media_item is not None
        media_item.processing_status = "pending"
        return media_item, "async"

    monkeypatch.setattr(media_route, "dispatch_media_processing", fake_dispatch_media_processing)
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}/retry")

    assert response.status_code == 200
    assert response.json()["data"]["media"]["processing_status"] == "pending"
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "media.retry_processing",
            "resource_type": "media_asset",
            "resource_id": media_id,
            "message": "Retried media processing for retry.png",
            "metadata_json": {
                "record_id": ids["primary_record_id"],
                "processing_status": "pending",
                "processing_mode": "async",
            },
        }
    ]


def test_media_management_api_delete_rebuilds_knowledge_and_logs_audit(monkeypatch) -> None:
    client, session_local, ids, current_role = build_media_management_client()
    current_role["value"] = "editor_id"
    media_id = add_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["primary_record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="delete.png",
        storage_key="uploads/delete.png",
        created_at=datetime(2026, 3, 31, 13, 0, tzinfo=timezone.utc),
    )
    removed_keys: list[str] = []
    rebuilt_record_ids: list[str] = []
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(media_route, "media_uses_local_storage", lambda media: True)
    monkeypatch.setattr(media_route, "remove_storage_file", lambda media: removed_keys.append(media.storage_key))
    monkeypatch.setattr(media_route, "rebuild_record_knowledge", lambda db, record_id: rebuilt_record_ids.append(record_id))
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.delete(f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}")

    assert response.status_code == 200
    assert response.json()["data"]["deleted"] is True
    assert removed_keys == ["uploads/delete.png"]
    assert rebuilt_record_ids == [ids["primary_record_id"]]
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "media.delete",
            "resource_type": "media_asset",
            "resource_id": media_id,
            "message": "Deleted media delete.png",
            "metadata_json": {
                "record_id": ids["primary_record_id"],
                "storage_key": "uploads/delete.png",
            },
        }
    ]

    with session_local() as db:
        assert db.get(MediaAsset, media_id) is None


def test_media_management_api_enforces_member_vs_write_permissions() -> None:
    client, session_local, ids, current_role = build_media_management_client()
    media_id = add_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["primary_record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="protected.png",
        storage_key="uploads/protected.png",
        created_at=datetime(2026, 3, 31, 14, 0, tzinfo=timezone.utc),
    )

    current_role["value"] = "viewer_id"

    member_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}/status")
    assert member_response.status_code == 200

    for method, path in (
        ("post", f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}/retry"),
        ("delete", f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}"),
    ):
        if method == "delete":
            response = client.delete(path)
        else:
            response = client.post(path)

        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"
