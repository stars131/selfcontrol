from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes import record_route_helpers
from app.api.routes.record_route_helpers import (
    apply_record_updates,
    cleanup_local_record_media_assets,
    filter_records_by_location_fields,
    get_workspace_record_or_404,
    preflight_remote_record_media_assets,
    read_record_location,
    record_has_coordinates,
    record_matches_location_query,
    record_matches_review_status,
)
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace


def build_record_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="record-helper-owner",
            email="record-helper-owner@example.com",
            password_hash="test-hash",
            display_name="Record Helper Owner",
        )
        db.add(owner)
        db.flush()

        workspace = Workspace(
            name="Record Helper Workspace",
            slug="record-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        other_workspace = Workspace(
            name="Other Record Helper Workspace",
            slug="other-record-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add_all([workspace, other_workspace])
        db.flush()

        rated_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Spicy noodles",
            content="Very good noodles",
            rating=5,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={
                "location": {
                    "place_name": "Chengdu Kitchen",
                    "address": "No. 8 Spice Road",
                    "latitude": 31.2304,
                    "longitude": 121.4737,
                },
                "location_review": {
                    "status": "approved",
                },
            },
        )
        pending_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="snack",
            title="Seaweed chips",
            content="Worth noting",
            rating=3,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={
                "location": {
                    "place_name": "Campus Store",
                    "address": "North Gate",
                }
            },
        )
        invalid_extra_data_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="note",
            title="Broken metadata",
            content="Metadata is not a dict",
            rating=None,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data=[],
        )
        other_workspace_record = Record(
            workspace_id=other_workspace.id,
            creator_id=owner.id,
            type_code="travel",
            title="Other workspace record",
            content="Should not resolve from another workspace",
            rating=4,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([rated_record, pending_record, invalid_extra_data_record, other_workspace_record])
        db.flush()

        local_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=rated_record.id,
            uploaded_by=owner.id,
            media_type="image",
            storage_provider="local",
            storage_key="records/local-image.jpg",
            original_filename="local-image.jpg",
            mime_type="image/jpeg",
            size_bytes=128,
            metadata_json={},
            processing_status="completed",
        )
        local_missing_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=rated_record.id,
            uploaded_by=owner.id,
            media_type="audio",
            storage_provider="local",
            storage_key="records/local-audio.m4a",
            original_filename="local-audio.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={},
            processing_status="completed",
        )
        remote_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=rated_record.id,
            uploaded_by=owner.id,
            media_type="video",
            storage_provider="custom",
            storage_key="remote/video.mp4",
            original_filename="video.mp4",
            mime_type="video/mp4",
            size_bytes=512,
            metadata_json={},
            processing_status="completed",
        )
        remote_failed_media = MediaAsset(
            workspace_id=workspace.id,
            record_id=rated_record.id,
            uploaded_by=owner.id,
            media_type="image",
            storage_provider="custom",
            storage_key="remote/failed-image.jpg",
            original_filename="failed-image.jpg",
            mime_type="image/jpeg",
            size_bytes=64,
            metadata_json={},
            processing_status="completed",
        )
        db.add_all([local_media, local_missing_media, remote_media, remote_failed_media])
        db.commit()

        return session_local, {
            "workspace_id": workspace.id,
            "other_workspace_id": other_workspace.id,
            "rated_record_id": rated_record.id,
            "pending_record_id": pending_record.id,
            "invalid_extra_data_record_id": invalid_extra_data_record.id,
            "other_workspace_record_id": other_workspace_record.id,
            "local_media_id": local_media.id,
            "local_missing_media_id": local_missing_media.id,
            "remote_media_id": remote_media.id,
            "remote_failed_media_id": remote_failed_media.id,
        }


