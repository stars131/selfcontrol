from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes.knowledge_route_helpers import (
    collect_knowledge_search_records,
    get_workspace_record_or_404,
)
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace
from app.services.knowledge_types import KnowledgeSearchHit


def build_knowledge_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="knowledge-helper-owner",
            email="knowledge-helper-owner@example.com",
            password_hash="test-hash",
            display_name="Knowledge Helper Owner",
        )
        db.add(owner)
        db.flush()

        workspace = Workspace(
            name="Knowledge Helper Workspace",
            slug="knowledge-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        other_workspace = Workspace(
            name="Other Knowledge Helper Workspace",
            slug="other-knowledge-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add_all([workspace, other_workspace])
        db.flush()

        record_one = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Knowledge record one",
            content="one",
            rating=5,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        record_two = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="snack",
            title="Knowledge record two",
            content="two",
            rating=3,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        other_workspace_record = Record(
            workspace_id=other_workspace.id,
            creator_id=owner.id,
            type_code="travel",
            title="Other workspace record",
            content="other",
            rating=4,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([record_one, record_two, other_workspace_record])
        db.commit()

        return session_local, {
            "workspace_id": workspace.id,
            "record_one_id": record_one.id,
            "record_two_id": record_two.id,
            "other_workspace_record_id": other_workspace_record.id,
        }


def test_get_workspace_record_or_404_covers_success_and_cross_workspace_failure() -> None:
    session_local, ids = build_knowledge_route_helper_session()

    with session_local() as db:
        record_item = get_workspace_record_or_404(
            db,
            workspace_id=ids["workspace_id"],
            record_id=ids["record_one_id"],
        )
        assert record_item.id == ids["record_one_id"]

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
            raise AssertionError("Expected cross-workspace knowledge record lookup to fail")


def test_collect_knowledge_search_records_deduplicates_preserves_order_and_skips_missing() -> None:
    session_local, ids = build_knowledge_route_helper_session()

    hits = [
        KnowledgeSearchHit(
            chunk_id="chunk-1",
            record_id=ids["record_two_id"],
            record_title="two",
            record_type_code="snack",
            source_type="manual",
            source_label="manual",
            media_id=None,
            score=0.9,
            snippet="two",
        ),
        KnowledgeSearchHit(
            chunk_id="chunk-2",
            record_id=ids["record_one_id"],
            record_title="one",
            record_type_code="food",
            source_type="manual",
            source_label="manual",
            media_id=None,
            score=0.8,
            snippet="one",
        ),
        KnowledgeSearchHit(
            chunk_id="chunk-3",
            record_id=ids["record_two_id"],
            record_title="two-duplicate",
            record_type_code="snack",
            source_type="manual",
            source_label="manual",
            media_id=None,
            score=0.7,
            snippet="duplicate",
        ),
        KnowledgeSearchHit(
            chunk_id="chunk-4",
            record_id="missing-record-id",
            record_title="missing",
            record_type_code="note",
            source_type="manual",
            source_label="manual",
            media_id=None,
            score=0.6,
            snippet="missing",
        ),
    ]

    with session_local() as db:
        records = collect_knowledge_search_records(db, hits)

    assert [record.id for record in records] == [ids["record_two_id"], ids["record_one_id"]]
