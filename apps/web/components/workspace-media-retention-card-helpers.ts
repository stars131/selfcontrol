import type { LocaleCode } from "../lib/locale";

import { getWorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy";
import type { WorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy";
import type { MediaRetentionActionResult } from "./workspace-media-retention-controller.types";
import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions";

export function buildWorkspaceMediaRetentionCopyBundle(locale: LocaleCode): {
  copy: WorkspaceMediaRetentionCopy;
  remoteMediaLabel: string;
  remoteReferenceLabel: string;
} {
  const copy = getWorkspaceMediaRetentionCopy(locale);

  return {
    copy,
    remoteMediaLabel: copy.remoteMedia ?? "Remote media",
    remoteReferenceLabel: copy.remoteReference ?? "Remote reference",
  };
}

export function buildWorkspaceMediaRetentionControllerInput({
  actionFailedMessage,
  allHealthyLabel,
  loadFailedMessage,
  missingFilesLabel,
  orphanFilesLabel,
  remoteMediaLabel,
  token,
  workspaceId,
}: {
  actionFailedMessage: string;
  allHealthyLabel: string;
  loadFailedMessage: string;
  missingFilesLabel: string;
  orphanFilesLabel: string;
  remoteMediaLabel: string;
  token: string;
  workspaceId: string;
}) {
  return {
    token,
    workspaceId,
    remoteMediaLabel,
    missingFilesLabel,
    orphanFilesLabel,
    allHealthyLabel,
    loadFailedMessage,
    actionFailedMessage,
  };
}

export function buildWorkspaceMediaRetentionActionMessage({
  actionResult,
  archiveCompleted,
  cleanupCompleted,
}: {
  actionResult: MediaRetentionActionResult | null;
  archiveCompleted: string;
  cleanupCompleted: string;
}) {
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
}: {
  actionLoading: boolean;
  clearSelection: () => void;
  copy: WorkspaceMediaRetentionCopy;
  handleArchive: WorkspaceMediaRetentionActionsProps["onArchive"];
  handleCleanup: (input: {
    mediaIds: string[];
    purgeOrphanFiles: boolean;
    confirmMessage: string;
  }) => Promise<void>;
  report: {
    orphan_file_count?: number;
    retention_candidates: Array<{ media_id: string }>;
  } | null;
  role: WorkspaceMediaRetentionActionsProps["role"];
  selectAllCandidates: () => void;
  selectedMediaIds: string[];
}): WorkspaceMediaRetentionActionsProps {
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
