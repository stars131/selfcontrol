"use client";
import {
  buildWorkspaceMediaRetentionActionMessage,
  buildWorkspaceMediaRetentionActionsProps,
  buildWorkspaceMediaRetentionControllerInput,
  buildWorkspaceMediaRetentionCopyBundle,
} from "./workspace-media-retention-card-helpers";
import type { WorkspaceMediaRetentionCardProps } from "./workspace-media-retention-card.types";
import { WorkspaceMediaRetentionContent } from "./workspace-media-retention-content";
import { useWorkspaceMediaRetentionController } from "./use-workspace-media-retention-controller";

export function WorkspaceMediaRetentionCard({ token, workspaceId, locale, role }: WorkspaceMediaRetentionCardProps) {
  const { copy, remoteMediaLabel } = buildWorkspaceMediaRetentionCopyBundle(locale);
  const {
    olderThanDays,
    report,
    loading,
    error,
    selectedMediaIds,
    actionLoading,
    actionError,
    actionResult,
    storageRiskLabel,
    setOlderThanDays,
    loadReport,
    toggleSelectedMedia,
    selectAllCandidates,
    clearSelection,
    handleArchive,
    handleCleanup,
  } = useWorkspaceMediaRetentionController(buildWorkspaceMediaRetentionControllerInput({
    actionFailedMessage: copy.actionFailed,
    allHealthyLabel: copy.allHealthy,
    loadFailedMessage: copy.loadFailed,
    missingFilesLabel: copy.missingFiles,
    orphanFilesLabel: copy.orphanFiles,
    remoteMediaLabel,
    token,
    workspaceId,
  }));
  const actionMessage = buildWorkspaceMediaRetentionActionMessage({
    actionResult,
    archiveCompleted: copy.archiveCompleted,
    cleanupCompleted: copy.cleanupCompleted,
  });
  const actionProps = buildWorkspaceMediaRetentionActionsProps({
    actionLoading,
    clearSelection,
    copy,
    handleArchive,
    handleCleanup,
    report,
    role,
    selectAllCandidates,
    selectedMediaIds,
  });

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <WorkspaceMediaRetentionContent
        actionProps={actionProps}
        headerProps={{ copy, loading, olderThanDays, onOlderThanDaysChange: setOlderThanDays, onRefresh: async () => loadReport(olderThanDays) }}
        listsProps={{ actionLoading, copy, locale, onToggleSelected: toggleSelectedMedia, report, role, selectedMediaIds }}
        noticesProps={{ actionError, actionMessage, error }}
        summaryProps={{ copy, remoteMediaLabel, report, storageRiskLabel }}
      />
    </section>
  );
}
