"use client";
import type { WorkspaceMediaRetentionOwnerActionsButtonsProps } from "./workspace-media-retention-owner-actions-buttons.types";

export function WorkspaceMediaRetentionOwnerActionsButtons({ actionLoading, archiveConfirmSelected, archiveSelectedLabel, canDeleteOrphans, canSelectAll, clearSelectionLabel, deleteOrphansLabel, deleteSelectedLabel, onArchive, onCleanupOrphans, onCleanupSelected, onClearSelection, onSelectAllCandidates, processingLabel, selectedCount, selectAllLabel }: WorkspaceMediaRetentionOwnerActionsButtonsProps) {
  return (
    <div className="action-row">
      <button className="button secondary" disabled={actionLoading || !canSelectAll} type="button" onClick={onSelectAllCandidates}>{selectAllLabel}</button>
      <button className="button secondary" disabled={actionLoading || !selectedCount} type="button" onClick={onClearSelection}>{clearSelectionLabel}</button>
      <button className="button secondary" disabled={actionLoading || !selectedCount} type="button" onClick={() => void onArchive(archiveConfirmSelected)}>{actionLoading ? processingLabel : archiveSelectedLabel}</button>
      <button className="button secondary" disabled={actionLoading || !selectedCount} type="button" onClick={() => void onCleanupSelected()}>{actionLoading ? processingLabel : deleteSelectedLabel}</button>
      <button className="button secondary" disabled={actionLoading || !canDeleteOrphans} type="button" onClick={() => void onCleanupOrphans()}>{actionLoading ? processingLabel : deleteOrphansLabel}</button>
    </div>
  );
}
