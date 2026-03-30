from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import share_links as share_links_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.share_link import ShareLink
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_share_links_management_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="share-links-owner",
            email="share-links-owner@example.com",
            password_hash="test-hash",
            display_name="Share Links Owner",
        )
        editor = User(
            username="share-links-editor",
            email="share-links-editor@example.com",
            password_hash="test-hash",
            display_name="Share Links Editor",
        )
        viewer = User(
            username="share-links-viewer",
            email="share-links-viewer@example.com",
            password_hash="test-hash",
            display_name="Share Links Viewer",
        )
        db.add_all([owner, editor, viewer])
        db.flush()

        workspace = Workspace(
            name="Share Links Workspace",
            slug="share-links-workspace",
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
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(share_links_route.router, prefix="/api/v1/workspaces")

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


def create_share_link_record(
    session_local: sessionmaker,
    *,
    workspace_id: str,
    created_by: str,
    name: str,
    token_hint: str,
    permission_code: str,
    created_at: datetime,
) -> str:
    with session_local() as db:
        item = ShareLink(
            workspace_id=workspace_id,
            created_by=created_by,
            name=name,
            token_hash=f"hash-{token_hint}",
            token_hint=token_hint,
            permission_code=permission_code,
            is_enabled=True,
            max_uses=3,
            use_count=0,
            created_at=created_at,
            updated_at=created_at,
        )
        db.add(item)
        db.commit()
        return item.id


def test_share_links_management_api_lists_items_in_created_order_for_owner() -> None:
    client, session_local, ids, _current_user_key = build_share_links_management_client()
    now = datetime(2026, 4, 3, 12, 0, tzinfo=timezone.utc)
    newest_id = create_share_link_record(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Newest link",
        token_hint="newest",
        permission_code="viewer",
        created_at=now,
    )
    older_id = create_share_link_record(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Older link",
        token_hint="older",
        permission_code="editor",
        created_at=now - timedelta(minutes=5),
    )

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/share-links")

    assert response.status_code == 200
    items = response.json()["data"]["items"]
    assert [item["id"] for item in items] == [newest_id, older_id]


def test_share_links_management_api_create_passes_service_values_and_logs_audit(monkeypatch) -> None:
    client, _session_local, ids, _current_user_key = build_share_links_management_client()
    captured_validate: list[str] = []
    captured_create: dict[str, object] = {}
    captured_build_path: list[str] = []
    audit_calls: list[dict[str, object]] = []
    created_at = datetime(2026, 4, 3, 13, 0, tzinfo=timezone.utc)

    def fake_validate_share_link_permission_code(permission_code):
        captured_validate.append(permission_code)

    def fake_create_share_link(
        db,
        *,
        workspace_id,
        created_by,
        name,
        permission_code,
        expires_at,
        max_uses,
    ):
        captured_create.update(
            {
                "workspace_id": workspace_id,
                "created_by": created_by,
                "name": name,
                "permission_code": permission_code,
                "expires_at": expires_at,
                "max_uses": max_uses,
            }
        )
        return (
            ShareLink(
                id="share-link-id",
                workspace_id=workspace_id,
                created_by=created_by,
                name=name,
                token_hash="token-hash",
                token_hint="share",
                permission_code=permission_code,
                is_enabled=True,
                expires_at=expires_at,
                max_uses=max_uses,
                use_count=0,
                created_at=created_at,
                updated_at=created_at,
            ),
            "access-token-123",
        )

    def fake_build_share_path(access_token):
        captured_build_path.append(access_token)
        return f"/share/{access_token}"

    monkeypatch.setattr(share_links_route, "validate_share_link_permission_code", fake_validate_share_link_permission_code)
    monkeypatch.setattr(share_links_route, "create_share_link", fake_create_share_link)
    monkeypatch.setattr(share_links_route, "build_share_path", fake_build_share_path)
    monkeypatch.setattr(share_links_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/share-links",
        json={
            "name": None,
            "permission_code": "viewer",
            "max_uses": 5,
            "expires_at": "2026-05-01T00:00:00Z",
        },
    )

    assert response.status_code == 200
    payload = response.json()["data"]
    assert captured_validate == ["viewer"]
    assert captured_create == {
        "workspace_id": ids["workspace_id"],
        "created_by": ids["owner_id"],
        "name": "Workspace share",
        "permission_code": "viewer",
        "expires_at": datetime(2026, 5, 1, 0, 0, tzinfo=timezone.utc),
        "max_uses": 5,
    }
    assert captured_build_path == ["access-token-123"]
    assert payload["access_token"] == "access-token-123"
    assert payload["share_path"] == "/share/access-token-123"
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["owner_id"],
            "action_code": "share_link.create",
            "resource_type": "share_link",
            "resource_id": "share-link-id",
            "message": "Created share link Workspace share",
            "metadata_json": {"permission_code": "viewer", "max_uses": 5},
        }
    ]


