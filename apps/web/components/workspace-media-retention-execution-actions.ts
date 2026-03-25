"use client";

import { archiveMediaRetention, cleanupMediaRetention } from "../lib/api";
import { getWorkspaceMediaRetentionActionErrorMessage } from "./workspace-media-retention-controller-helpers";
import type { CreateWorkspaceMediaRetentionExecutionActionsInput } from "./workspace-media-retention-execution-actions.types";
import type {
  WorkspaceMediaRetentionCleanupInput,
} from "./workspace-media-retention-controller.types";

export function createWorkspaceMediaRetentionExecutionActions({
  actionFailedMessage,
  loadReport,
  olderThanDays,
  selectedMediaIds,
  setActionError,
  setActionLoading,
  setActionResult,
  token,
  workspaceId,
}: CreateWorkspaceMediaRetentionExecutionActionsInput) {
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
    handleArchive,
    handleCleanup,
  };
}
