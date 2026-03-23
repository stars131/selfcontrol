"use client";

import { useEffect } from "react";

import { getWorkspace } from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import {
  INITIAL_RECORD_FILTER,
  refreshAuditLogItems,
  refreshKnowledgeStatsData,
  refreshMediaProcessingOverviewData,
  refreshMediaStorageSummaryData,
  refreshNotificationItems,
  refreshRecordCollection,
  refreshSearchPresetItems,
} from "../lib/workspace-shell-refresh";
import type { WorkspaceShellInitialLoadProps } from "./workspace-shell-effects.types";
import {
  loadWorkspaceShellConversationState,
  loadWorkspaceShellManagedState,
} from "./workspace-shell-initial-load-helpers";

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
}: WorkspaceShellInitialLoadProps) {
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

        await loadWorkspaceShellConversationState({
          activeToken,
          role: workspaceResult.workspace.role,
          setActiveConversationId,
          setConversations,
          setMessages,
          workspaceId,
        });

        await refreshNotificationItems(activeToken, workspaceId, setNotifications);
        await refreshKnowledgeStatsData(activeToken, workspaceId, setKnowledgeStats);
        await refreshMediaStorageSummaryData(activeToken, workspaceId, setMediaStorageSummary);
        await refreshMediaProcessingOverviewData(activeToken, workspaceId, setMediaProcessingOverview);

        await loadWorkspaceShellManagedState({
          activeToken,
          role: workspaceResult.workspace.role,
          setLatestSharePath,
          setMediaDeadLetterOverview,
          setProviderConfigs,
          setShareLinks,
          workspaceId,
        });

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
