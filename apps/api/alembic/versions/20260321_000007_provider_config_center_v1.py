"""add provider config center v1

Revision ID: 20260321_000007
Revises: 20260321_000006
Create Date: 2026-03-21 18:30:00.000000
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260321_000007"
down_revision: str | None = "20260321_000006"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "provider_configs",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("workspace_id", sa.String(length=36), nullable=False),
        sa.Column("feature_code", sa.String(length=64), nullable=False),
        sa.Column("provider_code", sa.String(length=64), nullable=False, server_default="none"),
        sa.Column("model_name", sa.String(length=128), nullable=True),
        sa.Column("is_enabled", sa.Boolean(), nullable=False, server_default=sa.text("0")),
        sa.Column("api_base_url", sa.String(length=255), nullable=True),
        sa.Column("api_key_env_name", sa.String(length=128), nullable=True),
        sa.Column("options_json", sa.JSON(), nullable=False, server_default=sa.text("'{}'")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["workspace_id"], ["workspaces.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("workspace_id", "feature_code", name="uq_provider_configs_workspace_feature"),
    )
    op.create_index("ix_provider_configs_workspace_id", "provider_configs", ["workspace_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_provider_configs_workspace_id", table_name="provider_configs")
    op.drop_table("provider_configs")
