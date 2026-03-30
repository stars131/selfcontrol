from __future__ import annotations

from datetime import datetime, timezone
from types import SimpleNamespace

from fastapi import FastAPI
from fastapi.responses import Response
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
from app.services.media_provider import DeferredMediaProcessingError


def build_media_io_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="media-io-owner",
            email="media-io-owner@example.com",
            password_hash="test-hash",
            display_name="Media IO Owner",
        )
        editor = User(
            username="media-io-editor",
            email="media-io-editor@example.com",
            password_hash="test-hash",
            display_name="Media IO Editor",
        )
        viewer = User(
            username="media-io-viewer",
            email="media-io-viewer@example.com",
            password_hash="test-hash",
            display_name="Media IO Viewer",
        )
        outsider = User(
            username="media-io-outsider",
            email="media-io-outsider@example.com",
            password_hash="test-hash",
            display_name="Media IO Outsider",
        )
        db.add_all([owner, editor, viewer, outsider])
        db.flush()

        workspace = Workspace(
            name="Media IO Workspace",
            slug="media-io-workspace",
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

        record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Media IO Record",
            content="Media IO content",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add(record)
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
            "outsider_id": outsider.id,
            "record_id": record.id,
        }

    current_user_key = {"value": "owner_id"}

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
            user = db.get(User, ids[current_user_key["value"]])
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, ids, current_user_key


def create_media_asset(
    session_local: sessionmaker,
    *,
    workspace_id: str,
    record_id: str,
    uploaded_by: str,
    original_filename: str,
) -> str:
    with session_local() as db:
        item = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=uploaded_by,
            media_type="image",
            storage_provider="local",
            storage_key=f"uploads/{original_filename}",
            original_filename=original_filename,
            mime_type="image/png",
            size_bytes=128,
            metadata_json={},
            processing_status="completed",
            created_at=datetime(2026, 4, 1, 9, 0, tzinfo=timezone.utc),
            updated_at=datetime(2026, 4, 1, 9, 0, tzinfo=timezone.utc),
        )
        db.add(item)
        db.commit()
        return item.id


def test_media_io_api_upload_passes_expected_arguments_and_logs_audit(monkeypatch) -> None:
    client, session_local, ids, current_user_key = build_media_io_client()
    current_user_key["value"] = "editor_id"
    captured_record_lookup: dict[str, object] = {}
    captured_attempt: dict[str, object] = {}
    captured_build: dict[str, object] = {}
    audit_calls: list[dict[str, object]] = []

    def fake_get_workspace_record_or_404(db, workspace_id, record_id):
        captured_record_lookup.update({"workspace_id": workspace_id, "record_id": record_id})
        return db.get(Record, record_id)

    async def fake_attempt_media_upload_via_provider(
        db,
        *,
        workspace_id,
        record_id,
        filename,
        mime_type,
        content,
    ):
        captured_attempt.update(
            {
                "workspace_id": workspace_id,
                "record_id": record_id,
                "filename": filename,
                "mime_type": mime_type,
                "content": content,
            }
        )
        return SimpleNamespace(
            remote_upload=None,
            fallback_used=True,
            fallback_reason="Remote upload failed",
        )

    def fake_build_uploaded_media_asset(
        *,
        upload_attempt,
        workspace_id,
        record_id,
        uploaded_by,
        original_filename,
        mime_type,
        media_type,
        content,
    ):
        captured_build.update(
            {
                "workspace_id": workspace_id,
                "record_id": record_id,
                "uploaded_by": uploaded_by,
                "original_filename": original_filename,
                "mime_type": mime_type,
                "media_type": media_type,
                "content": content,
                "fallback_used": upload_attempt.fallback_used,
            }
        )
        return MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=uploaded_by,
            media_type=media_type,
            storage_provider="local",
            storage_key="uploads/uploaded.png",
            original_filename=original_filename,
            mime_type=mime_type,
            size_bytes=len(content),
            metadata_json={"source": "upload-api"},
            processing_status="pending",
        )

    def fake_dispatch_media_processing(db, media_id):
        media_item = db.get(MediaAsset, media_id)
        assert media_item is not None
        media_item.processing_status = "pending"
        return media_item, "async"

    monkeypatch.setattr(media_route, "get_workspace_record_or_404", fake_get_workspace_record_or_404)
    monkeypatch.setattr(media_route, "attempt_media_upload_via_provider", fake_attempt_media_upload_via_provider)
    monkeypatch.setattr(media_route, "build_uploaded_media_asset", fake_build_uploaded_media_asset)
    monkeypatch.setattr(media_route, "dispatch_media_processing", fake_dispatch_media_processing)
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['record_id']}/media",
        files={"file": ("receipt.png", b"png-bytes", "image/png")},
    )

    assert response.status_code == 200
    assert captured_record_lookup == {
        "workspace_id": ids["workspace_id"],
        "record_id": ids["record_id"],
    }
    assert captured_attempt == {
        "workspace_id": ids["workspace_id"],
        "record_id": ids["record_id"],
        "filename": "receipt.png",
        "mime_type": "image/png",
        "content": b"png-bytes",
    }
    assert captured_build == {
        "workspace_id": ids["workspace_id"],
        "record_id": ids["record_id"],
        "uploaded_by": ids["editor_id"],
        "original_filename": "receipt.png",
        "mime_type": "image/png",
        "media_type": "image",
        "content": b"png-bytes",
        "fallback_used": True,
    }
    payload = response.json()["data"]["media"]
    assert payload["original_filename"] == "receipt.png"
    assert payload["processing_status"] == "pending"
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "media.upload",
            "resource_type": "media_asset",
            "resource_id": payload["id"],
            "message": "Uploaded media receipt.png",
            "metadata_json": {
                "record_id": ids["record_id"],
                "media_type": "image",
                "mime_type": "image/png",
                "storage_provider": "local",
                "processing_mode": "async",
                "storage_fallback_used": True,
                "storage_fallback_reason": "Remote upload failed",
            },
        }
    ]


