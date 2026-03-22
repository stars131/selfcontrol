"use client";

import type { LocaleCode } from "../lib/locale";
import { getWorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy";
import { MediaRetentionItemCard } from "./media-retention-item-card";
import { WorkspaceMediaRetentionActions } from "./workspace-media-retention-actions";
import { WorkspaceMediaRetentionHeader } from "./workspace-media-retention-header";
import { WorkspaceMediaRetentionLists } from "./workspace-media-retention-lists";
import { WorkspaceMediaRetentionSummary } from "./workspace-media-retention-summary";
import {
  useWorkspaceMediaRetentionController,
} from "./use-workspace-media-retention-controller";

export function WorkspaceMediaRetentionCard({
  token,
  workspaceId,
  locale,
  role,
}: {
  token: string;
  workspaceId: string;
  locale: LocaleCode;
  role: "owner" | "editor";
}) {
  const copy = getWorkspaceMediaRetentionCopy(locale);
  const remoteMediaLabel = copy.remoteMedia ?? "Remote media";
  const remoteReferenceLabel = copy.remoteReference ?? "Remote reference";
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
  } = useWorkspaceMediaRetentionController({
    token,
    workspaceId,
    remoteMediaLabel,
    missingFilesLabel: copy.missingFiles,
    orphanFilesLabel: copy.orphanFiles,
    allHealthyLabel: copy.allHealthy,
    loadFailedMessage: copy.loadFailed,
    actionFailedMessage: copy.actionFailed,
  });

  const actionMessage =
    actionResult?.kind === "archive"
      ? `${copy.archiveCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}`
      : actionResult?.kind === "cleanup"
        ? `${copy.cleanupCompleted}: ${actionResult.result.candidate_media_count} / ${actionResult.result.candidate_media_size_label}, ${actionResult.result.orphan_file_count} / ${actionResult.result.orphan_file_size_label}`
        : "";

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <WorkspaceMediaRetentionHeader
        copy={copy}
        loading={loading}
        olderThanDays={olderThanDays}
        onOlderThanDaysChange={setOlderThanDays}
        onRefresh={() => loadReport(olderThanDays)}
      />

      {error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null}
      {actionError ? <div className="notice error" style={{ marginTop: 16 }}>{actionError}</div> : null}
      {actionMessage ? <div className="notice" style={{ marginTop: 16 }}>{actionMessage}</div> : null}

      <WorkspaceMediaRetentionSummary
        copy={copy}
        remoteMediaLabel={remoteMediaLabel}
        report={report}
        storageRiskLabel={storageRiskLabel}
      />

      <WorkspaceMediaRetentionActions
        actionLoading={actionLoading}
        archiveConfirmSelected={copy.archiveConfirmSelected}
        archiveSelectedLabel={copy.archiveSelected}
        canDeleteOrphans={Boolean(report?.orphan_file_count)}
        canSelectAll={Boolean(report?.retention_candidates.length)}
        clearSelectionLabel={copy.clearSelection}
        deleteOrphansLabel={copy.deleteOrphans}
        deleteSelectedLabel={copy.deleteSelected}
        editorReadOnly={copy.editorReadOnly}
        onArchive={handleArchive}
        onCleanupOrphans={() =>
          handleCleanup({
            mediaIds: [],
            purgeOrphanFiles: true,
            confirmMessage: copy.cleanupConfirmOrphans,
          })
        }
        onCleanupSelected={() =>
          handleCleanup({
            mediaIds: selectedMediaIds,
            purgeOrphanFiles: false,
            confirmMessage: copy.cleanupConfirmSelected,
          })
        }
        onClearSelection={clearSelection}
        onSelectAllCandidates={selectAllCandidates}
        ownerActions={copy.ownerActions}
        processingLabel={copy.processing}
        role={role}
        selectedCount={selectedMediaIds.length}
        selectedSummary={copy.selectedSummary}
        selectAllLabel={copy.selectAll}
      />

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
