"use client";

import { getWorkspace } from "../lib/api";
import {
  INITIAL_RECORD_FILTER,
  refreshKnowledgeStatsData,
  refreshMediaProcessingOverviewData,
  refreshMediaStorageSummaryData,
  refreshNotificationItems,
  refreshRecordCollection,
} from "../lib/workspace-shell-refresh";
import { loadWorkspaceShellConversationState } from "./workspace-shell-conversation-state-load";
import type { LoadWorkspaceShellInitialBootstrapInput } from "./workspace-shell-initial-bootstrap.types";
import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types";

export async function loadWorkspaceShellInitialBootstrap({
  activeToken,
  setActiveConversationId,
  setConversations,
  setKnowledgeStats,
  setMediaProcessingOverview,
  setMediaStorageSummary,
  setMessages,
  setNotifications,
  setRecords,
  setSelectedRecordId,
  setTimelineDays,
  setVisibleRecords,
  setWorkspace,
  workspaceId,
}: LoadWorkspaceShellInitialBootstrapInput) {
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

  return {
    role: workspaceResult.workspace.role as WorkspaceShellLoadRole,
  };
}
