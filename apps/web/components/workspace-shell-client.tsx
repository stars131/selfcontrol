"use client";

import { useRouter } from "next/navigation";

import { WorkspaceShellFrame } from "./workspace-shell-frame";
import { WorkspaceShellPanels } from "./workspace-shell-panels";
import { useWorkspaceShellActions } from "./use-workspace-shell-actions";
import { useWorkspaceShellEffects } from "./use-workspace-shell-effects";
import { createWorkspaceShellRefreshers } from "./use-workspace-shell-refreshers";
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

  const {
    initialRecordFilter,
    loadConversationMessages,
    refreshAuditLogs,
    refreshKnowledge,
    refreshMedia,
    refreshMediaDeadLetterOverview,
    refreshMediaProcessingOverview,
    refreshMediaStorageSummary,
    refreshNotifications,
    refreshProviderConfigs,
    refreshRecords,
    refreshReminders,
    refreshSearchPresets,
    refreshShareLinks,
    syncDueNotifications,
  } = createWorkspaceShellRefreshers({
    workspaceId,
    setAuditLogs,
    setKnowledgeStats,
    setMediaAssets,
    setMediaDeadLetterOverview,
    setMediaProcessingOverview,
    setMediaStorageSummary,
    setMessages,
    setNotifications,
    setProviderConfigs,
    setRecords,
    setReminders,
    setSearchPresets,
    setSelectedRecordId,
    setShareLinks,
    setTimelineDays,
    setVisibleRecords,
  });

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
    initialRecordFilter,
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
