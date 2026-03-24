"use client";

import { useEffect } from "react";

import type { WorkspaceShellInitialLoadProps } from "./workspace-shell-effects.types";
import { readWorkspaceShellInitialToken } from "./workspace-shell-initial-load-auth";
import { runWorkspaceShellInitialLoad } from "./workspace-shell-initial-load-runner";

export function useWorkspaceShellInitialLoad(props: WorkspaceShellInitialLoadProps) {
  const {
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
  } = props;

  useEffect(() => {
    const activeToken = readWorkspaceShellInitialToken(router);
    if (!activeToken) {
      return;
    }

    void runWorkspaceShellInitialLoad(activeToken, {
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
    });
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