def test_media_io_api_upload_maps_provider_errors_to_http(monkeypatch) -> None:
    client, _session_local, ids, _current_user_key = build_media_io_client()

    async def raise_deferred(*args, **kwargs):
        raise DeferredMediaProcessingError("provider processing is not ready")

    monkeypatch.setattr(media_route, "attempt_media_upload_via_provider", raise_deferred)
    deferred_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['record_id']}/media",
        files={"file": ("deferred.bin", b"deferred", "application/octet-stream")},
    )
    assert deferred_response.status_code == 400
    assert deferred_response.json()["detail"] == "provider processing is not ready"

    async def raise_runtime(*args, **kwargs):
        raise RuntimeError("remote media gateway failed")

    monkeypatch.setattr(media_route, "attempt_media_upload_via_provider", raise_runtime)
    runtime_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['record_id']}/media",
        files={"file": ("runtime.bin", b"runtime", "application/octet-stream")},
    )
    assert runtime_response.status_code == 502
    assert runtime_response.json()["detail"] == "remote media gateway failed"


def test_media_io_api_content_route_passes_scoped_media_and_download_dependency(monkeypatch) -> None:
    client, session_local, ids, current_user_key = build_media_io_client()
    current_user_key["value"] = "viewer_id"
    media_id = create_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="preview.png",
    )
    captured_lookup: dict[str, object] = {}
    captured_build: dict[str, object] = {}

    def fake_get_workspace_media_or_404(db, workspace_id, media_id):
        captured_lookup.update({"workspace_id": workspace_id, "media_id": media_id})
        media_item = db.get(MediaAsset, media_id)
        assert media_item is not None
        return media_item

    def fake_build_media_content_response(db, media, *, download_remote_media):
        captured_build.update(
            {
                "media_id": media.id,
                "download_remote_media": download_remote_media,
            }
        )
        return Response(content=b"content-ok", media_type="application/octet-stream")

    monkeypatch.setattr(media_route, "get_workspace_media_or_404", fake_get_workspace_media_or_404)
    monkeypatch.setattr(media_route, "build_media_content_response", fake_build_media_content_response)

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}/content")

    assert response.status_code == 200
    assert response.content == b"content-ok"
    assert captured_lookup == {
        "workspace_id": ids["workspace_id"],
        "media_id": media_id,
    }
    assert captured_build == {
        "media_id": media_id,
        "download_remote_media": media_route.download_remote_media_via_provider,
    }


def test_media_io_api_enforces_member_vs_write_permissions() -> None:
    client, session_local, ids, current_user_key = build_media_io_client()
    media_id = create_media_asset(
        session_local,
        workspace_id=ids["workspace_id"],
        record_id=ids["record_id"],
        uploaded_by=ids["owner_id"],
        original_filename="access.png",
    )

    current_user_key["value"] = "viewer_id"
    content_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}/content")
    assert content_response.status_code != 403

    upload_forbidden_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['record_id']}/media",
        files={"file": ("blocked.png", b"blocked", "image/png")},
    )
    assert upload_forbidden_response.status_code == 403
    assert upload_forbidden_response.json()["detail"] == "Forbidden"

    current_user_key["value"] = "outsider_id"
    outsider_content_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/media/{media_id}/content")
    assert outsider_content_response.status_code == 403
    assert outsider_content_response.json()["detail"] == "Forbidden"
