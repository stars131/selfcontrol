from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.share_link import ShareLink
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.share_links import (
    accept_share_link,
    build_share_path,
    create_share_link,
    get_share_link_by_token,
    hash_share_token,
    is_share_link_active,
)


def build_share_links_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="service-share-owner",
            email="service-share-owner@example.com",
            password_hash="test-hash",
            display_name="Service Share Owner",
        )
        viewer = User(
            username="service-share-viewer",
            email="service-share-viewer@example.com",
            password_hash="test-hash",
            display_name="Service Share Viewer",
        )
        guest = User(
            username="service-share-guest",
            email="service-share-guest@example.com",
            password_hash="test-hash",
            display_name="Service Share Guest",
        )
        db.add_all([owner, viewer, guest])
        db.flush()

        workspace = Workspace(
            name="Service Share Workspace",
            slug="service-share-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=viewer.id, role="viewer"),
            ]
        )
        db.commit()
        ids = {
            "owner_id": owner.id,
            "viewer_id": viewer.id,
            "guest_id": guest.id,
            "workspace_id": workspace.id,
        }

    return session_local, ids


def test_share_links_hash_path_and_active_status_rules() -> None:
    token = "test-token-123"
    assert hash_share_token(token) == hash_share_token(token)
    assert hash_share_token(token) != hash_share_token("different-token")
    assert build_share_path(token) == "/share/test-token-123"

    future = datetime.now(timezone.utc) + timedelta(days=1)
    past = datetime.now(timezone.utc) - timedelta(days=1)
    active_link = ShareLink(
        workspace_id="workspace-1",
        created_by="user-1",
        name="Active",
        token_hash=hash_share_token(token),
        token_hint=token[:8],
        permission_code="viewer",
        is_enabled=True,
        expires_at=future,
        max_uses=3,
        use_count=1,
    )
    assert is_share_link_active(active_link) is True

    disabled_link = ShareLink(
        workspace_id="workspace-1",
        created_by="user-1",
        name="Disabled",
        token_hash="x",
        token_hint="disabled",
        permission_code="viewer",
        is_enabled=False,
        expires_at=future,
        max_uses=3,
        use_count=0,
    )
    assert is_share_link_active(disabled_link) is False

    expired_link = ShareLink(
        workspace_id="workspace-1",
        created_by="user-1",
        name="Expired",
        token_hash="y",
        token_hint="expired",
        permission_code="viewer",
        is_enabled=True,
        expires_at=past,
        max_uses=3,
        use_count=0,
    )
    assert is_share_link_active(expired_link) is False

    exhausted_link = ShareLink(
        workspace_id="workspace-1",
        created_by="user-1",
        name="Exhausted",
        token_hash="z",
        token_hint="exhausted",
        permission_code="viewer",
        is_enabled=True,
        expires_at=future,
        max_uses=1,
        use_count=1,
    )
    assert is_share_link_active(exhausted_link) is False

    naive_future_link = ShareLink(
        workspace_id="workspace-1",
        created_by="user-1",
        name="Naive Future",
        token_hash="n",
        token_hint="naive",
        permission_code="viewer",
        is_enabled=True,
        expires_at=(datetime.now(timezone.utc) + timedelta(days=1)).replace(tzinfo=None),
        max_uses=None,
        use_count=0,
    )
    assert is_share_link_active(naive_future_link) is True


