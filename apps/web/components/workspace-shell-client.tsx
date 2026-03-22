"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  NotificationItem,
  ProviderFeatureConfig,
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  TimelineDay,
  Workspace,
} from "../lib/types";
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
import { ChatPanel } from "./chat-panel";
import { RecordPanelV2 } from "./record-panel-v2";
import { useWorkspaceShellActions } from "./use-workspace-shell-actions";
import { useWorkspaceShellEffects } from "./use-workspace-shell-effects";

export function WorkspaceShellClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [visibleRecords, setVisibleRecords] = useState<RecordItem[]>([]);
  const [timelineDays, setTimelineDays] = useState<TimelineDay[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [mediaDeadLetterOverview, setMediaDeadLetterOverview] = useState<MediaDeadLetterOverview | null>(null);
  const [mediaProcessingOverview, setMediaProcessingOverview] = useState<MediaProcessingOverview | null>(null);
  const [mediaStorageSummary, setMediaStorageSummary] = useState<MediaStorageSummary | null>(null);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [providerConfigs, setProviderConfigs] = useState<ProviderFeatureConfig[]>([]);
  const [shareLinks, setShareLinks] = useState<ShareLinkItem[]>([]);
  const [latestSharePath, setLatestSharePath] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [recordFilter, setRecordFilter] = useState<RecordFilterState>(INITIAL_RECORD_FILTER);
  const [searchPresets, setSearchPresets] = useState<SearchPresetItem[]>([]);
  const [filteringRecords, setFilteringRecords] = useState(false);
  const [savingSearchPreset, setSavingSearchPreset] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const canWriteWorkspace = workspace?.role === "owner" || workspace?.role === "editor";
  const canManageWorkspace = canWriteWorkspace;
  const canManageSharing = workspace?.role === "owner";

  const refreshRecords = async (
    activeToken: string,
    nextRecordFilter: RecordFilterState = INITIAL_RECORD_FILTER,
  ) => {
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

  const refreshMediaStorageSummary = async (activeToken: string) => {
    await refreshMediaStorageSummaryData(activeToken, workspaceId, setMediaStorageSummary);
  };

  const refreshMediaProcessingOverview = async (activeToken: string) => {
    await refreshMediaProcessingOverviewData(activeToken, workspaceId, setMediaProcessingOverview);
  };

  const refreshMediaDeadLetterOverview = async (activeToken: string) => {
    await refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview);
  };

  const refreshReminders = async (activeToken: string, recordId: string | null) => {
    await refreshReminderItems(activeToken, workspaceId, recordId, setReminders);
  };

  const refreshNotifications = async (activeToken: string) => {
    await refreshNotificationItems(activeToken, workspaceId, setNotifications);
  };

  const refreshKnowledge = async (activeToken: string) => {
    await refreshKnowledgeStatsData(activeToken, workspaceId, setKnowledgeStats);
  };

  const refreshProviderConfigs = async (activeToken: string) => {
    await refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs);
  };

  const refreshShareLinks = async (activeToken: string) => {
    await refreshShareLinkItems(activeToken, workspaceId, setShareLinks);
  };

  const refreshSearchPresets = async (activeToken: string) => {
    await refreshSearchPresetItems(activeToken, workspaceId, setSearchPresets);
  };

  const refreshAuditLogs = async (activeToken: string) => {
    await refreshAuditLogItems(activeToken, workspaceId, setAuditLogs);
  };

  const syncDueNotifications = async (activeToken: string) => {
    await syncDueNotificationsAndRefresh(activeToken, workspaceId, setNotifications);
  };

  const loadConversationMessages = async (activeToken: string, conversationId: string) => {
    await loadConversationMessagesForWorkspace(activeToken, workspaceId, conversationId, setMessages);
  };

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

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">Loading workspace...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      {error ? <div className="notice error">{error}</div> : null}
      <div className="workspace-shell">
        <ChatPanel
          activeConversationId={activeConversationId}
          auditLogs={auditLogs}
          canManageSharing={canManageSharing}
          canManageWorkspace={canManageWorkspace}
          canWriteWorkspace={canWriteWorkspace}
          conversations={conversations}
          knowledgeStats={knowledgeStats}
          latestSharePath={latestSharePath}
          messages={messages}
          notifications={notifications}
          onCreateConversation={handleCreateConversation}
          onCreateShareLink={handleCreateShareLink}
          onDisableShareLink={handleDisableShareLink}
          onMarkNotificationRead={handleMarkNotificationRead}
          onRefreshAuditLogs={handleRefreshAuditLogs}
          onReindexKnowledge={handleReindexKnowledge}
          onSaveProviderConfig={handleSaveProviderConfig}
          onSelectConversation={handleSelectConversation}
          onSendMessage={handleSendMessage}
          onSyncNotifications={handleSyncNotifications}
          providerConfigs={providerConfigs}
          shareLinks={shareLinks}
          workspaceId={workspaceId}
          workspaceRole={workspace?.role ?? "viewer"}
        />
        <RecordPanelV2
          authToken={token}
          canWriteWorkspace={canWriteWorkspace}
          mediaAssets={mediaAssets}
          mediaDeadLetterOverview={mediaDeadLetterOverview}
          mediaProcessingOverview={mediaProcessingOverview}
          mediaStorageSummary={mediaStorageSummary}
          onBulkRetryMediaDeadLetter={handleBulkRetryMediaDeadLetter}
          onCreateReminder={handleCreateReminder}
          onDeleteMedia={handleDeleteMedia}
          onDeleteRecord={handleDeleteRecord}
          onDeleteReminder={handleDeleteReminder}
          onRefreshMediaStatus={handleRefreshMediaStatus}
          onApplyRecordFilter={handleApplyRecordFilter}
          onApplyLocationFilter={handleApplyLocationFilter}
          onCreateSearchPreset={handleCreateSearchPreset}
          onDeleteSearchPreset={handleDeleteSearchPreset}
          onResetFilter={handleResetFilter}
          filteringRecords={filteringRecords}
          recordFilter={recordFilter}
          searchPresets={searchPresets}
          savingSearchPreset={savingSearchPreset}
          onRetryMedia={handleRetryMedia}
          onSaveRecord={handleSaveRecord}
          onSelectRecord={setSelectedRecordId}
          onUpdateReminder={handleUpdateReminder}
          onUploadMedia={handleUploadMedia}
          records={visibleRecords}
          reminders={reminders}
          selectedRecordId={selectedRecordId}
          timelineDays={timelineDays}
          workspaceId={workspaceId}
        />
      </div>
    </main>
  );
}
