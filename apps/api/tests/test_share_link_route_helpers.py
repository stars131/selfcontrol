from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes.share_link_route_helpers import (
    apply_share_link_update,
    get_active_share_link_and_workspace_or_404,
    get_workspace_share_link_or_404,
    serialize_share_link_preview,
    serialize_workspace_for_member,
    validate_share_link_permission_code,
)
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.share_link import ShareLink
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.share_links import hash_share_token


def build_share_link_helper_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="helper-share-owner",
            email="helper-share-owner@example.com",
            password_hash="test-hash",
            display_name="Helper Share Owner",
        )
        guest = User(
            username="helper-share-guest",
            email="helper-share-guest@example.com",
            password_hash="test-hash",
            display_name="Helper Share Guest",
        )
        db.add_all([owner, guest])
        db.flush()

        workspace = Workspace(
            name="Helper Share Workspace",
            slug="helper-share-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        membership = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=owner.id,
            role="owner",
        )
        db.add(membership)
        db.flush()

        share_link = ShareLink(
            workspace_id=workspace.id,
            created_by=owner.id,
            name="Helper Link",
            token_hash=hash_share_token("helper-token"),
            token_hint="helper",
            permission_code="editor",
            is_enabled=True,
            expires_at=datetime.now(timezone.utc) + timedelta(days=1),
            max_uses=5,
            use_count=1,
        )
        db.add(share_link)
        db.commit()

        return session_local, {
            "owner_id": owner.id,
            "guest_id": guest.id,
            "workspace_id": workspace.id,
            "share_link_id": share_link.id,
        }


def test_validate_share_link_permission_code_accepts_supported_values() -> None:
    validate_share_link_permission_code("viewer")
    validate_share_link_permission_code("editor")

    try:
        validate_share_link_permission_code("owner")
    except HTTPException as exc:
        assert exc.status_code == 400
        assert exc.detail == "Invalid permission code"
    else:
        raise AssertionError("Expected invalid permission code to fail")


def test_get_workspace_share_link_or_404_and_apply_update_handle_expected_paths() -> None:
    session_local, ids = build_share_link_helper_session()

    with session_local() as db:
        item = get_workspace_share_link_or_404(
            db,
            workspace_id=ids["workspace_id"],
            share_link_id=ids["share_link_id"],
        )
        apply_share_link_update(item, {"name": "Updated Helper Link", "max_uses": 9})

        assert item.name == "Updated Helper Link"
        assert item.max_uses == 9

        try:
            get_workspace_share_link_or_404(
                db,
                workspace_id="missing-workspace",
                share_link_id=ids["share_link_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Share link not found"
        else:
            raise AssertionError("Expected mismatched workspace lookup to fail")


def test_get_active_share_link_and_workspace_or_404_and_preview_serialization() -> None:
    session_local, ids = build_share_link_helper_session()

    with session_local() as db:
        item, workspace = get_active_share_link_and_workspace_or_404(db, token="helper-token")
        preview = serialize_share_link_preview(item, workspace)

        assert item.id == ids["share_link_id"]
        assert workspace.id == ids["workspace_id"]
        assert preview == {
            "name": "Helper Link",
            "workspace_id": ids["workspace_id"],
            "workspace_name": "Helper Share Workspace",
            "workspace_slug": "helper-share-workspace",
            "permission_code": "editor",
            "is_enabled": True,
            "expires_at": item.expires_at.isoformat(),
            "max_uses": 5,
            "use_count": 1,
        }

        item.is_enabled = False
        db.add(item)
        db.commit()

        try:
            get_active_share_link_and_workspace_or_404(db, token="helper-token")
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Share link not found"
        else:
            raise AssertionError("Expected inactive share link lookup to fail")


def test_serialize_workspace_for_member_returns_workspace_payload_and_missing_member_404() -> None:
    session_local, ids = build_share_link_helper_session()

    with session_local() as db:
        workspace = db.get(Workspace, ids["workspace_id"])
        assert workspace is not None

        payload = serialize_workspace_for_member(
            db,
            workspace=workspace,
            user_id=ids["owner_id"],
        )

        assert payload["id"] == ids["workspace_id"]
        assert payload["name"] == "Helper Share Workspace"
        assert payload["slug"] == "helper-share-workspace"
        assert payload["role"] == "owner"

        try:
            serialize_workspace_for_member(
                db,
                workspace=workspace,
                user_id=ids["guest_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Workspace membership not found"
        else:
            raise AssertionError("Expected missing membership serialization to fail")
