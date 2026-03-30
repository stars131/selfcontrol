from __future__ import annotations

from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
ROUTES_DIR = REPO_ROOT / "apps" / "api" / "app" / "api" / "routes"
TESTS_DIR = REPO_ROOT / "apps" / "api" / "tests"

ROUTE_TEST_BASELINE = {
    "auth.py": ["test_auth_api.py"],
    "audit_logs.py": ["test_audit_logs_api.py"],
    "conversations.py": ["test_conversations_api.py"],
    "knowledge.py": ["test_knowledge_api.py"],
    "media.py": ["test_media_preview_api.py"],
    "notifications.py": ["test_reminders_notifications_api.py"],
    "provider_configs.py": ["test_provider_configs_api.py"],
    "public_shares.py": ["test_public_shares_api.py"],
    "records.py": ["test_records_api.py", "test_record_location_review.py"],
    "reminders.py": ["test_reminders_notifications_api.py"],
    "search.py": ["test_search_api.py"],
    "search_presets.py": ["test_search_presets_api.py"],
    "share_links.py": ["test_share_links_api.py"],
    "timeline.py": ["test_timeline_api.py"],
    "workspaces.py": [
        "test_workspace_export_api.py",
        "test_workspace_import_api.py",
        "test_workspace_permissions_api.py",
        "test_workspace_transfer_jobs_api.py",
    ],
}


def test_api_route_coverage_baseline_is_present() -> None:
    for route_filename, test_filenames in ROUTE_TEST_BASELINE.items():
        route_path = ROUTES_DIR / route_filename
        assert route_path.exists(), f"Route file is missing from baseline: {route_filename}"

        for test_filename in test_filenames:
            test_path = TESTS_DIR / test_filename
            assert test_path.exists(), f"Expected route coverage file is missing: {test_filename}"


def test_primary_route_modules_are_listed_in_coverage_baseline() -> None:
    ignored_routes = {"__init__.py"}
    route_filenames = {
        path.name
        for path in ROUTES_DIR.glob("*.py")
        if not path.name.endswith("_helpers.py") and path.name not in ignored_routes
    }
    assert route_filenames == set(ROUTE_TEST_BASELINE), "Route coverage baseline must track all primary route modules"
