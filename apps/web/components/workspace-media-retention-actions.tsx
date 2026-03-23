"use client";

export type WorkspaceMediaRetentionActionsProps = {
  actionLoading: boolean;
  archiveConfirmSelected: string;
  archiveSelectedLabel: string;
  canDeleteOrphans: boolean;
  canSelectAll: boolean;
  clearSelectionLabel: string;
  deleteOrphansLabel: string;
  deleteSelectedLabel: string;
  editorReadOnly: string;
  onArchive: (confirmMessage: string) => Promise<void>;
  onCleanupOrphans: () => Promise<void>;
  onCleanupSelected: () => Promise<void>;
  onClearSelection: () => void;
  onSelectAllCandidates: () => void;
  ownerActions: string;
  processingLabel: string;
  role: "owner" | "editor";
  selectedCount: number;
  selectedSummary: string;
  selectAllLabel: string;
};

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
