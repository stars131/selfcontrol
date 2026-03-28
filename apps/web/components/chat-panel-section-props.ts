"use client";

import type {
  ChatPanelContentProps,
  ChatPanelConversationContentProps,
  ChatPanelManagementContentProps,
} from "./chat-panel-content.types";

export function buildChatPanelConversationContentProps(
  input: ChatPanelContentProps,
): ChatPanelConversationContentProps {
  return {
    activeConversationId: input.activeConversationId,
    canWriteWorkspace: input.canWriteWorkspace,
    conversations: input.conversations,
    draft: input.draft,
    error: input.error,
    handleSend: input.handleSend,
    handleSyncNotifications: input.handleSyncNotifications,
    loading: input.loading,
    messages: input.messages,
    onCreateConversation: input.onCreateConversation,
    onSelectConversation: input.onSelectConversation,
    setDraft: input.setDraft,
    syncing: input.syncing,
  };
}

export function buildChatPanelManagementContentProps(
  input: ChatPanelContentProps,
): ChatPanelManagementContentProps {
  return {
    auditLogs: input.auditLogs,
    canManageSharing: input.canManageSharing,
    canManageWorkspace: input.canManageWorkspace,
    creatingShare: input.creatingShare,
    disablingShareId: input.disablingShareId,
    handleCreateShareLink: input.handleCreateShareLink,
    handleDisableShareLink: input.handleDisableShareLink,
    handleRefreshAuditLogs: input.handleRefreshAuditLogs,
    handleReindexKnowledge: input.handleReindexKnowledge,
    knowledgeStats: input.knowledgeStats,
    latestShareUrl: input.latestShareUrl,
    notifications: input.notifications,
    onMarkNotificationRead: input.onMarkNotificationRead,
    refreshingAudit: input.refreshingAudit,
    reindexing: input.reindexing,
    setShareMaxUses: input.setShareMaxUses,
    setShareName: input.setShareName,
    setSharePermission: input.setSharePermission,
    shareLinks: input.shareLinks,
    shareMaxUses: input.shareMaxUses,
    shareName: input.shareName,
    sharePermission: input.sharePermission,
    unreadCount: input.unreadCount,
  };
}
