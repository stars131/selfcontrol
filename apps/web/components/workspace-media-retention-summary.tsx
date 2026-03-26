"use client";

import { WorkspaceMediaRetentionSummaryGrid } from "./workspace-media-retention-summary-grid";
import { WorkspaceMediaRetentionSummaryNote } from "./workspace-media-retention-summary-note";
import type { WorkspaceMediaRetentionSummaryProps } from "./workspace-media-retention-summary.types";

export function WorkspaceMediaRetentionSummary({ copy, remoteMediaLabel, report, storageRiskLabel }: WorkspaceMediaRetentionSummaryProps) {
  return (
    <>
      <WorkspaceMediaRetentionSummaryGrid copy={copy} remoteMediaLabel={remoteMediaLabel} report={report} storageRiskLabel={storageRiskLabel} />
      <WorkspaceMediaRetentionSummaryNote copy={copy} report={report} />
    </>
  );
}
