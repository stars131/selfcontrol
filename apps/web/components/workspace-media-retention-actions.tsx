"use client";

import { WorkspaceMediaRetentionEditorNotice } from "./workspace-media-retention-editor-notice";
import { WorkspaceMediaRetentionOwnerActions } from "./workspace-media-retention-owner-actions";
import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types";

export function WorkspaceMediaRetentionActions({
  actionLoading,
  archiveConfirmSelected,
  archiveSelectedLabel,
  clearSelectionLabel,
  deleteOrphansLabel,
  deleteSelectedLabel,
  editorReadOnly,
  onArchive,
  onCleanupOrphans,
  onCleanupSelected,
  onClearSelection,
  onSelectAllCandidates,
  ownerActions,
  processingLabel,
  role,
  selectedCount,
  selectedSummary,
  selectAllLabel,
  canDeleteOrphans,
  canSelectAll,
}: WorkspaceMediaRetentionActionsProps) {
  return (
    <section className="subtle-card" style={{ marginTop: 16 }}>
      <div className="eyebrow">{ownerActions}</div>
      {role === "owner" ? (
        <WorkspaceMediaRetentionOwnerActions
          actionLoading={actionLoading}
          archiveConfirmSelected={archiveConfirmSelected}
          archiveSelectedLabel={archiveSelectedLabel}
          canDeleteOrphans={canDeleteOrphans}
          canSelectAll={canSelectAll}
          clearSelectionLabel={clearSelectionLabel}
          deleteOrphansLabel={deleteOrphansLabel}
          deleteSelectedLabel={deleteSelectedLabel}
          onArchive={onArchive}
          onCleanupOrphans={onCleanupOrphans}
          onCleanupSelected={onCleanupSelected}
          onClearSelection={onClearSelection}
          onSelectAllCandidates={onSelectAllCandidates}
          processingLabel={processingLabel}
          selectedCount={selectedCount}
          selectedSummary={selectedSummary}
          selectAllLabel={selectAllLabel}
        />
      ) : (
        <WorkspaceMediaRetentionEditorNotice editorReadOnly={editorReadOnly} />
      )}
    </section>
  );
}
