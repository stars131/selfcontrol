"use client";

import { WorkspaceSettingsOverviewDetails } from "./workspace-settings-overview-details";
import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types";

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
      <WorkspaceSettingsOverviewDetails copy={copy} knowledgeStats={knowledgeStats} />
    </section>
  );
}
