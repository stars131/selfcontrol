"use client";

import { reindexKnowledge } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import {
  requireManageWorkspaceToken,
  requireWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellKnowledgeProviderActions({
  canManageWorkspace,
  refreshAuditLogs,
  setKnowledgeStats,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleReindexKnowledge() {
    const activeToken = requireManageWorkspaceToken(token, canManageWorkspace);
    const result = await reindexKnowledge(activeToken, workspaceId);
    setKnowledgeStats(result.stats);
    await refreshAuditLogs(activeToken);
  }

  async function handleRefreshAuditLogs() {
    const activeToken = requireWorkspaceToken(token);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleReindexKnowledge,
    handleRefreshAuditLogs,
  };
}
