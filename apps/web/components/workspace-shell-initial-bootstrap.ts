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
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";
import { loadWorkspaceShellConversationState } from "./workspace-shell-conversation-state-load";

type WorkspaceRole = "owner" | "editor" | "viewer";

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
}: {
  activeToken: string;
  setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"];
  setConversations: UseWorkspaceShellEffectsProps["setConversations"];
  setKnowledgeStats: UseWorkspaceShellEffectsProps["setKnowledgeStats"];
  setMediaProcessingOverview: UseWorkspaceShellEffectsProps["setMediaProcessingOverview"];
  setMediaStorageSummary: UseWorkspaceShellEffectsProps["setMediaStorageSummary"];
  setMessages: UseWorkspaceShellEffectsProps["setMessages"];
  setNotifications: UseWorkspaceShellEffectsProps["setNotifications"];
  setRecords: UseWorkspaceShellEffectsProps["setRecords"];
  setSelectedRecordId: UseWorkspaceShellEffectsProps["setSelectedRecordId"];
  setTimelineDays: UseWorkspaceShellEffectsProps["setTimelineDays"];
  setVisibleRecords: UseWorkspaceShellEffectsProps["setVisibleRecords"];
  setWorkspace: UseWorkspaceShellEffectsProps["setWorkspace"];
  workspaceId: string;
}) {
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
    role: workspaceResult.workspace.role as WorkspaceRole,
  };
}
