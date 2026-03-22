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
import { WorkspaceShellFrame } from "./workspace-shell-frame";
import { WorkspaceShellPanels } from "./workspace-shell-panels";
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
