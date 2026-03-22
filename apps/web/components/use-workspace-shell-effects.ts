"use client";

import { useEffect } from "react";

import { createConversation, getWorkspace, listConversations } from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import {
  INITIAL_RECORD_FILTER,
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
  loadConversationMessagesForWorkspace,
} from "../lib/workspace-shell-refresh";
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
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  TimelineDay,
  Workspace,
} from "../lib/types";

type RouterLike = {
  replace: (href: string) => void;
};

type UseWorkspaceShellEffectsProps = {
  router: RouterLike;
  workspaceId: string;
  token: string | null;
  selectedRecordId: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
  setRecords: React.Dispatch<React.SetStateAction<RecordItem[]>>;
  setVisibleRecords: React.Dispatch<React.SetStateAction<RecordItem[]>>;
  setTimelineDays: React.Dispatch<React.SetStateAction<TimelineDay[]>>;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  setActiveConversationId: React.Dispatch<React.SetStateAction<string | null>>;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setSelectedRecordId: React.Dispatch<React.SetStateAction<string | null>>;
  setMediaAssets: React.Dispatch<React.SetStateAction<MediaAsset[]>>;
  setMediaDeadLetterOverview: React.Dispatch<React.SetStateAction<MediaDeadLetterOverview | null>>;
  setMediaProcessingOverview: React.Dispatch<React.SetStateAction<MediaProcessingOverview | null>>;
  setMediaStorageSummary: React.Dispatch<React.SetStateAction<MediaStorageSummary | null>>;
  setReminders: React.Dispatch<React.SetStateAction<ReminderItem[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setKnowledgeStats: React.Dispatch<React.SetStateAction<KnowledgeStats | null>>;
  setProviderConfigs: React.Dispatch<React.SetStateAction<ProviderFeatureConfig[]>>;
  setSearchPresets: React.Dispatch<React.SetStateAction<SearchPresetItem[]>>;
  setShareLinks: React.Dispatch<React.SetStateAction<ShareLinkItem[]>>;
  setLatestSharePath: React.Dispatch<React.SetStateAction<string>>;
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLogItem[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useWorkspaceShellEffects({
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
}: UseWorkspaceShellEffectsProps) {
  useEffect(() => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(activeToken);
        const workspaceResult = await getWorkspace(activeToken, workspaceId);
        setWorkspace(workspaceResult.workspace);

        await refreshRecordCollection({
          token: activeToken,
          workspaceId,
          nextRecordFilter: INITIAL_RECORD_FILTER,
          setRecords,
          setVisibleRecords,
          setTimelineDays,
          setSelectedRecordId,
        });

        const conversationResult = await listConversations(activeToken, workspaceId);
        let items = conversationResult.items;
        if (!items.length && (workspaceResult.workspace.role === "owner" || workspaceResult.workspace.role === "editor")) {
          const created = await createConversation(activeToken, workspaceId, "Workspace chat");
          items = [created.conversation];
        }

        setConversations(items);
        setActiveConversationId(items[0]?.id ?? null);
        if (items[0]) {
          await loadConversationMessagesForWorkspace(activeToken, workspaceId, items[0].id, setMessages);
        } else {
          setMessages([]);
        }

        await refreshNotificationItems(activeToken, workspaceId, setNotifications);
        await refreshKnowledgeStatsData(activeToken, workspaceId, setKnowledgeStats);
        await refreshMediaStorageSummaryData(activeToken, workspaceId, setMediaStorageSummary);
        await refreshMediaProcessingOverviewData(activeToken, workspaceId, setMediaProcessingOverview);

        if (workspaceResult.workspace.role === "owner" || workspaceResult.workspace.role === "editor") {
          await refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview);
          await refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs);
          if (workspaceResult.workspace.role === "owner") {
            await refreshShareLinkItems(activeToken, workspaceId, setShareLinks);
          } else {
            setShareLinks([]);
            setLatestSharePath("");
          }
        } else {
          setMediaDeadLetterOverview(null);
          setProviderConfigs([]);
          setShareLinks([]);
          setLatestSharePath("");
        }

        await refreshSearchPresetItems(activeToken, workspaceId, setSearchPresets);
        await refreshAuditLogItems(activeToken, workspaceId, setAuditLogs);
      } catch (caught) {
        clearStoredSession();
        setError(caught instanceof Error ? caught.message : "Failed to load workspace data");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [
    router,
    workspaceId,
    setActiveConversationId,
    setAuditLogs,
    setConversations,
    setError,
    setKnowledgeStats,
    setLatestSharePath,
    setLoading,
    setMediaDeadLetterOverview,
    setMediaProcessingOverview,
    setMediaStorageSummary,
    setMessages,
    setNotifications,
    setProviderConfigs,
    setRecords,
    setSearchPresets,
    setSelectedRecordId,
    setShareLinks,
    setTimelineDays,
    setToken,
    setVisibleRecords,
    setWorkspace,
  ]);

  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshMediaAssets(token, workspaceId, selectedRecordId, setMediaAssets);
  }, [token, workspaceId, selectedRecordId, setMediaAssets]);

  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshReminderItems(token, workspaceId, selectedRecordId, setReminders);
  }, [token, workspaceId, selectedRecordId, setReminders]);

  useEffect(() => {
    if (!token) {
      return;
    }

    void syncDueNotificationsAndRefresh(token, workspaceId, setNotifications);
    const timer = window.setInterval(() => {
      void syncDueNotificationsAndRefresh(token, workspaceId, setNotifications);
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [token, workspaceId, setNotifications]);
}
