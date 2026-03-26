"use client";
import type { WorkspaceMediaRetentionOwnerActionsSummaryProps } from "./workspace-media-retention-owner-actions-summary.types";

export function WorkspaceMediaRetentionOwnerActionsSummary({ selectedCount, selectedSummary }: WorkspaceMediaRetentionOwnerActionsSummaryProps) {
  return <div className="muted">{selectedSummary}: {selectedCount}</div>;
}
