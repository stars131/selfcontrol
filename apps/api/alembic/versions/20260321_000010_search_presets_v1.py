"""add search presets v1

Revision ID: 20260321_000010
Revises: 20260321_000009
Create Date: 2026-03-21 22:20:00.000000
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260321_000010"
down_revision: str | None = "20260321_000009"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "search_presets",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("workspace_id", sa.String(length=36), nullable=False),
        sa.Column("created_by", sa.String(length=36), nullable=False),
        sa.Column("name", sa.String(length=128), nullable=False),
        sa.Column("filters_json", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["workspace_id"], ["workspaces.id"]),
        sa.ForeignKeyConstraint(["created_by"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_search_presets_workspace_id", "search_presets", ["workspace_id"], unique=False)
    op.create_index("ix_search_presets_created_by", "search_presets", ["created_by"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_search_presets_created_by", table_name="search_presets")
    op.drop_index("ix_search_presets_workspace_id", table_name="search_presets")
    op.drop_table("search_presets")
