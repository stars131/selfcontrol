"use client";

import { createWorkspaceMediaRetentionExecutionActions } from "./workspace-media-retention-execution-actions";
import { createWorkspaceMediaRetentionSelectionActions } from "./workspace-media-retention-selection-actions";
import type { CreateWorkspaceMediaRetentionControllerActionsInput } from "./workspace-media-retention-controller-actions.types";

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
}: CreateWorkspaceMediaRetentionControllerActionsInput) {
  const selectionActions = createWorkspaceMediaRetentionSelectionActions({
    report,
    setSelectedMediaIds,
  });
  const executionActions = createWorkspaceMediaRetentionExecutionActions({
    actionFailedMessage,
    loadReport,
    olderThanDays,
    selectedMediaIds,
    setActionError,
    setActionLoading,
    setActionResult,
    token,
    workspaceId,
  });

  return {
    ...selectionActions,
    ...executionActions,
  };
}
