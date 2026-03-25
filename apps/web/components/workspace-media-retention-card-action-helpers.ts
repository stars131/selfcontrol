import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types";
import type {
  BuildWorkspaceMediaRetentionActionMessageInput,
  BuildWorkspaceMediaRetentionActionsPropsInput,
} from "./workspace-media-retention-card-action-helpers.types";

export function buildWorkspaceMediaRetentionActionMessage({
  actionResult,
  archiveCompleted,
  cleanupCompleted,
}: BuildWorkspaceMediaRetentionActionMessageInput) {
  if (actionResult?.kind === "archive") {
    return `${archiveCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}`;
  }

  if (actionResult?.kind === "cleanup") {
    return `${cleanupCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}, ${actionResult.result.orphan_file_count} / ${actionResult.result.orphan_file_size_label}`;
  }

  return "";
}

export function buildWorkspaceMediaRetentionActionsProps({
  actionLoading,
  clearSelection,
  copy,
  handleArchive,
  handleCleanup,
  report,
  role,
  selectAllCandidates,
  selectedMediaIds,
}: BuildWorkspaceMediaRetentionActionsPropsInput): WorkspaceMediaRetentionActionsProps {
  return {
    actionLoading,
    archiveConfirmSelected: copy.archiveConfirmSelected,
    archiveSelectedLabel: copy.archiveSelected,
    canDeleteOrphans: Boolean(report?.orphan_file_count),
    canSelectAll: Boolean(report?.retention_candidates.length),
    clearSelectionLabel: copy.clearSelection,
    deleteOrphansLabel: copy.deleteOrphans,
    deleteSelectedLabel: copy.deleteSelected,
    editorReadOnly: copy.editorReadOnly,
    onArchive: handleArchive,
    onCleanupOrphans: () =>
      handleCleanup({
        mediaIds: [],
        purgeOrphanFiles: true,
        confirmMessage: copy.cleanupConfirmOrphans,
      }),
    onCleanupSelected: () =>
      handleCleanup({
        mediaIds: selectedMediaIds,
        purgeOrphanFiles: false,
        confirmMessage: copy.cleanupConfirmSelected,
      }),
    onClearSelection: clearSelection,
    onSelectAllCandidates: selectAllCandidates,
    ownerActions: copy.ownerActions,
    processingLabel: copy.processing,
    role,
    selectedCount: selectedMediaIds.length,
    selectedSummary: copy.selectedSummary,
    selectAllLabel: copy.selectAll,
  };
}
