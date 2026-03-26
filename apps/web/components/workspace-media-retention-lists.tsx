"use client";
import { WorkspaceMediaRetentionCandidatesList } from "./workspace-media-retention-candidates-list";
import { WorkspaceMediaRetentionLargestList } from "./workspace-media-retention-largest-list";
import type { WorkspaceMediaRetentionListsProps } from "./workspace-media-retention-lists.types";

export function WorkspaceMediaRetentionLists({ actionLoading, copy, locale, onToggleSelected, report, role, selectedMediaIds }: WorkspaceMediaRetentionListsProps) {
  return (
    <div className="two-column-grid" style={{ marginTop: 16 }}>
      <WorkspaceMediaRetentionLargestList copy={copy} locale={locale} report={report} />
      <WorkspaceMediaRetentionCandidatesList actionLoading={actionLoading} copy={copy} locale={locale} onToggleSelected={onToggleSelected} report={report} role={role} selectedMediaIds={selectedMediaIds} />
    </div>
  );
}
