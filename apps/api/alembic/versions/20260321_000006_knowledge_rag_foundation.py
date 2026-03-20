"""add knowledge rag foundation

Revision ID: 20260321_000006
Revises: 20260321_000005
Create Date: 2026-03-21 17:30:00.000000
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260321_000006"
down_revision: str | None = "20260321_000005"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "knowledge_chunks",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("workspace_id", sa.String(length=36), nullable=False),
        sa.Column("record_id", sa.String(length=36), nullable=False),
        sa.Column("media_id", sa.String(length=36), nullable=True),
        sa.Column("source_type", sa.String(length=32), nullable=False),
        sa.Column("source_label", sa.String(length=255), nullable=False),
        sa.Column("chunk_index", sa.Integer(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("content_hash", sa.String(length=64), nullable=False),
        sa.Column("embedding_provider", sa.String(length=64), nullable=False, server_default="local"),
        sa.Column("embedding_model", sa.String(length=128), nullable=False, server_default="hash-embedding-v1"),
        sa.Column("embedding_dimensions", sa.Integer(), nullable=False, server_default="256"),
        sa.Column("embedding_vector", sa.JSON(), nullable=False),
        sa.Column("metadata_json", sa.JSON(), nullable=False, server_default=sa.text("'{}'")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["media_id"], ["media_assets.id"]),
        sa.ForeignKeyConstraint(["record_id"], ["records.id"]),
        sa.ForeignKeyConstraint(["workspace_id"], ["workspaces.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_knowledge_chunks_workspace_id", "knowledge_chunks", ["workspace_id"], unique=False)
    op.create_index("ix_knowledge_chunks_record_id", "knowledge_chunks", ["record_id"], unique=False)
    op.create_index("ix_knowledge_chunks_media_id", "knowledge_chunks", ["media_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_knowledge_chunks_media_id", table_name="knowledge_chunks")
    op.drop_index("ix_knowledge_chunks_record_id", table_name="knowledge_chunks")
    op.drop_index("ix_knowledge_chunks_workspace_id", table_name="knowledge_chunks")
    op.drop_table("knowledge_chunks")
