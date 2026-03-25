"use client";

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
        <div className="form-stack" style={{ marginTop: 12 }}>
          <div className="muted">{selectedSummary}: {selectedCount}</div>
          <div className="action-row">
            <button
              className="button secondary"
              disabled={actionLoading || !canSelectAll}
              type="button"
              onClick={onSelectAllCandidates}
            >
              {selectAllLabel}
            </button>
            <button
              className="button secondary"
              disabled={actionLoading || !selectedCount}
              type="button"
              onClick={onClearSelection}
            >
              {clearSelectionLabel}
            </button>
            <button
              className="button secondary"
              disabled={actionLoading || !selectedCount}
              type="button"
              onClick={() => void onArchive(archiveConfirmSelected)}
            >
              {actionLoading ? processingLabel : archiveSelectedLabel}
            </button>
            <button
              className="button secondary"
              disabled={actionLoading || !selectedCount}
              type="button"
              onClick={() => void onCleanupSelected()}
            >
              {actionLoading ? processingLabel : deleteSelectedLabel}
            </button>
            <button
              className="button secondary"
              disabled={actionLoading || !canDeleteOrphans}
              type="button"
              onClick={() => void onCleanupOrphans()}
            >
              {actionLoading ? processingLabel : deleteOrphansLabel}
            </button>
          </div>
        </div>
      ) : (
        <div className="notice" style={{ marginTop: 12 }}>{editorReadOnly}</div>
      )}
    </section>
  );
}
