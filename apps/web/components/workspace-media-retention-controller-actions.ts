"use client";

import { archiveMediaRetention, cleanupMediaRetention } from "../lib/api";
import { getWorkspaceMediaRetentionActionErrorMessage } from "./workspace-media-retention-controller-helpers";
import type {
  UseWorkspaceMediaRetentionControllerProps,
  WorkspaceMediaRetentionCleanupInput,
  WorkspaceMediaRetentionControllerState,
} from "./workspace-media-retention-controller.types";

export function createWorkspaceMediaRetentionControllerActions({
  actionFailedMessage,
  loadReport,
  olderThanDays,
  report,
  selectedMediaIds,
  setActionError,
  setActionLoading,
  setActionResult,
  setSelectedMediaIds,
  token,
  workspaceId,
}: Pick<
  UseWorkspaceMediaRetentionControllerProps,
  "actionFailedMessage" | "token" | "workspaceId"
> &
  Pick<
    WorkspaceMediaRetentionControllerState,
    | "olderThanDays"
    | "report"
    | "selectedMediaIds"
    | "setActionError"
    | "setActionLoading"
    | "setActionResult"
    | "setSelectedMediaIds"
  > & {
    loadReport: (threshold: number) => Promise<void>;
  }) {
  function toggleSelectedMedia(mediaId: string) {
    setSelectedMediaIds((current) =>
      current.includes(mediaId)
        ? current.filter((item) => item !== mediaId)
        : [...current, mediaId],
    );
  }

  function selectAllCandidates() {
    setSelectedMediaIds(report?.retention_candidates.map((item) => item.media_id) ?? []);
  }

  function clearSelection() {
    setSelectedMediaIds([]);
  }

  async function handleArchive(confirmMessage: string) {
    if (!selectedMediaIds.length || !window.confirm(confirmMessage)) {
      return;
    }
    setActionLoading(true);
    setActionError("");
    try {
      const result = await archiveMediaRetention(token, workspaceId, {
        mediaIds: selectedMediaIds,
        olderThanDays,
        dryRun: false,
      });
      setActionResult({ kind: "archive", result: result.result });
      await loadReport(olderThanDays);
    } catch (caught) {
      setActionError(
        getWorkspaceMediaRetentionActionErrorMessage(caught, actionFailedMessage),
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCleanup({
    mediaIds,
    purgeOrphanFiles,
    confirmMessage,
  }: WorkspaceMediaRetentionCleanupInput) {
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setActionLoading(true);
    setActionError("");
    try {
      const result = await cleanupMediaRetention(token, workspaceId, {
        mediaIds,
        olderThanDays,
        purgeOrphanFiles,
        dryRun: false,
      });
      setActionResult({ kind: "cleanup", result: result.result });
      await loadReport(olderThanDays);
    } catch (caught) {
      setActionError(
        getWorkspaceMediaRetentionActionErrorMessage(caught, actionFailedMessage),
      );
    } finally {
      setActionLoading(false);
    }
  }

  return {
    toggleSelectedMedia,
    selectAllCandidates,
    clearSelection,
    handleArchive,
    handleCleanup,
  };
}
