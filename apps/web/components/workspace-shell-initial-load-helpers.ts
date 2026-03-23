"use client";

import { createConversation, getWorkspace, listConversations } from "../lib/api";
import {
  INITIAL_RECORD_FILTER,
  refreshAuditLogItems,
  refreshKnowledgeStatsData,
  refreshMediaProcessingOverviewData,
  refreshMediaStorageSummaryData,
  refreshNotificationItems,
  refreshRecordCollection,
  refreshSearchPresetItems,
  loadConversationMessagesForWorkspace,
  refreshMediaDeadLetterOverviewData,
  refreshProviderConfigItems,
  refreshShareLinkItems,
} from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";

type WorkspaceRole = "owner" | "editor" | "viewer";

function canManageWorkspace(role: WorkspaceRole) {
  return role === "owner" || role === "editor";
}

export async function loadWorkspaceShellConversationState({
  activeToken,
  role,
  setActiveConversationId,
  setConversations,
  setMessages,
  workspaceId,
}: {
  activeToken: string;
  role: WorkspaceRole;
  setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"];
  setConversations: UseWorkspaceShellEffectsProps["setConversations"];
  setMessages: UseWorkspaceShellEffectsProps["setMessages"];
  workspaceId: string;
}) {
  const conversationResult = await listConversations(activeToken, workspaceId);
  let items = conversationResult.items;
  if (!items.length && canManageWorkspace(role)) {
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
}

export async function loadWorkspaceShellManagedState({
  activeToken,
  role,
  setLatestSharePath,
  setMediaDeadLetterOverview,
  setProviderConfigs,
  setShareLinks,
  workspaceId,
}: {
  activeToken: string;
  role: WorkspaceRole;
  setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"];
  setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"];
  setProviderConfigs: UseWorkspaceShellEffectsProps["setProviderConfigs"];
  setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"];
  workspaceId: string;
}) {
  if (canManageWorkspace(role)) {
    await refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview);
    await refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs);
    if (role === "owner") {
      await refreshShareLinkItems(activeToken, workspaceId, setShareLinks);
    } else {
      setShareLinks([]);
      setLatestSharePath("");
    }
    return;
  }

  setMediaDeadLetterOverview(null);
  setProviderConfigs([]);
  setShareLinks([]);
  setLatestSharePath("");
}

export async function loadWorkspaceShellInitialData({
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
}: {
  activeToken: string;
  setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"];
  setAuditLogs: UseWorkspaceShellEffectsProps["setAuditLogs"];
  setConversations: UseWorkspaceShellEffectsProps["setConversations"];
  setKnowledgeStats: UseWorkspaceShellEffectsProps["setKnowledgeStats"];
  setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"];
  setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"];
  setMediaProcessingOverview: UseWorkspaceShellEffectsProps["setMediaProcessingOverview"];
  setMediaStorageSummary: UseWorkspaceShellEffectsProps["setMediaStorageSummary"];
  setMessages: UseWorkspaceShellEffectsProps["setMessages"];
  setNotifications: UseWorkspaceShellEffectsProps["setNotifications"];
  setProviderConfigs: UseWorkspaceShellEffectsProps["setProviderConfigs"];
  setRecords: UseWorkspaceShellEffectsProps["setRecords"];
  setSearchPresets: UseWorkspaceShellEffectsProps["setSearchPresets"];
  setSelectedRecordId: UseWorkspaceShellEffectsProps["setSelectedRecordId"];
  setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"];
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
}
