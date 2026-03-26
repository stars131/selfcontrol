"use client";

import type { BuildWorkspaceShellEffectsInput } from "./workspace-shell-client-effects-input.types";

export function buildWorkspaceShellEffectsInput({
  router,
  state,
  workspaceId,
}: BuildWorkspaceShellEffectsInput) {
  return {
    router,
    workspaceId,
    token: state.token,
    selectedRecordId: state.selectedRecordId,
    setToken: state.setToken,
    setWorkspace: state.setWorkspace,
    setRecords: state.setRecords,
    setVisibleRecords: state.setVisibleRecords,
    setTimelineDays: state.setTimelineDays,
    setConversations: state.setConversations,
    setActiveConversationId: state.setActiveConversationId,
    setMessages: state.setMessages,
    setSelectedRecordId: state.setSelectedRecordId,
    setMediaAssets: state.setMediaAssets,
    setMediaDeadLetterOverview: state.setMediaDeadLetterOverview,
    setMediaProcessingOverview: state.setMediaProcessingOverview,
    setMediaStorageSummary: state.setMediaStorageSummary,
    setReminders: state.setReminders,
    setNotifications: state.setNotifications,
    setKnowledgeStats: state.setKnowledgeStats,
    setSearchPresets: state.setSearchPresets,
    setShareLinks: state.setShareLinks,
    setLatestSharePath: state.setLatestSharePath,
    setAuditLogs: state.setAuditLogs,
    setError: state.setError,
    setLoading: state.setLoading,
  };
}