def test_share_links_management_api_update_uses_helper_and_logs_audit(monkeypatch) -> None:
    client, session_local, ids, _current_user_key = build_share_links_management_client()
    share_link_id = create_share_link_record(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Original link",
        token_hint="original",
        permission_code="viewer",
        created_at=datetime(2026, 4, 3, 14, 0, tzinfo=timezone.utc),
    )
    captured_lookup: dict[str, object] = {}
    captured_changes: dict[str, object] = {}
    audit_calls: list[dict[str, object]] = []

    def fake_get_workspace_share_link_or_404(db, *, workspace_id, share_link_id):
        captured_lookup.update(
            {
                "workspace_id": workspace_id,
                "share_link_id": share_link_id,
            }
        )
        item = db.get(ShareLink, share_link_id)
        assert item is not None
        return item

    def fake_apply_share_link_update(item, changes):
        captured_changes.update(changes)
        item.name = "Updated link"
        item.is_enabled = False
        item.max_uses = 9

    monkeypatch.setattr(share_links_route, "get_workspace_share_link_or_404", fake_get_workspace_share_link_or_404)
    monkeypatch.setattr(share_links_route, "apply_share_link_update", fake_apply_share_link_update)
    monkeypatch.setattr(share_links_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/share-links/{share_link_id}",
        json={
            "name": "Renamed link",
            "is_enabled": False,
            "max_uses": 9,
        },
    )

    assert response.status_code == 200
    assert captured_lookup == {
        "workspace_id": ids["workspace_id"],
        "share_link_id": share_link_id,
    }
    assert captured_changes == {
        "name": "Renamed link",
        "is_enabled": False,
        "max_uses": 9,
    }
    payload = response.json()["data"]["share_link"]
    assert payload["name"] == "Updated link"
    assert payload["is_enabled"] is False
    assert payload["max_uses"] == 9
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["owner_id"],
            "action_code": "share_link.update",
            "resource_type": "share_link",
            "resource_id": share_link_id,
            "message": "Updated share link Updated link",
            "metadata_json": {"is_enabled": False, "max_uses": 9},
        }
    ]


def test_share_links_management_api_is_owner_only() -> None:
    client, session_local, ids, current_user_key = build_share_links_management_client()
    share_link_id = create_share_link_record(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Protected link",
        token_hint="protected",
        permission_code="viewer",
        created_at=datetime(2026, 4, 3, 15, 0, tzinfo=timezone.utc),
    )

    for actor_key in ("editor_id", "viewer_id"):
        current_user_key["value"] = actor_key

        list_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/share-links")
        assert list_response.status_code == 403
        assert list_response.json()["detail"] == "Forbidden"

        create_response = client.post(
            f"/api/v1/workspaces/{ids['workspace_id']}/share-links",
            json={"name": "Blocked", "permission_code": "viewer", "max_uses": 1},
        )
        assert create_response.status_code == 403
        assert create_response.json()["detail"] == "Forbidden"

        update_response = client.patch(
            f"/api/v1/workspaces/{ids['workspace_id']}/share-links/{share_link_id}",
            json={"is_enabled": False},
        )
        assert update_response.status_code == 403
        assert update_response.json()["detail"] == "Forbidden"