def test_record_location_helpers_cover_location_query_review_status_and_filters() -> None:
    session_local, ids = build_record_route_helper_session()

    with session_local() as db:
        rated_record = db.get(Record, ids["rated_record_id"])
        pending_record = db.get(Record, ids["pending_record_id"])
        invalid_extra_data_record = db.get(Record, ids["invalid_extra_data_record_id"])

        assert rated_record is not None
        assert pending_record is not None
        assert invalid_extra_data_record is not None

        assert read_record_location(rated_record)["place_name"] == "Chengdu Kitchen"
        assert read_record_location(invalid_extra_data_record) == {}
        assert record_has_coordinates(rated_record) is True
        assert record_has_coordinates(pending_record) is False
        assert record_matches_location_query(rated_record, "kitchen") is True
        assert record_matches_location_query(rated_record, "spice road") is True
        assert record_matches_location_query(rated_record, "  ") is True
        assert record_matches_location_query(pending_record, "kitchen") is False
        assert record_matches_review_status(rated_record, "approved") is True
        assert record_matches_review_status(pending_record, "pending") is True
        assert record_matches_review_status(invalid_extra_data_record, "pending") is True
        assert record_matches_review_status(rated_record, "rejected") is False

        filtered_records = filter_records_by_location_fields(
            [rated_record, pending_record, invalid_extra_data_record],
            location_query="north gate",
            review_status="pending",
            has_coordinates=False,
        )

        assert [item.id for item in filtered_records] == [pending_record.id]


def test_workspace_record_lookup_and_update_helpers_cover_success_and_failures() -> None:
    session_local, ids = build_record_route_helper_session()

    with session_local() as db:
        record_item = get_workspace_record_or_404(
            db,
            workspace_id=ids["workspace_id"],
            record_id=ids["rated_record_id"],
        )
        assert record_item.id == ids["rated_record_id"]

        apply_record_updates(
            record_item,
            {
                "title": "Updated noodles",
                "rating": 4,
                "is_avoid": True,
            },
        )

        assert record_item.title == "Updated noodles"
        assert record_item.rating == 4
        assert record_item.is_avoid is True

        try:
            get_workspace_record_or_404(
                db,
                workspace_id=ids["workspace_id"],
                record_id=ids["other_workspace_record_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Record not found"
        else:
            raise AssertionError("Expected cross-workspace record lookup to fail")


def test_record_media_asset_cleanup_helpers_cover_local_and_remote_paths(monkeypatch) -> None:
    session_local, ids = build_record_route_helper_session()

    removed_local_media_ids: list[str] = []
    removed_remote_media_ids: list[str] = []

    def fake_remove_storage_file(media: MediaAsset) -> bool:
        removed_local_media_ids.append(media.id)
        return media.id == ids["local_media_id"]

    def fake_delete_remote_media(_db: Session, media: MediaAsset) -> None:
        if media.id == ids["remote_failed_media_id"]:
            raise RuntimeError("remote delete failed")
        removed_remote_media_ids.append(media.id)

    monkeypatch.setattr(record_route_helpers, "remove_storage_file", fake_remove_storage_file)

    with session_local() as db:
        media_assets = [
            db.get(MediaAsset, ids["local_media_id"]),
            db.get(MediaAsset, ids["local_missing_media_id"]),
            db.get(MediaAsset, ids["remote_media_id"]),
        ]

        assert all(media is not None for media in media_assets)

        removed_remote_media_count = preflight_remote_record_media_assets(
            db,
            media_assets,  # type: ignore[arg-type]
            delete_remote_media_fn=fake_delete_remote_media,
        )
        removed_local_media_count = cleanup_local_record_media_assets(
            media_assets,  # type: ignore[arg-type]
        )

        assert removed_remote_media_count == 1
        assert removed_local_media_count == 1
        assert removed_local_media_ids == [ids["local_media_id"], ids["local_missing_media_id"]]
        assert removed_remote_media_ids == [ids["remote_media_id"]]

        try:
            preflight_remote_record_media_assets(
                db,
                [db.get(MediaAsset, ids["remote_failed_media_id"])],  # type: ignore[list-item]
                delete_remote_media_fn=fake_delete_remote_media,
            )
        except RuntimeError as exc:
            assert str(exc) == "remote delete failed"
        else:
            raise AssertionError("Expected remote cleanup failure to surface")