def test_create_share_link_and_accept_share_link_upgrade_membership() -> None:
    session_local, ids = build_share_links_service_session()

    with session_local() as db:
        item, token = create_share_link(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["owner_id"],
            name="Editor Link",
            permission_code="editor",
            expires_at=None,
            max_uses=2,
        )
        assert item.token_hash == hash_share_token(token)
        assert item.token_hint == token[:8]
        fetched = get_share_link_by_token(db, token)
        assert fetched is not None
        assert fetched.id == item.id

        workspace = accept_share_link(db, token=token, user_id=ids["viewer_id"])
        assert workspace.id == ids["workspace_id"]

        upgraded_membership = (
            db.query(WorkspaceMember)
            .filter(
                WorkspaceMember.workspace_id == ids["workspace_id"],
                WorkspaceMember.user_id == ids["viewer_id"],
            )
            .first()
        )
        assert upgraded_membership is not None
        assert upgraded_membership.role == "editor"

        refreshed_link = db.get(ShareLink, item.id)
        assert refreshed_link is not None
        assert refreshed_link.use_count == 1
        assert refreshed_link.last_used_at is not None

        second_link, second_token = create_share_link(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["owner_id"],
            name="Guest Viewer Link",
            permission_code="viewer",
            expires_at=None,
            max_uses=None,
        )
        workspace = accept_share_link(db, token=second_token, user_id=ids["guest_id"])
        assert workspace.id == ids["workspace_id"]
        guest_membership = (
            db.query(WorkspaceMember)
            .filter(
                WorkspaceMember.workspace_id == ids["workspace_id"],
                WorkspaceMember.user_id == ids["guest_id"],
            )
            .first()
        )
        assert guest_membership is not None
        assert guest_membership.role == "viewer"

        second_refreshed_link = db.get(ShareLink, second_link.id)
        assert second_refreshed_link is not None
        assert second_refreshed_link.use_count == 1


def test_accept_share_link_does_not_downgrade_existing_membership_and_exhausts_single_use_link() -> None:
    session_local, ids = build_share_links_service_session()

    with session_local() as db:
        link, token = create_share_link(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["owner_id"],
            name="Single Use Viewer Link",
            permission_code="viewer",
            expires_at=None,
            max_uses=1,
        )

        workspace = accept_share_link(db, token=token, user_id=ids["viewer_id"])
        assert workspace.id == ids["workspace_id"]

        existing_membership = (
            db.query(WorkspaceMember)
            .filter(
                WorkspaceMember.workspace_id == ids["workspace_id"],
                WorkspaceMember.user_id == ids["viewer_id"],
            )
            .first()
        )
        assert existing_membership is not None
        assert existing_membership.role == "viewer"

        refreshed_link = db.get(ShareLink, link.id)
        assert refreshed_link is not None
        assert refreshed_link.use_count == 1
        assert is_share_link_active(refreshed_link) is False

        try:
            accept_share_link(db, token=token, user_id=ids["guest_id"])
        except ValueError as exc:
            assert "invalid or expired" in str(exc)
        else:
            raise AssertionError("Expected exhausted share token to fail")


def test_get_share_link_by_token_returns_none_for_unknown_token() -> None:
    session_local, ids = build_share_links_service_session()

    with session_local() as db:
        create_share_link(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["owner_id"],
            name="Existing Link",
            permission_code="viewer",
            expires_at=None,
            max_uses=None,
        )

        assert get_share_link_by_token(db, "missing-token") is None


def test_accept_share_link_rejects_invalid_or_orphaned_links() -> None:
    session_local, ids = build_share_links_service_session()

    with session_local() as db:
        try:
            accept_share_link(db, token="missing-token", user_id=ids["guest_id"])
        except ValueError as exc:
            assert "invalid or expired" in str(exc)
        else:
            raise AssertionError("Expected missing share token to fail")

        expired_item, expired_token = create_share_link(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["owner_id"],
            name="Expired Link",
            permission_code="viewer",
            expires_at=datetime.now(timezone.utc) - timedelta(days=1),
            max_uses=None,
        )
        try:
            accept_share_link(db, token=expired_token, user_id=ids["guest_id"])
        except ValueError as exc:
            assert "invalid or expired" in str(exc)
        else:
            raise AssertionError("Expected expired share token to fail")

        orphan_item, orphan_token = create_share_link(
            db,
            workspace_id=ids["workspace_id"],
            created_by=ids["owner_id"],
            name="Orphan Link",
            permission_code="viewer",
            expires_at=None,
            max_uses=None,
        )
        orphan_item.workspace_id = "missing-workspace"
        db.add(orphan_item)
        db.commit()

        try:
            accept_share_link(db, token=orphan_token, user_id=ids["guest_id"])
        except ValueError as exc:
            assert "Workspace not found" in str(exc)
        else:
            raise AssertionError("Expected orphaned workspace link to fail")
