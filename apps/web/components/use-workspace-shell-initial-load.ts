"use client";

import { useEffect } from "react";

import { createConversation, getWorkspace, listConversations } from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import {
  INITIAL_RECORD_FILTER,
  loadConversationMessagesForWorkspace,
  refreshAuditLogItems,
  refreshKnowledgeStatsData,
  refreshMediaDeadLetterOverviewData,
  refreshMediaProcessingOverviewData,
  refreshMediaStorageSummaryData,
  refreshNotificationItems,
  refreshProviderConfigItems,
  refreshRecordCollection,
  refreshSearchPresetItems,
  refreshShareLinkItems,
} from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";

export function useWorkspaceShellInitialLoad({
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
}: Pick<
  UseWorkspaceShellEffectsProps,
  | "router"
  | "workspaceId"
  | "setActiveConversationId"
  | "setAuditLogs"
  | "setConversations"
  | "setError"
  | "setKnowledgeStats"
  | "setLatestSharePath"
  | "setLoading"
  | "setMediaDeadLetterOverview"
  | "setMediaProcessingOverview"
  | "setMediaStorageSummary"
  | "setMessages"
  | "setNotifications"
  | "setProviderConfigs"
  | "setRecords"
  | "setSearchPresets"
  | "setSelectedRecordId"
  | "setShareLinks"
  | "setTimelineDays"
  | "setToken"
  | "setVisibleRecords"
  | "setWorkspace"
>) {
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
        if (
          !items.length &&
          (workspaceResult.workspace.role === "owner" || workspaceResult.workspace.role === "editor")
        ) {
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
}
