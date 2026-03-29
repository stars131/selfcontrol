from __future__ import annotations

from pathlib import Path

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes import media_route_helpers
from app.api.routes.media_route_helpers import (
    build_media_content_response,
    build_uploaded_media_asset,
    collect_dead_letter_target_items,
    execute_dead_letter_bulk_retry,
    get_workspace_media_or_404,
    get_workspace_record_or_404,
    normalize_dead_letter_retry_states,
)
from app.core.config import settings
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace
from app.services.media_provider import DeferredMediaProcessingError
from app.services.media_remote_storage_types import RemoteMediaContentResult, RemoteMediaUploadAttemptResult, RemoteMediaUploadResult


def build_media_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="media-helper-owner",
            email="media-helper-owner@example.com",
            password_hash="test-hash",
            display_name="Media Helper Owner",
        )
        db.add(owner)
        db.flush()

        workspace = Workspace(
            name="Media Helper Workspace",
            slug="media-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        other_workspace = Workspace(
            name="Other Media Helper Workspace",
            slug="other-media-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add_all([workspace, other_workspace])
        db.flush()

        record_item = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Media helper record",
            content="content",
            rating=5,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        other_workspace_record = Record(
            workspace_id=other_workspace.id,
            creator_id=owner.id,
            type_code="travel",
            title="Other media helper record",
            content="other",
            rating=3,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([record_item, other_workspace_record])
        db.flush()

        retry_async_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=record_item.id,
            uploaded_by=owner.id,
            media_type="image",
            storage_provider="custom",
            storage_key="remote/retry-async.jpg",
            original_filename="retry-async.jpg",
            mime_type="image/jpeg",
            size_bytes=101,
            metadata_json={"processing_retry_state": "manual_only"},
            processing_status="failed",
        )
        retry_sync_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=record_item.id,
            uploaded_by=owner.id,
            media_type="audio",
            storage_provider="custom",
            storage_key="remote/retry-sync.m4a",
            original_filename="retry-sync.m4a",
            mime_type="audio/mp4",
            size_bytes=102,
            metadata_json={"processing_retry_state": "manual_only"},
            processing_status="deferred",
        )
        local_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=record_item.id,
            uploaded_by=owner.id,
            media_type="image",
            storage_provider="local",
            storage_key="uploads/local.jpg",
            original_filename="local.jpg",
            mime_type="image/jpeg",
            size_bytes=103,
            metadata_json={"processing_retry_state": "manual_only"},
            processing_status="failed",
        )
        completed_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=record_item.id,
            uploaded_by=owner.id,
            media_type="video",
            storage_provider="custom",
            storage_key="remote/completed.mp4",
            original_filename="completed.mp4",
            mime_type="video/mp4",
            size_bytes=104,
            metadata_json={"processing_retry_state": "manual_only"},
            processing_status="completed",
        )
        skipped_retry_state_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=record_item.id,
            uploaded_by=owner.id,
            media_type="image",
            storage_provider="custom",
            storage_key="remote/skipped.jpg",
            original_filename="skipped.jpg",
            mime_type="image/jpeg",
            size_bytes=105,
            metadata_json={"processing_retry_state": "disabled"},
            processing_status="failed",
        )
        other_workspace_media = MediaAsset(
            workspace_id=other_workspace.id,
            record_id=other_workspace_record.id,
            uploaded_by=owner.id,
            media_type="image",
            storage_provider="custom",
            storage_key="remote/other.jpg",
            original_filename="other.jpg",
            mime_type="image/jpeg",
            size_bytes=106,
            metadata_json={"processing_retry_state": "manual_only"},
            processing_status="failed",
        )
        db.add_all(
            [
                retry_async_media,
                retry_sync_media,
                local_media,
                completed_media,
                skipped_retry_state_media,
                other_workspace_media,
            ]
        )
        db.commit()

        return session_local, {
            "workspace_id": workspace.id,
            "record_id": record_item.id,
            "other_workspace_record_id": other_workspace_record.id,
            "retry_async_media_id": retry_async_media.id,
            "retry_sync_media_id": retry_sync_media.id,
            "local_media_id": local_media.id,
            "completed_media_id": completed_media.id,
            "skipped_retry_state_media_id": skipped_retry_state_media.id,
            "other_workspace_media_id": other_workspace_media.id,
        }


