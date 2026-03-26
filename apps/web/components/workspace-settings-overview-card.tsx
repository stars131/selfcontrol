"use client";

import { WorkspaceSettingsOverviewDetails } from "./workspace-settings-overview-details";
import { WorkspaceSettingsOverviewSummary } from "./workspace-settings-overview-summary";
import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types";

export function WorkspaceSettingsOverviewCard({ copy, knowledgeStats }: WorkspaceSettingsOverviewCardProps) {
  return (
    <section className="record-card">
      <WorkspaceSettingsOverviewSummary copy={copy} />
      <WorkspaceSettingsOverviewDetails copy={copy} knowledgeStats={knowledgeStats} />
    </section>
  );
}
