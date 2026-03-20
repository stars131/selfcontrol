"""notification events v1

Revision ID: 20260321_000004
Revises: 20260321_000003
Create Date: 2026-03-21 21:05:00
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20260321_000004"
down_revision = "20260321_000003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "notification_events",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("workspace_id", sa.String(length=36), sa.ForeignKey("workspaces.id"), nullable=False),
        sa.Column("user_id", sa.String(length=36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("reminder_id", sa.String(length=36), sa.ForeignKey("reminders.id"), nullable=True),
        sa.Column("record_id", sa.String(length=36), sa.ForeignKey("records.id"), nullable=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("event_type", sa.String(length=32), nullable=False, server_default="reminder_due"),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="unread"),
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("read_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("metadata_json", sa.JSON(), nullable=False, server_default=sa.text("'{}'")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_notification_events_workspace_user", "notification_events", ["workspace_id", "user_id"])
    op.create_index("ix_notification_events_created_at", "notification_events", ["created_at"])


def downgrade() -> None:
    op.drop_index("ix_notification_events_created_at", table_name="notification_events")
    op.drop_index("ix_notification_events_workspace_user", table_name="notification_events")
    op.drop_table("notification_events")
