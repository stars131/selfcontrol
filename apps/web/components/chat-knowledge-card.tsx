"use client";

import type { KnowledgeStats } from "../lib/types";

export function ChatKnowledgeCard({
  canManageWorkspace,
  knowledgeStats,
  onReindexKnowledge,
  reindexing,
}: {
  canManageWorkspace: boolean;
  knowledgeStats: KnowledgeStats | null;
  onReindexKnowledge: () => Promise<void>;
  reindexing: boolean;
}) {
  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="eyebrow">Knowledge Base</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {knowledgeStats
          ? `${knowledgeStats.chunk_count} chunks across ${knowledgeStats.record_count} record(s)`
          : "Knowledge stats unavailable."}
      </div>
      {knowledgeStats ? (
        <div className="muted" style={{ marginTop: 8 }}>
          {knowledgeStats.embedding_provider} / {knowledgeStats.embedding_model} / dim{" "}
          {knowledgeStats.embedding_dimensions}
        </div>
      ) : null}
      {knowledgeStats?.latest_indexed_at ? (
        <div className="muted" style={{ marginTop: 8 }}>
          Updated {new Date(knowledgeStats.latest_indexed_at).toLocaleString()}
        </div>
      ) : null}
      <div className="action-row" style={{ marginTop: 12 }}>
        <button
          className="button secondary"
          disabled={reindexing || !canManageWorkspace}
          type="button"
          onClick={() => void onReindexKnowledge()}
        >
          {reindexing ? "Reindexing..." : "Rebuild knowledge index"}
        </button>
      </div>
    </div>
  );
}
