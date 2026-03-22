"use client";

import { useRouter } from "next/navigation";

import {
  INITIAL_RECORD_FILTER,
  loadConversationMessagesForWorkspace,
  refreshAuditLogItems,
  refreshKnowledgeStatsData,
  refreshMediaAssets,
  refreshMediaDeadLetterOverviewData,
  refreshMediaProcessingOverviewData,
  refreshMediaStorageSummaryData,
  refreshNotificationItems,
  refreshProviderConfigItems,
  refreshRecordCollection,
  refreshReminderItems,
  refreshSearchPresetItems,
  refreshShareLinkItems,
  syncDueNotificationsAndRefresh,
} from "../lib/workspace-shell-refresh";
import { WorkspaceShellFrame } from "./workspace-shell-frame";
import { WorkspaceShellPanels } from "./workspace-shell-panels";
import { useWorkspaceShellActions } from "./use-workspace-shell-actions";
import { useWorkspaceShellEffects } from "./use-workspace-shell-effects";
import { useWorkspaceShellState } from "./use-workspace-shell-state";

export function WorkspaceShellClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const {
    token, setToken, workspace, setWorkspace, records, setRecords, visibleRecords, setVisibleRecords,
    timelineDays, setTimelineDays, conversations, setConversations, activeConversationId, setActiveConversationId,
    messages, setMessages, selectedRecordId, setSelectedRecordId, mediaAssets, setMediaAssets,
    mediaDeadLetterOverview, setMediaDeadLetterOverview, mediaProcessingOverview, setMediaProcessingOverview,
    mediaStorageSummary, setMediaStorageSummary, reminders, setReminders, notifications, setNotifications,
    knowledgeStats, setKnowledgeStats, providerConfigs, setProviderConfigs, shareLinks, setShareLinks,
    latestSharePath, setLatestSharePath, auditLogs, setAuditLogs, recordFilter, setRecordFilter,
    searchPresets, setSearchPresets, filteringRecords, setFilteringRecords, savingSearchPreset,
    setSavingSearchPreset, loading, setLoading, error, setError, canWriteWorkspace,
    canManageWorkspace, canManageSharing,
  } = useWorkspaceShellState();

  const refreshRecords = async (activeToken: string, nextRecordFilter = INITIAL_RECORD_FILTER) => {
    await refreshRecordCollection({
      token: activeToken,
      workspaceId,
      nextRecordFilter,
      setRecords,
      setVisibleRecords,
      setTimelineDays,
      setSelectedRecordId,
    });
  };

  const refreshMedia = async (activeToken: string, recordId: string | null) => {
    await refreshMediaAssets(activeToken, workspaceId, recordId, setMediaAssets);
  };

  const refreshMediaStorageSummary = async (activeToken: string) =>
    refreshMediaStorageSummaryData(activeToken, workspaceId, setMediaStorageSummary);
  const refreshMediaProcessingOverview = async (activeToken: string) =>
    refreshMediaProcessingOverviewData(activeToken, workspaceId, setMediaProcessingOverview);
  const refreshMediaDeadLetterOverview = async (activeToken: string) =>
    refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview);

  const refreshReminders = async (activeToken: string, recordId: string | null) => {
    await refreshReminderItems(activeToken, workspaceId, recordId, setReminders);
  };

  const refreshNotifications = async (activeToken: string) =>
    refreshNotificationItems(activeToken, workspaceId, setNotifications);
  const refreshKnowledge = async (activeToken: string) =>
    refreshKnowledgeStatsData(activeToken, workspaceId, setKnowledgeStats);
  const refreshProviderConfigs = async (activeToken: string) =>
    refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs);
  const refreshShareLinks = async (activeToken: string) =>
    refreshShareLinkItems(activeToken, workspaceId, setShareLinks);
  const refreshSearchPresets = async (activeToken: string) =>
    refreshSearchPresetItems(activeToken, workspaceId, setSearchPresets);
  const refreshAuditLogs = async (activeToken: string) =>
    refreshAuditLogItems(activeToken, workspaceId, setAuditLogs);
  const syncDueNotifications = async (activeToken: string) =>
    syncDueNotificationsAndRefresh(activeToken, workspaceId, setNotifications);
  const loadConversationMessages = async (activeToken: string, conversationId: string) =>
    loadConversationMessagesForWorkspace(activeToken, workspaceId, conversationId, setMessages);

  useWorkspaceShellEffects({
    router,
    workspaceId,
    token,
    selectedRecordId,
    setToken,
    setWorkspace,
    setRecords,
    setVisibleRecords,
    setTimelineDays,
    setConversations,
    setActiveConversationId,
    setMessages,
    setSelectedRecordId,
    setMediaAssets,
    setMediaDeadLetterOverview,
    setMediaProcessingOverview,
    setMediaStorageSummary,
    setReminders,
    setNotifications,
    setKnowledgeStats,
    setProviderConfigs,
    setSearchPresets,
    setShareLinks,
    setLatestSharePath,
    setAuditLogs,
    setError,
    setLoading,
  });
  const {
    handleSendMessage,
    handleCreateConversation,
    handleSelectConversation,
    handleSaveRecord,
    handleDeleteRecord,
    handleUploadMedia,
    handleDeleteMedia,
    handleRetryMedia,
    handleRefreshMediaStatus,
    handleBulkRetryMediaDeadLetter,
    handleResetFilter,
    handleApplyRecordFilter,
    handleApplyLocationFilter,
    handleCreateSearchPreset,
    handleDeleteSearchPreset,
    handleCreateReminder,
    handleUpdateReminder,
    handleDeleteReminder,
    handleSyncNotifications,
    handleMarkNotificationRead,
    handleReindexKnowledge,
    handleSaveProviderConfig,
    handleCreateShareLink,
    handleDisableShareLink,
    handleRefreshAuditLogs,
  } = useWorkspaceShellActions({
    token,
    workspaceId,
    activeConversationId,
    canWriteWorkspace,
    canManageWorkspace,
    canManageSharing,
    conversationsCount: conversations.length,
    recordFilter,
    records,
    selectedRecordId,
    refreshRecords,
    refreshMedia,
    refreshMediaStorageSummary,
    refreshMediaProcessingOverview,
    refreshMediaDeadLetterOverview,
    refreshReminders,
    refreshNotifications,
    refreshKnowledge,
    refreshSearchPresets,
    refreshAuditLogs,
    refreshShareLinks,
    syncDueNotifications,
    loadConversationMessages,
    setMessages,
    setVisibleRecords,
    setTimelineDays,
    setSelectedRecordId,
    setConversations,
    setActiveConversationId,
    setRecordFilter,
    setFilteringRecords,
    setSavingSearchPreset,
    setKnowledgeStats,
    setProviderConfigs,
    setLatestSharePath,
    initialRecordFilter: INITIAL_RECORD_FILTER,
  });

  return (
    <WorkspaceShellFrame error={error} loading={loading}>
      <WorkspaceShellPanels
        activeConversationId={activeConversationId}
        auditLogs={auditLogs}
        authToken={token}
        canManageSharing={canManageSharing}
        canManageWorkspace={canManageWorkspace}
        canWriteWorkspace={canWriteWorkspace}
        conversations={conversations}
        filteringRecords={filteringRecords}
        knowledgeStats={knowledgeStats}
        latestSharePath={latestSharePath}
        mediaAssets={mediaAssets}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaProcessingOverview={mediaProcessingOverview}
        mediaStorageSummary={mediaStorageSummary}
        messages={messages}
        notifications={notifications}
        onApplyLocationFilter={handleApplyLocationFilter}
        onApplyRecordFilter={handleApplyRecordFilter}
        onBulkRetryMediaDeadLetter={handleBulkRetryMediaDeadLetter}
        onCreateConversation={handleCreateConversation}
        onCreateReminder={handleCreateReminder}
        onCreateSearchPreset={handleCreateSearchPreset}
        onCreateShareLink={handleCreateShareLink}
        onDeleteMedia={handleDeleteMedia}
        onDeleteRecord={handleDeleteRecord}
        onDeleteReminder={handleDeleteReminder}
        onDeleteSearchPreset={handleDeleteSearchPreset}
        onDisableShareLink={handleDisableShareLink}
        onMarkNotificationRead={handleMarkNotificationRead}
        onRefreshAuditLogs={handleRefreshAuditLogs}
        onRefreshMediaStatus={handleRefreshMediaStatus}
        onReindexKnowledge={handleReindexKnowledge}
        onResetFilter={handleResetFilter}
        onRetryMedia={handleRetryMedia}
        onSaveProviderConfig={handleSaveProviderConfig}
        onSaveRecord={handleSaveRecord}
        onSelectConversation={handleSelectConversation}
        onSelectRecord={setSelectedRecordId}
        onSendMessage={handleSendMessage}
        onSyncNotifications={handleSyncNotifications}
        onUpdateReminder={handleUpdateReminder}
        onUploadMedia={handleUploadMedia}
        providerConfigs={providerConfigs}
        recordFilter={recordFilter}
        records={visibleRecords}
        reminders={reminders}
        savingSearchPreset={savingSearchPreset}
        searchPresets={searchPresets}
        selectedRecordId={selectedRecordId}
        shareLinks={shareLinks}
        timelineDays={timelineDays}
        workspaceId={workspaceId}
        workspaceRole={workspace?.role ?? "viewer"}
      />
    </WorkspaceShellFrame>
  );
}
