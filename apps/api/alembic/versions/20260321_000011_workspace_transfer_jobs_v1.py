"""add workspace transfer jobs v1

Revision ID: 20260321_000011
Revises: 20260321_000010
Create Date: 2026-03-21 23:55:00.000000
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260321_000011"
down_revision: str | None = "20260321_000010"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "workspace_transfer_jobs",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("workspace_id", sa.String(length=36), nullable=True),
        sa.Column("created_by", sa.String(length=36), nullable=False),
        sa.Column("job_type", sa.String(length=32), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("payload_json", sa.JSON(), nullable=False),
        sa.Column("result_json", sa.JSON(), nullable=False),
        sa.Column("artifact_path", sa.String(length=1024), nullable=True),
        sa.Column("artifact_filename", sa.String(length=255), nullable=True),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(["workspace_id"], ["workspaces.id"]),
        sa.ForeignKeyConstraint(["created_by"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_workspace_transfer_jobs_workspace_id", "workspace_transfer_jobs", ["workspace_id"], unique=False)
    op.create_index("ix_workspace_transfer_jobs_created_by", "workspace_transfer_jobs", ["created_by"], unique=False)
    op.create_index("ix_workspace_transfer_jobs_job_type", "workspace_transfer_jobs", ["job_type"], unique=False)
    op.create_index("ix_workspace_transfer_jobs_status", "workspace_transfer_jobs", ["status"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_workspace_transfer_jobs_status", table_name="workspace_transfer_jobs")
    op.drop_index("ix_workspace_transfer_jobs_job_type", table_name="workspace_transfer_jobs")
    op.drop_index("ix_workspace_transfer_jobs_created_by", table_name="workspace_transfer_jobs")
    op.drop_index("ix_workspace_transfer_jobs_workspace_id", table_name="workspace_transfer_jobs")
    op.drop_table("workspace_transfer_jobs")
