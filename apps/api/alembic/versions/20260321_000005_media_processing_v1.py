"""media processing v1

Revision ID: 20260321_000005
Revises: 20260321_000004
Create Date: 2026-03-21 22:10:00
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20260321_000005"
down_revision = "20260321_000004"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("media_assets", sa.Column("storage_provider", sa.String(length=64), nullable=False, server_default="local"))
    op.add_column("media_assets", sa.Column("processing_status", sa.String(length=32), nullable=False, server_default="pending"))
    op.add_column("media_assets", sa.Column("processing_error", sa.Text(), nullable=True))
    op.add_column("media_assets", sa.Column("extracted_text", sa.Text(), nullable=True))
    op.add_column("media_assets", sa.Column("processed_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column(
        "media_assets",
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_column("media_assets", "updated_at")
    op.drop_column("media_assets", "processed_at")
    op.drop_column("media_assets", "extracted_text")
    op.drop_column("media_assets", "processing_error")
    op.drop_column("media_assets", "processing_status")
    op.drop_column("media_assets", "storage_provider")
