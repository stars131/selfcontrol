"use client";

import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";

export function buildChatPanelContentDataProps(props: BuildChatPanelContentPropsInput) {
  return {
    activeConversationId: props.activeConversationId,
    auditLogs: props.auditLogs,
    canManageSharing: props.canManageSharing,
    canManageWorkspace: props.canManageWorkspace,
    canWriteWorkspace: props.canWriteWorkspace,
    conversations: props.conversations,
    knowledgeStats: props.knowledgeStats,
    latestSharePath: props.latestSharePath,
    messages: props.messages,
    notifications: props.notifications,
    onCreateConversation: props.onCreateConversation,
    onCreateShareLink: props.onCreateShareLink,
    onDisableShareLink: props.onDisableShareLink,
    onMarkNotificationRead: props.onMarkNotificationRead,
    onRefreshAuditLogs: props.onRefreshAuditLogs,
    onReindexKnowledge: props.onReindexKnowledge,
    onSelectConversation: props.onSelectConversation,
    onSendMessage: props.onSendMessage,
    onSyncNotifications: props.onSyncNotifications,
    shareLinks: props.shareLinks,
  };
}
