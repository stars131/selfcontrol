from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import search_presets as search_presets_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.search_preset import SearchPreset
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_search_presets_management_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="search-presets-owner",
            email="search-presets-owner@example.com",
            password_hash="test-hash",
            display_name="Search Presets Owner",
        )
        editor = User(
            username="search-presets-editor",
            email="search-presets-editor@example.com",
            password_hash="test-hash",
            display_name="Search Presets Editor",
        )
        viewer = User(
            username="search-presets-viewer",
            email="search-presets-viewer@example.com",
            password_hash="test-hash",
            display_name="Search Presets Viewer",
        )
        outsider = User(
            username="search-presets-outsider",
            email="search-presets-outsider@example.com",
            password_hash="test-hash",
            display_name="Search Presets Outsider",
        )
        db.add_all([owner, editor, viewer, outsider])
        db.flush()

        workspace = Workspace(
            name="Search Presets Workspace",
            slug="search-presets-workspace",
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
            "outsider_id": outsider.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(search_presets_route.router, prefix="/api/v1/workspaces")

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


def create_search_preset(
    session_local: sessionmaker,
    *,
    workspace_id: str,
    created_by: str,
    name: str,
    filters_json: dict,
    created_at: datetime,
    updated_at: datetime,
) -> str:
    with session_local() as db:
        item = SearchPreset(
            workspace_id=workspace_id,
            created_by=created_by,
            name=name,
            filters_json=filters_json,
            created_at=created_at,
            updated_at=updated_at,
        )
        db.add(item)
        db.commit()
        return item.id


def test_search_presets_management_api_lists_in_updated_order() -> None:
    client, session_local, ids, current_user_key = build_search_presets_management_client()
    current_user_key["value"] = "editor_id"
    now = datetime(2026, 4, 2, 12, 0, tzinfo=timezone.utc)

    newest_id = create_search_preset(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Newest preset",
        filters_json={"query": "new"},
        created_at=now - timedelta(minutes=10),
        updated_at=now,
    )
    older_id = create_search_preset(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Older preset",
        filters_json={"query": "old"},
        created_at=now - timedelta(minutes=20),
        updated_at=now - timedelta(minutes=5),
    )

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/search-presets")

    assert response.status_code == 200
    items = response.json()["data"]["items"]
    assert [item["id"] for item in items] == [newest_id, older_id]


def test_search_presets_management_api_create_normalizes_and_logs(monkeypatch) -> None:
    client, _session_local, ids, current_user_key = build_search_presets_management_client()
    current_user_key["value"] = "editor_id"
    captured_name_inputs: list[str] = []
    captured_filters_inputs: list[object] = []
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(
        search_presets_route,
        "normalize_search_preset_name",
        lambda raw_name: captured_name_inputs.append(raw_name) or "Normalized preset",
    )
    monkeypatch.setattr(
        search_presets_route,
        "normalize_search_preset_filters",
        lambda filters: captured_filters_inputs.append(filters) or {"query": "normalized"},
    )
    monkeypatch.setattr(search_presets_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/search-presets",
        json={
            "name": " Raw preset ",
            "filters": {
                "query": " q ",
                "type_code": "all",
                "is_avoid": "all",
                "place_query": "",
                "review_status": "all",
                "mapped_only": "all",
            },
        },
    )

    assert response.status_code == 200
    payload = response.json()["data"]["preset"]
    assert captured_name_inputs == [" Raw preset "]
    assert len(captured_filters_inputs) == 1
    assert payload["name"] == "Normalized preset"
    assert payload["filters_json"] == {
        "query": "normalized",
        "type_code": "all",
        "is_avoid": "all",
        "place_query": "",
        "review_status": "all",
        "mapped_only": "all",
    }
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "search_preset.create",
            "resource_type": "search_preset",
            "resource_id": payload["id"],
            "message": "Created search preset Normalized preset",
            "metadata_json": {"name": "Normalized preset"},
        }
    ]


def test_search_presets_management_api_update_and_delete_log_and_persist(monkeypatch) -> None:
    client, session_local, ids, current_user_key = build_search_presets_management_client()
    current_user_key["value"] = "editor_id"
    preset_id = create_search_preset(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Original preset",
        filters_json={"query": "old"},
        created_at=datetime(2026, 4, 2, 10, 0, tzinfo=timezone.utc),
        updated_at=datetime(2026, 4, 2, 10, 0, tzinfo=timezone.utc),
    )
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(search_presets_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    update_response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/search-presets/{preset_id}",
        json={
            "name": "Updated preset",
            "filters": {
                "query": "new",
                "type_code": "food",
                "is_avoid": "avoid",
                "place_query": "",
                "review_status": "confirmed",
                "mapped_only": "mapped",
            },
        },
    )
    assert update_response.status_code == 200
    updated = update_response.json()["data"]["preset"]
    assert updated["name"] == "Updated preset"
    assert updated["filters_json"]["query"] == "new"

    delete_response = client.delete(f"/api/v1/workspaces/{ids['workspace_id']}/search-presets/{preset_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True

    assert audit_calls[0] == {
        "workspace_id": ids["workspace_id"],
        "actor_user_id": ids["editor_id"],
        "action_code": "search_preset.update",
        "resource_type": "search_preset",
        "resource_id": preset_id,
        "message": "Updated search preset Updated preset",
        "metadata_json": {"name": "Updated preset"},
    }
    assert audit_calls[1] == {
        "workspace_id": ids["workspace_id"],
        "actor_user_id": ids["editor_id"],
        "action_code": "search_preset.delete",
        "resource_type": "search_preset",
        "resource_id": preset_id,
        "message": "Deleted search preset Updated preset",
        "metadata_json": {"name": "Updated preset"},
    }

    with session_local() as db:
        assert db.get(SearchPreset, preset_id) is None


def test_search_presets_management_api_requires_write_access_for_all_mutations() -> None:
    client, session_local, ids, current_user_key = build_search_presets_management_client()
    preset_id = create_search_preset(
        session_local,
        workspace_id=ids["workspace_id"],
        created_by=ids["owner_id"],
        name="Protected preset",
        filters_json={"query": "protected"},
        created_at=datetime(2026, 4, 2, 11, 0, tzinfo=timezone.utc),
        updated_at=datetime(2026, 4, 2, 11, 0, tzinfo=timezone.utc),
    )

    current_user_key["value"] = "viewer_id"
    for method, path in (
        ("get", f"/api/v1/workspaces/{ids['workspace_id']}/search-presets"),
        ("post", f"/api/v1/workspaces/{ids['workspace_id']}/search-presets"),
        ("patch", f"/api/v1/workspaces/{ids['workspace_id']}/search-presets/{preset_id}"),
        ("delete", f"/api/v1/workspaces/{ids['workspace_id']}/search-presets/{preset_id}"),
    ):
        if method == "post":
            response = client.post(
                path,
                json={"name": "Blocked", "filters": {}},
            )
        elif method == "patch":
            response = client.patch(path, json={"name": "Blocked"})
        elif method == "delete":
            response = client.delete(path)
        else:
            response = client.get(path)

        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"

    current_user_key["value"] = "outsider_id"
    outsider_delete_response = client.delete(
        f"/api/v1/workspaces/{ids['workspace_id']}/search-presets/{preset_id}"
    )
    assert outsider_delete_response.status_code == 403
    assert outsider_delete_response.json()["detail"] == "Forbidden"
