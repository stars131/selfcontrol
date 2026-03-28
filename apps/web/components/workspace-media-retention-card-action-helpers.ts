import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types";
import type {
  BuildWorkspaceMediaRetentionActionMessageInput,
  BuildWorkspaceMediaRetentionActionsPropsInput,
} from "./workspace-media-retention-card-action-helpers.types";

export function buildWorkspaceMediaRetentionActionMessage(
  input: BuildWorkspaceMediaRetentionActionMessageInput,
) {
  if (input.actionResult?.kind === "archive") {
    return `${input.archiveCompleted}: ${input.actionResult.result.candidate_media_count} / ${input.actionResult.result.candidate_media_size_label}`;
  }

  if (input.actionResult?.kind === "cleanup") {
    return `${input.cleanupCompleted}: ${input.actionResult.result.candidate_media_count} / ${input.actionResult.result.candidate_media_size_label}, ${input.actionResult.result.orphan_file_count} / ${input.actionResult.result.orphan_file_size_label}`;
  }

  return "";
}

export function buildWorkspaceMediaRetentionActionsProps(
  input: BuildWorkspaceMediaRetentionActionsPropsInput,
): WorkspaceMediaRetentionActionsProps {
  return {
    actionLoading: input.actionLoading,
    archiveConfirmSelected: input.copy.archiveConfirmSelected,
    archiveSelectedLabel: input.copy.archiveSelected,
    canDeleteOrphans: Boolean(input.report?.orphan_file_count),
    canSelectAll: Boolean(input.report?.retention_candidates.length),
    clearSelectionLabel: input.copy.clearSelection,
    deleteOrphansLabel: input.copy.deleteOrphans,
    deleteSelectedLabel: input.copy.deleteSelected,
    editorReadOnly: input.copy.editorReadOnly,
    onArchive: input.handleArchive,
    onCleanupOrphans: () =>
      input.handleCleanup({
        mediaIds: [],
        purgeOrphanFiles: true,
        confirmMessage: input.copy.cleanupConfirmOrphans,
      }),
    onCleanupSelected: () =>
      input.handleCleanup({
        mediaIds: input.selectedMediaIds,
        purgeOrphanFiles: false,
        confirmMessage: input.copy.cleanupConfirmSelected,
      }),
    onClearSelection: input.clearSelection,
    onSelectAllCandidates: input.selectAllCandidates,
    ownerActions: input.copy.ownerActions,
    processingLabel: input.copy.processing,
    role: input.role,
    selectedCount: input.selectedMediaIds.length,
    selectedSummary: input.copy.selectedSummary,
    selectAllLabel: input.copy.selectAll,
  };
}
