"use client";

import type { WorkspaceShellState } from "./workspace-shell-client-props.types";

export function buildWorkspaceShellRefreshersInput({
  state,
  workspaceId,
}: {
  state: WorkspaceShellState;
  workspaceId: string;
}) {
  return {
    workspaceId,
    setAuditLogs: state.setAuditLogs,
    setKnowledgeStats: state.setKnowledgeStats,
    setMediaAssets: state.setMediaAssets,
    setMediaDeadLetterOverview: state.setMediaDeadLetterOverview,
    setMediaProcessingOverview: state.setMediaProcessingOverview,
    setMediaStorageSummary: state.setMediaStorageSummary,
    setMessages: state.setMessages,
    setNotifications: state.setNotifications,
    setProviderConfigs: state.setProviderConfigs,
    setRecords: state.setRecords,
    setReminders: state.setReminders,
    setSearchPresets: state.setSearchPresets,
    setSelectedRecordId: state.setSelectedRecordId,
    setShareLinks: state.setShareLinks,
    setTimelineDays: state.setTimelineDays,
    setVisibleRecords: state.setVisibleRecords,
  };
}
