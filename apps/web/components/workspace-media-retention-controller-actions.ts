"use client";

import { createWorkspaceMediaRetentionExecutionActions } from "./workspace-media-retention-execution-actions";
import { createWorkspaceMediaRetentionSelectionActions } from "./workspace-media-retention-selection-actions";
import type {
  UseWorkspaceMediaRetentionControllerProps,
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
