from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes.search_preset_route_helpers import (
    get_workspace_search_preset_or_404,
    normalize_search_preset_filters,
    normalize_search_preset_name,
)
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.search_preset import SearchPreset
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.search_preset import SearchPresetFilters


def build_search_preset_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="search-preset-helper-owner",
            email="search-preset-helper-owner@example.com",
            password_hash="test-hash",
            display_name="Search Preset Helper Owner",
        )
        db.add(owner)
        db.flush()

        workspace = Workspace(
            name="Search Preset Helper Workspace",
            slug="search-preset-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        other_workspace = Workspace(
            name="Other Search Preset Helper Workspace",
            slug="other-search-preset-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add_all([workspace, other_workspace])
        db.flush()

        preset = SearchPreset(
            workspace_id=workspace.id,
            created_by=owner.id,
            name="Snacks",
            filters_json={"query": "chips"},
        )
        other_workspace_preset = SearchPreset(
            workspace_id=other_workspace.id,
            created_by=owner.id,
            name="Travel",
            filters_json={"query": "tokyo"},
        )
        db.add_all([preset, other_workspace_preset])
        db.commit()

        return session_local, {
            "workspace_id": workspace.id,
            "preset_id": preset.id,
            "other_workspace_preset_id": other_workspace_preset.id,
        }


def test_normalize_search_preset_filters_covers_trim_defaults_and_validation() -> None:
    normalized = normalize_search_preset_filters(
        SearchPresetFilters(
            query="  spicy noodles  ",
            type_code="  food  ",
            is_avoid=" Avoid ",
            place_query="  chengdu  ",
            review_status=" Confirmed ",
            mapped_only=" mapped ",
        )
    )

    assert normalized == {
        "query": "spicy noodles",
        "type_code": "food",
        "is_avoid": "avoid",
        "place_query": "chengdu",
        "review_status": "confirmed",
        "mapped_only": "mapped",
    }

    defaults = normalize_search_preset_filters(
        SearchPresetFilters(
            query="  ",
            type_code="  ",
            is_avoid="",
            place_query="  ",
            review_status="",
            mapped_only="",
        )
    )

    assert defaults == {
        "query": "",
        "type_code": "all",
        "is_avoid": "all",
        "place_query": "",
        "review_status": "all",
        "mapped_only": "all",
    }

    for payload, expected_detail in (
        (
            SearchPresetFilters(is_avoid="maybe"),
            "Invalid avoid filter",
        ),
        (
            SearchPresetFilters(review_status="archived"),
            "Invalid review status",
        ),
        (
            SearchPresetFilters(mapped_only="partial"),
            "Invalid map status",
        ),
    ):
        try:
            normalize_search_preset_filters(payload)
        except HTTPException as exc:
            assert exc.status_code == 400
            assert exc.detail == expected_detail
        else:
            raise AssertionError("Expected invalid filter payload to fail")


def test_search_preset_name_and_lookup_helpers_cover_success_and_failures() -> None:
    session_local, ids = build_search_preset_route_helper_session()

    assert normalize_search_preset_name("  Favorite snacks  ") == "Favorite snacks"

    try:
        normalize_search_preset_name("   ")
    except HTTPException as exc:
        assert exc.status_code == 400
        assert exc.detail == "Preset name is required"
    else:
        raise AssertionError("Expected blank preset name to fail")

    with session_local() as db:
        preset = get_workspace_search_preset_or_404(
            db,
            workspace_id=ids["workspace_id"],
            preset_id=ids["preset_id"],
        )

        assert preset.id == ids["preset_id"]

        try:
            get_workspace_search_preset_or_404(
                db,
                workspace_id=ids["workspace_id"],
                preset_id=ids["other_workspace_preset_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Search preset not found"
        else:
            raise AssertionError("Expected cross-workspace preset lookup to fail")
