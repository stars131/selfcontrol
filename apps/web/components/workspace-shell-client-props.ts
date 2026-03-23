"use client";

import type { ComponentProps } from "react";
import { useRouter } from "next/navigation";

import { WorkspaceShellPanels } from "./workspace-shell-panels";
import { createWorkspaceShellRefreshers } from "./use-workspace-shell-refreshers";
import { useWorkspaceShellActions } from "./use-workspace-shell-actions";
import { useWorkspaceShellState } from "./use-workspace-shell-state";

type WorkspaceShellState = ReturnType<typeof useWorkspaceShellState>;
type WorkspaceShellRefreshers = ReturnType<typeof createWorkspaceShellRefreshers>;
type WorkspaceShellActions = ReturnType<typeof useWorkspaceShellActions>;
type WorkspaceShellRouter = ReturnType<typeof useRouter>;
type WorkspaceShellPanelsProps = ComponentProps<typeof WorkspaceShellPanels>;

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

export function buildWorkspaceShellEffectsInput({
  router,
  state,
  workspaceId,
}: {
  router: WorkspaceShellRouter;
  state: WorkspaceShellState;
  workspaceId: string;
}) {
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
    setProviderConfigs: state.setProviderConfigs,
    setSearchPresets: state.setSearchPresets,
    setShareLinks: state.setShareLinks,
    setLatestSharePath: state.setLatestSharePath,
    setAuditLogs: state.setAuditLogs,
    setError: state.setError,
    setLoading: state.setLoading,
  };
}

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

export function buildWorkspaceShellPanelsProps({
  actions,
  state,
  workspaceId,
}: {
  actions: WorkspaceShellActions;
  state: WorkspaceShellState;
  workspaceId: string;
}): WorkspaceShellPanelsProps {
  return {
    activeConversationId: state.activeConversationId,
    auditLogs: state.auditLogs,
    authToken: state.token,
    canManageSharing: state.canManageSharing,
    canManageWorkspace: state.canManageWorkspace,
    canWriteWorkspace: state.canWriteWorkspace,
    conversations: state.conversations,
    filteringRecords: state.filteringRecords,
    knowledgeStats: state.knowledgeStats,
    latestSharePath: state.latestSharePath,
    mediaAssets: state.mediaAssets,
    mediaDeadLetterOverview: state.mediaDeadLetterOverview,
    mediaProcessingOverview: state.mediaProcessingOverview,
    mediaStorageSummary: state.mediaStorageSummary,
    messages: state.messages,
    notifications: state.notifications,
    onApplyLocationFilter: actions.handleApplyLocationFilter,
    onApplyRecordFilter: actions.handleApplyRecordFilter,
    onBulkRetryMediaDeadLetter: actions.handleBulkRetryMediaDeadLetter,
    onCreateConversation: actions.handleCreateConversation,
    onCreateReminder: actions.handleCreateReminder,
    onCreateSearchPreset: actions.handleCreateSearchPreset,
    onCreateShareLink: actions.handleCreateShareLink,
    onDeleteMedia: actions.handleDeleteMedia,
    onDeleteRecord: actions.handleDeleteRecord,
    onDeleteReminder: actions.handleDeleteReminder,
    onDeleteSearchPreset: actions.handleDeleteSearchPreset,
    onDisableShareLink: actions.handleDisableShareLink,
    onMarkNotificationRead: actions.handleMarkNotificationRead,
    onRefreshAuditLogs: actions.handleRefreshAuditLogs,
    onRefreshMediaStatus: actions.handleRefreshMediaStatus,
    onReindexKnowledge: actions.handleReindexKnowledge,
    onResetFilter: actions.handleResetFilter,
    onRetryMedia: actions.handleRetryMedia,
    onSaveProviderConfig: actions.handleSaveProviderConfig,
    onSaveRecord: actions.handleSaveRecord,
    onSelectConversation: actions.handleSelectConversation,
    onSelectRecord: state.setSelectedRecordId,
    onSendMessage: actions.handleSendMessage,
    onSyncNotifications: actions.handleSyncNotifications,
    onUpdateReminder: actions.handleUpdateReminder,
    onUploadMedia: actions.handleUploadMedia,
    providerConfigs: state.providerConfigs,
    recordFilter: state.recordFilter,
    records: state.visibleRecords,
    reminders: state.reminders,
    savingSearchPreset: state.savingSearchPreset,
    searchPresets: state.searchPresets,
    selectedRecordId: state.selectedRecordId,
    shareLinks: state.shareLinks,
    timelineDays: state.timelineDays,
    workspaceId,
    workspaceRole: state.workspace?.role ?? "viewer",
  };
}
