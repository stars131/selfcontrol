"use client";

import type { Dispatch, SetStateAction } from "react";

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
import type {
  AuditLogItem,
  ChatMessage,
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
} from "../lib/types";

type WorkspaceShellRefreshersParams = {
  workspaceId: string;
  setAuditLogs: Dispatch<SetStateAction<AuditLogItem[]>>;
  setKnowledgeStats: Dispatch<SetStateAction<KnowledgeStats | null>>;
  setMediaAssets: Dispatch<SetStateAction<MediaAsset[]>>;
  setMediaDeadLetterOverview: Dispatch<SetStateAction<MediaDeadLetterOverview | null>>;
  setMediaProcessingOverview: Dispatch<SetStateAction<MediaProcessingOverview | null>>;
  setMediaStorageSummary: Dispatch<SetStateAction<MediaStorageSummary | null>>;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setNotifications: Dispatch<SetStateAction<NotificationItem[]>>;
  setProviderConfigs: Dispatch<SetStateAction<ProviderFeatureConfig[]>>;
  setRecords: Dispatch<SetStateAction<RecordItem[]>>;
  setReminders: Dispatch<SetStateAction<ReminderItem[]>>;
  setSearchPresets: Dispatch<SetStateAction<SearchPresetItem[]>>;
  setSelectedRecordId: Dispatch<SetStateAction<string | null>>;
  setShareLinks: Dispatch<SetStateAction<ShareLinkItem[]>>;
  setTimelineDays: Dispatch<SetStateAction<TimelineDay[]>>;
  setVisibleRecords: Dispatch<SetStateAction<RecordItem[]>>;
};

export function createWorkspaceShellRefreshers({
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
}: WorkspaceShellRefreshersParams) {
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

  return {
    initialRecordFilter: INITIAL_RECORD_FILTER,
    loadConversationMessages: async (activeToken: string, conversationId: string) =>
      loadConversationMessagesForWorkspace(activeToken, workspaceId, conversationId, setMessages),
    refreshAuditLogs: async (activeToken: string) =>
      refreshAuditLogItems(activeToken, workspaceId, setAuditLogs),
    refreshKnowledge: async (activeToken: string) =>
      refreshKnowledgeStatsData(activeToken, workspaceId, setKnowledgeStats),
    refreshMedia,
    refreshMediaDeadLetterOverview: async (activeToken: string) =>
      refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview),
    refreshMediaProcessingOverview: async (activeToken: string) =>
      refreshMediaProcessingOverviewData(activeToken, workspaceId, setMediaProcessingOverview),
    refreshMediaStorageSummary: async (activeToken: string) =>
      refreshMediaStorageSummaryData(activeToken, workspaceId, setMediaStorageSummary),
    refreshNotifications: async (activeToken: string) =>
      refreshNotificationItems(activeToken, workspaceId, setNotifications),
    refreshProviderConfigs: async (activeToken: string) =>
      refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs),
    refreshRecords,
    refreshReminders: async (activeToken: string, recordId: string | null) =>
      refreshReminderItems(activeToken, workspaceId, recordId, setReminders),
    refreshSearchPresets: async (activeToken: string) =>
      refreshSearchPresetItems(activeToken, workspaceId, setSearchPresets),
    refreshShareLinks: async (activeToken: string) =>
      refreshShareLinkItems(activeToken, workspaceId, setShareLinks),
    syncDueNotifications: async (activeToken: string) =>
      syncDueNotificationsAndRefresh(activeToken, workspaceId, setNotifications),
  };
}
