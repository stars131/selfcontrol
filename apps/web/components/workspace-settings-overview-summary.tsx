"use client";
import type { WorkspaceSettingsOverviewSummaryProps } from "./workspace-settings-overview-summary.types";

export function WorkspaceSettingsOverviewSummary({ copy }: WorkspaceSettingsOverviewSummaryProps) {
  return (
    <>
      <div className="eyebrow">{copy.apiTitle}</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.apiDescription}</div>
    </>
  );
}
