"use client";

import { loadWorkspaceShellInitialBootstrap } from "./workspace-shell-initial-bootstrap";
import { loadWorkspaceShellInitialFollowUp } from "./workspace-shell-initial-follow-up";
import type { LoadWorkspaceShellInitialDataInput } from "./workspace-shell-initial-load-helpers.types";

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
  setRecords,
  setSearchPresets,
  setSelectedRecordId,
  setShareLinks,
  setTimelineDays,
  setVisibleRecords,
  setWorkspace,
  workspaceId,
}: LoadWorkspaceShellInitialDataInput) {
  const { role } = await loadWorkspaceShellInitialBootstrap({
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
  });
  await loadWorkspaceShellInitialFollowUp({
    activeToken,
    role,
    setAuditLogs,
    setLatestSharePath,
    setMediaDeadLetterOverview,
    setSearchPresets,
    setShareLinks,
    workspaceId,
  });
}