def test_retry_state_normalization_and_workspace_lookup_helpers_cover_success_and_failures() -> None:
    session_local, ids = build_media_route_helper_session()

    assert normalize_dead_letter_retry_states([" manual_only ", "disabled", "manual_only"]) == {
        "manual_only",
        "disabled",
    }
    assert normalize_dead_letter_retry_states([]) == set(media_route_helpers.DEAD_LETTER_RETRY_STATES)
    assert normalize_dead_letter_retry_states(None) == set(media_route_helpers.DEAD_LETTER_RETRY_STATES)

    try:
        normalize_dead_letter_retry_states(["manual_only", "bogus"])
    except HTTPException as exc:
        assert exc.status_code == 400
        assert exc.detail == "Unsupported dead-letter retry states: bogus"
    else:
        raise AssertionError("Expected invalid retry state to fail")

    with session_local() as db:
        media_item = get_workspace_media_or_404(db, ids["workspace_id"], ids["retry_async_media_id"])
        record_item = get_workspace_record_or_404(db, ids["workspace_id"], ids["record_id"])
        assert media_item.id == ids["retry_async_media_id"]
        assert record_item.id == ids["record_id"]

        for lookup, expected_detail in (
            (
                lambda: get_workspace_media_or_404(db, ids["workspace_id"], ids["other_workspace_media_id"]),
                "Media not found",
            ),
            (
                lambda: get_workspace_record_or_404(db, ids["workspace_id"], ids["other_workspace_record_id"]),
                "Record not found",
            ),
        ):
            try:
                lookup()
            except HTTPException as exc:
                assert exc.status_code == 404
                assert exc.detail == expected_detail
            else:
                raise AssertionError("Expected cross-workspace lookup to fail")


def test_collect_dead_letter_target_items_covers_explicit_ids_and_overview_fallback(monkeypatch) -> None:
    session_local, ids = build_media_route_helper_session()

    with session_local() as db:
        explicit_items = collect_dead_letter_target_items(
            db,
            workspace_id=ids["workspace_id"],
            media_ids=[
                ids["retry_async_media_id"],
                ids["retry_async_media_id"],
                ids["other_workspace_media_id"],
                "missing-id",
                ids["retry_sync_media_id"],
            ],
            limit=20,
            retry_states={"manual_only"},
        )

        assert [item.id for item in explicit_items] == [ids["retry_async_media_id"], ids["retry_sync_media_id"]]

        monkeypatch.setattr(
            media_route_helpers,
            "build_workspace_media_dead_letter_overview",
            lambda _db, _workspace_id, *, limit, retry_states: {
                "items": [
                    {"media_id": ids["retry_sync_media_id"]},
                    {"media_id": "missing-id"},
                    {"media_id": ids["retry_async_media_id"]},
                ]
            },
        )

        overview_items = collect_dead_letter_target_items(
            db,
            workspace_id=ids["workspace_id"],
            media_ids=[],
            limit=3,
            retry_states={"manual_only"},
        )

        assert [item.id for item in overview_items] == [ids["retry_sync_media_id"], ids["retry_async_media_id"]]


def test_execute_dead_letter_bulk_retry_covers_retried_and_skipped_paths(monkeypatch) -> None:
    session_local, ids = build_media_route_helper_session()

    monkeypatch.setattr(
        media_route_helpers,
        "build_media_processing_issue",
        lambda media: {
            "can_bulk_retry": media.id != ids["completed_media_id"],
        },
    )
    monkeypatch.setattr(
        media_route_helpers,
        "dispatch_media_processing",
        lambda _db, media_id: (
            object(),
            "async" if media_id == ids["retry_async_media_id"] else "sync",
        ),
    )

    with session_local() as db:
        target_items = [
            db.get(MediaAsset, ids["retry_async_media_id"]),
            db.get(MediaAsset, ids["retry_sync_media_id"]),
            db.get(MediaAsset, ids["local_media_id"]),
            db.get(MediaAsset, ids["completed_media_id"]),
            db.get(MediaAsset, ids["skipped_retry_state_media_id"]),
        ]
        assert all(item is not None for item in target_items)

        result = execute_dead_letter_bulk_retry(
            db,
            target_items=target_items,  # type: ignore[arg-type]
            retry_states={"manual_only"},
            workspace_id=ids["workspace_id"],
        )

    assert result == {
        "workspace_id": ids["workspace_id"],
        "target_count": 5,
        "retried_count": 2,
        "queued_count": 1,
        "processing_count": 1,
        "skipped_media_ids": [
            ids["local_media_id"],
            ids["completed_media_id"],
            ids["skipped_retry_state_media_id"],
        ],
        "skipped_reason_by_media_id": {
            ids["local_media_id"]: "local_storage_not_supported",
            ids["completed_media_id"]: "bulk_retry_not_recommended",
            ids["skipped_retry_state_media_id"]: "retry_state_not_selected",
        },
        "retried_media_ids": [ids["retry_async_media_id"], ids["retry_sync_media_id"]],
    }


