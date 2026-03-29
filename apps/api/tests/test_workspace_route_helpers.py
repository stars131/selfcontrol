from __future__ import annotations

from pathlib import Path

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes.workspace_route_helpers import (
    build_workspace_transfer_job_download_response,
    cleanup_export_archive,
    get_workspace_member_or_404,
    get_workspace_transfer_job_for_user_or_404,
    resolve_workspace_role_for_user,
    serialize_workspace,
    serialize_workspace_member,
    serialize_workspace_transfer_job,
    validate_workspace_member_removal,
    validate_workspace_member_role_change,
)
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.models.workspace_transfer_job import WorkspaceTransferJob


def build_workspace_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="helper-owner",
            email="helper-owner@example.com",
            password_hash="test-hash",
            display_name="Helper Owner",
        )
        editor = User(
            username="helper-editor",
            email="helper-editor@example.com",
            password_hash="test-hash",
            display_name="Helper Editor",
        )
        db.add_all([owner, editor])
        db.flush()

        workspace = Workspace(
            name="Helper Workspace",
            slug="helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        owner_member = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=owner.id,
            role="owner",
        )
        editor_member = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=editor.id,
            role="editor",
        )
        db.add_all([owner_member, editor_member])
        db.flush()

        export_job = WorkspaceTransferJob(
            workspace_id=workspace.id,
            created_by=owner.id,
            job_type="export",
            status="completed",
            payload_json={"kind": "full"},
            result_json={"ok": True},
            artifact_filename="helper-export.zip",
        )
        import_job = WorkspaceTransferJob(
            workspace_id=workspace.id,
            created_by=editor.id,
            job_type="import",
            status="pending",
            payload_json={"kind": "import"},
            result_json={},
        )
        db.add_all([export_job, import_job])
        db.commit()

        return session_local, {
            "owner_id": owner.id,
            "editor_id": editor.id,
            "workspace_id": workspace.id,
            "owner_member_id": owner_member.id,
            "editor_member_id": editor_member.id,
            "export_job_id": export_job.id,
            "import_job_id": import_job.id,
        }


def test_workspace_serializers_and_role_resolution_cover_expected_fields() -> None:
    session_local, ids = build_workspace_route_helper_session()

    with session_local() as db:
        workspace = db.get(Workspace, ids["workspace_id"])
        member = db.get(WorkspaceMember, ids["editor_member_id"])
        export_job = db.get(WorkspaceTransferJob, ids["export_job_id"])

        assert workspace is not None
        assert member is not None
        assert export_job is not None

        workspace_payload = serialize_workspace(workspace, "editor")
        member_payload = serialize_workspace_member(member)
        job_payload = serialize_workspace_transfer_job(export_job)

        assert workspace_payload["id"] == ids["workspace_id"]
        assert workspace_payload["role"] == "editor"
        assert member_payload["user_id"] == ids["editor_id"]
        assert member_payload["role"] == "editor"
        assert member_payload["username"] == "helper-editor"
        assert job_payload["id"] == ids["export_job_id"]
        assert job_payload["job_type"] == "export"
        assert job_payload["artifact_filename"] == "helper-export.zip"
        assert resolve_workspace_role_for_user(workspace, ids["editor_id"]) == "editor"
        assert resolve_workspace_role_for_user(workspace, "missing-user") == "viewer"


