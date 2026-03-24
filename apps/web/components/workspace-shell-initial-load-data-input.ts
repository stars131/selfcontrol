"use client";

import type { WorkspaceShellInitialLoadProps } from "./workspace-shell-effects.types";

export function buildWorkspaceShellInitialDataInput(
  activeToken: string,
  props: WorkspaceShellInitialLoadProps,
) {
  return {
    activeToken,
    setActiveConversationId: props.setActiveConversationId,
    setAuditLogs: props.setAuditLogs,
    setConversations: props.setConversations,
    setKnowledgeStats: props.setKnowledgeStats,
    setLatestSharePath: props.setLatestSharePath,
    setMediaDeadLetterOverview: props.setMediaDeadLetterOverview,
    setMediaProcessingOverview: props.setMediaProcessingOverview,
    setMediaStorageSummary: props.setMediaStorageSummary,
    setMessages: props.setMessages,
    setNotifications: props.setNotifications,
    setProviderConfigs: props.setProviderConfigs,
    setRecords: props.setRecords,
    setSearchPresets: props.setSearchPresets,
    setSelectedRecordId: props.setSelectedRecordId,
    setShareLinks: props.setShareLinks,
    setTimelineDays: props.setTimelineDays,
    setVisibleRecords: props.setVisibleRecords,
    setWorkspace: props.setWorkspace,
    workspaceId: props.workspaceId,
  };
}
