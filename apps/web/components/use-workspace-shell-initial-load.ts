"use client";

import { useEffect } from "react";

import { clearStoredSession, getStoredToken } from "../lib/auth";
import type { WorkspaceShellInitialLoadProps } from "./workspace-shell-effects.types";
import {
  loadWorkspaceShellInitialData,
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
        await loadWorkspaceShellInitialData({
          activeToken,
          setActiveConversationId,
          setAuditLogs,
          setConversations,
          setKnowledgeStats,
          setLatestSharePath,
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
          setVisibleRecords,
          setWorkspace,
          workspaceId,
        });
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
