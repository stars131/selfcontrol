"use client";

import type {
  WorkspaceShellRefreshers,
  WorkspaceShellState,
} from "./workspace-shell-client-props.types";

export function buildWorkspaceShellActionsInput({
  refreshers,
  state,
  workspaceId,
}: {
  refreshers: WorkspaceShellRefreshers;
  state: WorkspaceShellState;
  workspaceId: string;
}) {
  return {
    token: state.token,
    workspaceId,
    activeConversationId: state.activeConversationId,
    canWriteWorkspace: state.canWriteWorkspace,
    canManageWorkspace: state.canManageWorkspace,
    canManageSharing: state.canManageSharing,
    conversationsCount: state.conversations.length,
    recordFilter: state.recordFilter,
    records: state.records,
    selectedRecordId: state.selectedRecordId,
    refreshRecords: refreshers.refreshRecords,
    refreshMedia: refreshers.refreshMedia,
    refreshMediaStorageSummary: refreshers.refreshMediaStorageSummary,
    refreshMediaProcessingOverview: refreshers.refreshMediaProcessingOverview,
    refreshMediaDeadLetterOverview: refreshers.refreshMediaDeadLetterOverview,
    refreshReminders: refreshers.refreshReminders,
    refreshNotifications: refreshers.refreshNotifications,
    refreshKnowledge: refreshers.refreshKnowledge,
    refreshSearchPresets: refreshers.refreshSearchPresets,
    refreshAuditLogs: refreshers.refreshAuditLogs,
    refreshShareLinks: refreshers.refreshShareLinks,
    syncDueNotifications: refreshers.syncDueNotifications,
    loadConversationMessages: refreshers.loadConversationMessages,
    setMessages: state.setMessages,
    setVisibleRecords: state.setVisibleRecords,
    setTimelineDays: state.setTimelineDays,
    setSelectedRecordId: state.setSelectedRecordId,
    setConversations: state.setConversations,
    setActiveConversationId: state.setActiveConversationId,
    setRecordFilter: state.setRecordFilter,
    setFilteringRecords: state.setFilteringRecords,
    setSavingSearchPreset: state.setSavingSearchPreset,
    setKnowledgeStats: state.setKnowledgeStats,
    setProviderConfigs: state.setProviderConfigs,
    setLatestSharePath: state.setLatestSharePath,
    initialRecordFilter: refreshers.initialRecordFilter,
  };
}
