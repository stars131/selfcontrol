"use client";

import { createSearchPreset, deleteSearchPreset } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";

export function createWorkspaceShellSearchPresetActions({
  canWriteWorkspace,
  refreshAuditLogs,
  refreshSearchPresets,
  setSavingSearchPreset,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleCreateSearchPreset(
    name: string,
    nextFilter: UseWorkspaceShellActionsProps["recordFilter"],
  ) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    setSavingSearchPreset(true);
    try {
      await createSearchPreset(activeToken, workspaceId, {
        name,
        filters: nextFilter,
      });
      await refreshSearchPresets(activeToken);
      await refreshAuditLogs(activeToken);
    } finally {
      setSavingSearchPreset(false);
    }
  }

  async function handleDeleteSearchPreset(presetId: string) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await deleteSearchPreset(activeToken, workspaceId, presetId);
    await refreshSearchPresets(activeToken);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleCreateSearchPreset,
    handleDeleteSearchPreset,
  };
}