def test_workspace_transfer_job_lookup_and_download_response_cover_success_and_failures(
    tmp_path,
) -> None:
    session_local, ids = build_workspace_route_helper_session()

    with session_local() as db:
        export_job = db.get(WorkspaceTransferJob, ids["export_job_id"])
        import_job = db.get(WorkspaceTransferJob, ids["import_job_id"])

        assert export_job is not None
        assert import_job is not None

        export_artifact = tmp_path / "helper-export.zip"
        export_artifact.write_bytes(b"zip-bytes")
        export_job.artifact_path = str(export_artifact)
        db.add(export_job)
        db.commit()

        job = get_workspace_transfer_job_for_user_or_404(
            db,
            job_id=ids["export_job_id"],
            current_user_id=ids["owner_id"],
        )
        response = build_workspace_transfer_job_download_response(job)

        assert Path(response.path) == export_artifact
        assert response.media_type == "application/zip"
        assert response.filename == "helper-export.zip"

        try:
            get_workspace_transfer_job_for_user_or_404(
                db,
                job_id=ids["export_job_id"],
                current_user_id=ids["editor_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Workspace transfer job not found"
        else:
            raise AssertionError("Expected unauthorized job lookup to fail")

        try:
            build_workspace_transfer_job_download_response(import_job)
        except HTTPException as exc:
            assert exc.status_code == 400
            assert exc.detail == "Job artifact is not available"
        else:
            raise AssertionError("Expected non-export or incomplete job download to fail")

        export_job.artifact_path = str(tmp_path / "missing-export.zip")
        db.add(export_job)
        db.commit()

        try:
            build_workspace_transfer_job_download_response(export_job)
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Job artifact file not found"
        else:
            raise AssertionError("Expected missing artifact file to fail")


def test_workspace_member_helpers_cover_lookup_and_validation_rules() -> None:
    session_local, ids = build_workspace_route_helper_session()

    with session_local() as db:
        owner_member = db.get(WorkspaceMember, ids["owner_member_id"])
        editor_member = db.get(WorkspaceMember, ids["editor_member_id"])

        assert owner_member is not None
        assert editor_member is not None

        fetched_member = get_workspace_member_or_404(
            db,
            workspace_id=ids["workspace_id"],
            member_id=ids["editor_member_id"],
        )
        assert fetched_member.id == ids["editor_member_id"]

        validate_workspace_member_role_change(
            editor_member,
            actor_user_id=ids["owner_id"],
            next_role="viewer",
        )
        validate_workspace_member_removal(
            editor_member,
            actor_user_id=ids["owner_id"],
        )

        for next_role, expected_detail in (
            ("admin", "Invalid workspace role"),
            ("viewer", "Owner membership cannot be changed"),
        ):
            try:
                validate_workspace_member_role_change(
                    owner_member,
                    actor_user_id=ids["owner_id"],
                    next_role=next_role,
                )
            except HTTPException as exc:
                assert exc.status_code == 400
                assert exc.detail == expected_detail
            else:
                raise AssertionError("Expected owner role change validation to fail")

        try:
            validate_workspace_member_role_change(
                editor_member,
                actor_user_id=ids["editor_id"],
                next_role="viewer",
            )
        except HTTPException as exc:
            assert exc.status_code == 400
            assert exc.detail == "You cannot change your own workspace membership"
        else:
            raise AssertionError("Expected self role change validation to fail")

        try:
            validate_workspace_member_removal(
                owner_member,
                actor_user_id=ids["owner_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 400
            assert exc.detail == "Owner membership cannot be removed"
        else:
            raise AssertionError("Expected owner removal validation to fail")

        try:
            validate_workspace_member_removal(
                editor_member,
                actor_user_id=ids["editor_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 400
            assert exc.detail == "You cannot remove yourself from the workspace"
        else:
            raise AssertionError("Expected self removal validation to fail")

        try:
            get_workspace_member_or_404(
                db,
                workspace_id="missing-workspace",
                member_id=ids["editor_member_id"],
            )
        except HTTPException as exc:
            assert exc.status_code == 404
            assert exc.detail == "Workspace member not found"
        else:
            raise AssertionError("Expected mismatched workspace member lookup to fail")


def test_cleanup_export_archive_handles_existing_and_missing_paths(tmp_path) -> None:
    export_path = tmp_path / "cleanup-export.zip"
    export_path.write_bytes(b"zip-bytes")

    cleanup_export_archive(export_path)
    cleanup_export_archive(export_path)

    assert export_path.exists() is False
