"use client";

import { WorkspaceMediaRetentionOwnerActionsButtons } from "./workspace-media-retention-owner-actions-buttons";
import { WorkspaceMediaRetentionOwnerActionsSummary } from "./workspace-media-retention-owner-actions-summary";
import type { WorkspaceMediaRetentionOwnerActionsProps } from "./workspace-media-retention-owner-actions.types";

export function WorkspaceMediaRetentionOwnerActions({ actionLoading, archiveConfirmSelected, archiveSelectedLabel, canDeleteOrphans, canSelectAll, clearSelectionLabel, deleteOrphansLabel, deleteSelectedLabel, onArchive, onCleanupOrphans, onCleanupSelected, onClearSelection, onSelectAllCandidates, processingLabel, selectedCount, selectedSummary, selectAllLabel }: WorkspaceMediaRetentionOwnerActionsProps) {
  return (
    <div className="form-stack" style={{ marginTop: 12 }}>
      <WorkspaceMediaRetentionOwnerActionsSummary selectedCount={selectedCount} selectedSummary={selectedSummary} />
      <WorkspaceMediaRetentionOwnerActionsButtons actionLoading={actionLoading} archiveConfirmSelected={archiveConfirmSelected} archiveSelectedLabel={archiveSelectedLabel} canDeleteOrphans={canDeleteOrphans} canSelectAll={canSelectAll} clearSelectionLabel={clearSelectionLabel} deleteOrphansLabel={deleteOrphansLabel} deleteSelectedLabel={deleteSelectedLabel} onArchive={onArchive} onCleanupOrphans={onCleanupOrphans} onCleanupSelected={onCleanupSelected} onClearSelection={onClearSelection} onSelectAllCandidates={onSelectAllCandidates} processingLabel={processingLabel} selectedCount={selectedCount} selectAllLabel={selectAllLabel} />
    </div>
  );
}
