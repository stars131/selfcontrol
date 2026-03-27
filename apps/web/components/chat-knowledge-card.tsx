"use client";

import { useStoredLocale } from "../lib/locale";
import { getChatPanelDisplayCopy } from "./chat-panel-display-copy";
import type { ChatKnowledgeCardProps } from "./chat-knowledge-card.types";

export function ChatKnowledgeCard({
  canManageWorkspace,
  knowledgeStats,
  onReindexKnowledge,
  reindexing,
}: ChatKnowledgeCardProps) {
  const { locale } = useStoredLocale();
  const copy = getChatPanelDisplayCopy(locale);

  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="eyebrow">{copy.knowledgeEyebrow}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {knowledgeStats
          ? `${knowledgeStats.chunk_count} ${copy.knowledgeChunkLabel} / ${knowledgeStats.record_count} ${copy.knowledgeRecordLabel}`
          : copy.knowledgeUnavailable}
      </div>
      {knowledgeStats ? (
        <div className="muted" style={{ marginTop: 8 }}>
          {knowledgeStats.embedding_provider} / {knowledgeStats.embedding_model} / {copy.knowledgeDimensionLabel}{" "}
          {knowledgeStats.embedding_dimensions}
        </div>
      ) : null}
      {knowledgeStats?.latest_indexed_at ? (
        <div className="muted" style={{ marginTop: 8 }}>
          {copy.knowledgeUpdatedPrefix} {new Date(knowledgeStats.latest_indexed_at).toLocaleString(locale)}
        </div>
      ) : null}
      <div className="action-row" style={{ marginTop: 12 }}>
        <button
          className="button secondary"
          disabled={reindexing || !canManageWorkspace}
          type="button"
          onClick={() => void onReindexKnowledge()}
        >
          {reindexing ? copy.knowledgeReindexingLabel : copy.knowledgeReindexLabel}
        </button>
      </div>
    </div>
  );
}
