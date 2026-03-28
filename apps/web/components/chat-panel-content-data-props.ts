"use client";

import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";

export function buildChatPanelContentDataProps(input: BuildChatPanelContentPropsInput) {
  return {
    activeConversationId: input.activeConversationId,
    auditLogs: input.auditLogs,
    canManageSharing: input.canManageSharing,
    canManageWorkspace: input.canManageWorkspace,
    canWriteWorkspace: input.canWriteWorkspace,
    conversations: input.conversations,
    knowledgeStats: input.knowledgeStats,
    latestSharePath: input.latestSharePath,
    messages: input.messages,
    notifications: input.notifications,
    onCreateConversation: input.onCreateConversation,
    onCreateShareLink: input.onCreateShareLink,
    onDisableShareLink: input.onDisableShareLink,
    onMarkNotificationRead: input.onMarkNotificationRead,
    onRefreshAuditLogs: input.onRefreshAuditLogs,
    onReindexKnowledge: input.onReindexKnowledge,
    onSelectConversation: input.onSelectConversation,
    onSendMessage: input.onSendMessage,
    onSyncNotifications: input.onSyncNotifications,
    shareLinks: input.shareLinks,
  };
}
