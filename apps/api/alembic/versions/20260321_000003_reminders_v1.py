"""reminders v1

Revision ID: 20260321_000003
Revises: 20260320_000002
Create Date: 2026-03-21 20:30:00
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20260321_000003"
down_revision = "20260320_000002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "reminders",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("workspace_id", sa.String(length=36), sa.ForeignKey("workspaces.id"), nullable=False),
        sa.Column("record_id", sa.String(length=36), sa.ForeignKey("records.id"), nullable=False),
        sa.Column("created_by", sa.String(length=36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("channel_code", sa.String(length=32), nullable=False, server_default="in_app"),
        sa.Column("title", sa.String(length=255), nullable=True),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("remind_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="pending"),
        sa.Column("is_enabled", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("delivered_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("cancelled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("metadata_json", sa.JSON(), nullable=False, server_default=sa.text("'{}'")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_reminders_workspace_record", "reminders", ["workspace_id", "record_id"])
    op.create_index("ix_reminders_remind_at", "reminders", ["remind_at"])


def downgrade() -> None:
    op.drop_index("ix_reminders_remind_at", table_name="reminders")
    op.drop_index("ix_reminders_workspace_record", table_name="reminders")
    op.drop_table("reminders")
