"use client";

import type { KnowledgeStats } from "../lib/types";
import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";

type WorkspaceSettingsOverviewCardProps = {
  copy: WorkspaceSettingsCopy;
  knowledgeStats: KnowledgeStats | null;
};

export function WorkspaceSettingsOverviewCard({
  copy,
  knowledgeStats,
}: WorkspaceSettingsOverviewCardProps) {
  return (
    <section className="record-card">
      <div className="eyebrow">{copy.apiTitle}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
        {copy.apiDescription}
      </div>
      <div className="detail-grid" style={{ marginTop: 16 }}>
        <div className="subtle-card">
          <div className="eyebrow">{copy.apiBaseLabel}</div>
          <div style={{ marginTop: 8, wordBreak: "break-all", fontWeight: 600 }}>
            {process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1"}
          </div>
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{copy.mapKeyLabel}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {process.env.NEXT_PUBLIC_AMAP_KEY ? copy.mapKeyReady : copy.mapKeyMissing}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            {copy.browserKeyNote}
          </div>
        </div>
        <div className="subtle-card">
          <div className="eyebrow">{copy.knowledgeTitle}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {knowledgeStats
              ? `${knowledgeStats.chunk_count} chunks / ${knowledgeStats.record_count} records`
              : "-"}
          </div>
        </div>
      </div>
    </section>
  );
}
