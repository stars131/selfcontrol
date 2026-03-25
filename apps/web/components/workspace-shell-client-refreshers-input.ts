"use client";

import type { BuildWorkspaceShellRefreshersInput } from "./workspace-shell-client-refreshers-input.types";

export function buildWorkspaceShellRefreshersInput({
  state,
  workspaceId,
}: BuildWorkspaceShellRefreshersInput) {
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
