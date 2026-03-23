"use client";

import { reindexKnowledge, updateProviderConfig } from "../lib/api";
import type {
  UseWorkspaceShellActionsProps,
  WorkspaceShellProviderConfigInput,
} from "./workspace-shell-actions.types";
import {
  requireManageWorkspaceToken,
  requireWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellKnowledgeProviderActions({
  canManageWorkspace,
  refreshAuditLogs,
  refreshKnowledge,
  setKnowledgeStats,
  setProviderConfigs,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleReindexKnowledge() {
    const activeToken = requireManageWorkspaceToken(token, canManageWorkspace);
    const result = await reindexKnowledge(activeToken, workspaceId);
    setKnowledgeStats(result.stats);
    await refreshAuditLogs(activeToken);
  }

  async function handleSaveProviderConfig(
    featureCode: string,
    input: WorkspaceShellProviderConfigInput,
  ) {
    const activeToken = requireWorkspaceToken(token);
    const result = await updateProviderConfig(activeToken, workspaceId, featureCode, input);
    setProviderConfigs((current) =>
      current.map((item) => (item.feature_code === featureCode ? result.config : item)),
    );
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleRefreshAuditLogs() {
    const activeToken = requireWorkspaceToken(token);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleReindexKnowledge,
    handleSaveProviderConfig,
    handleRefreshAuditLogs,
  };
}