def test_build_media_content_response_covers_remote_and_local_paths(tmp_path, monkeypatch) -> None:
    session_local, ids = build_media_route_helper_session()

    with session_local() as db:
        remote_media = db.get(MediaAsset, ids["retry_async_media_id"])
        local_media = db.get(MediaAsset, ids["local_media_id"])
        assert remote_media is not None
        assert local_media is not None

        remote_response = build_media_content_response(
            db,
            remote_media,
            download_remote_media=lambda _db, media: RemoteMediaContentResult(
                content=f"content:{media.id}".encode(),
                media_type=None,
            ),
        )
        assert remote_response.body == f"content:{ids['retry_async_media_id']}".encode()
        assert remote_response.media_type == "image/jpeg"
        assert remote_response.headers["content-disposition"] == 'inline; filename="retry-async.jpg"'

        for error_factory, expected_status in (
            (lambda: DeferredMediaProcessingError("deferred"), 409),
            (lambda: FileNotFoundError("missing remote file"), 404),
            (lambda: RuntimeError("remote provider failed"), 502),
        ):
            try:
                build_media_content_response(
                    db,
                    remote_media,
                    download_remote_media=lambda _db, _media, factory=error_factory: (_ for _ in ()).throw(factory()),
                )
            except HTTPException as exc:
                assert exc.status_code == expected_status
            else:
                raise AssertionError("Expected remote content error to map to HTTPException")

        local_file = tmp_path / "local-image.jpg"
        local_file.write_bytes(b"local-bytes")
        monkeypatch.setattr(media_route_helpers, "resolve_storage_path", lambda media: local_file)

        local_response = build_media_content_response(
            db,
            local_media,
            download_remote_media=lambda _db, _media: None,
        )
        assert Path(local_response.path) == local_file
        assert local_response.media_type == "image/jpeg"
        assert local_response.filename == "local.jpg"

        monkeypatch.setattr(media_route_helpers, "resolve_storage_path", lambda media: tmp_path / "missing-local.jpg")
        try:
            build_media_content_response(
                db,
                local_media,
                download_remote_media=lambda _db, _media: None,
            )
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Stored file not found"
        else:
            raise AssertionError("Expected missing local file to fail")


def test_build_uploaded_media_asset_covers_remote_and_local_fallback_paths(tmp_path, monkeypatch) -> None:
    original_storage_dir = settings.storage_dir
    try:
        settings.storage_dir = str(tmp_path / "uploads")

        remote_upload_asset = build_uploaded_media_asset(
            upload_attempt=RemoteMediaUploadAttemptResult(
                remote_upload=RemoteMediaUploadResult(
                    storage_provider="custom",
                    storage_key="remote/object-key",
                    size_bytes=512,
                    metadata_json={"remote": True},
                ),
                fallback_used=False,
            ),
            workspace_id="workspace-1",
            record_id="record-1",
            uploaded_by="user-1",
            original_filename="remote.jpg",
            mime_type="image/jpeg",
            media_type="image",
            content=b"ignored",
        )

        assert remote_upload_asset.storage_provider == "custom"
        assert remote_upload_asset.storage_key == "remote/object-key"
        assert remote_upload_asset.size_bytes == 512
        assert remote_upload_asset.metadata_json == {"remote": True}
        assert remote_upload_asset.processing_status == "pending"
        assert remote_upload_asset.processing_error is None

        monkeypatch.setattr(media_route_helpers.uuid, "uuid4", lambda: type("FakeUuid", (), {"hex": "fixedhex"})())

        local_upload_asset = build_uploaded_media_asset(
            upload_attempt=RemoteMediaUploadAttemptResult(
                remote_upload=None,
                fallback_used=True,
                fallback_reason=None,
                fallback_provider=None,
                fallback_at="2026-03-29T12:00:00Z",
            ),
            workspace_id="workspace-2",
            record_id="record-2",
            uploaded_by="user-2",
            original_filename="local.png",
            mime_type="image/png",
            media_type="image",
            content=b"png-bytes",
        )

        assert local_upload_asset.storage_provider == "local"
        assert local_upload_asset.size_bytes == len(b"png-bytes")
        assert local_upload_asset.metadata_json == {
            "storage_fallback_mode": "remote_to_local",
            "storage_fallback_reason": "Remote media upload failed",
            "storage_fallback_provider": "custom",
            "storage_fallback_at": "2026-03-29T12:00:00Z",
        }

        stored_file = Path(settings.storage_dir).parent / local_upload_asset.storage_key
        assert stored_file.exists() is True
        assert stored_file.read_bytes() == b"png-bytes"
        assert stored_file.name == "fixedhex_local.png"
    finally:
        settings.storage_dir = original_storage_dir
