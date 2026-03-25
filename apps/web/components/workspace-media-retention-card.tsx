"use client";

import { MediaRetentionItemCard } from "./media-retention-item-card";
import { WorkspaceMediaRetentionActions } from "./workspace-media-retention-actions";
import {
  buildWorkspaceMediaRetentionActionMessage,
  buildWorkspaceMediaRetentionActionsProps,
  buildWorkspaceMediaRetentionControllerInput,
  buildWorkspaceMediaRetentionCopyBundle,
} from "./workspace-media-retention-card-helpers";
import type { WorkspaceMediaRetentionCardProps } from "./workspace-media-retention-card.types";
import { WorkspaceMediaRetentionHeader } from "./workspace-media-retention-header";
import { WorkspaceMediaRetentionLists } from "./workspace-media-retention-lists";
import { WorkspaceMediaRetentionNotices } from "./workspace-media-retention-notices";
import { WorkspaceMediaRetentionSummary } from "./workspace-media-retention-summary";
import {
  useWorkspaceMediaRetentionController,
} from "./use-workspace-media-retention-controller";

export function WorkspaceMediaRetentionCard({
  token,
  workspaceId,
  locale,
  role,
}: WorkspaceMediaRetentionCardProps) {
  const { copy, remoteMediaLabel, remoteReferenceLabel } = buildWorkspaceMediaRetentionCopyBundle(locale);
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
      <WorkspaceMediaRetentionHeader
        copy={copy}
        loading={loading}
        olderThanDays={olderThanDays}
        onOlderThanDaysChange={setOlderThanDays}
        onRefresh={() => loadReport(olderThanDays)}
      />

      <WorkspaceMediaRetentionNotices
        actionError={actionError}
        actionMessage={actionMessage}
        error={error}
      />

      <WorkspaceMediaRetentionSummary
        copy={copy}
        remoteMediaLabel={remoteMediaLabel}
        report={report}
        storageRiskLabel={storageRiskLabel}
      />

      <WorkspaceMediaRetentionActions {...actionProps} />

      <WorkspaceMediaRetentionLists
        actionLoading={actionLoading}
        copy={copy}
        locale={locale}
        onToggleSelected={toggleSelectedMedia}
        report={report}
        role={role}
        selectedMediaIds={selectedMediaIds}
      />
    </section>
  );
}
