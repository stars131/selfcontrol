"use client";

import { bulkRetryMediaDeadLetter } from "../lib/api";
import type { WorkspaceShellBulkRetryInput } from "./workspace-shell-action-inputs.types";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import { refreshWorkspaceShellMediaMutation } from "./workspace-shell-media-action-refresh";

export function createWorkspaceShellMediaDeadLetterActions(
  props: UseWorkspaceShellActionsProps,
) {
  const { token, workspaceId, canWriteWorkspace, selectedRecordId } = props;

  async function handleBulkRetryMediaDeadLetter(input: WorkspaceShellBulkRetryInput) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await bulkRetryMediaDeadLetter(activeToken, workspaceId, input);
    await refreshWorkspaceShellMediaMutation(props, activeToken, selectedRecordId);
  }

  return {
    handleBulkRetryMediaDeadLetter,
  };
}
