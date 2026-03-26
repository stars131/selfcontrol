"use client";

import type { ChatPanelActions } from "./chat-panel-actions-result.types";
import type { ChatPanelContentProps } from "./chat-panel-content.types";
import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";

export function buildChatPanelContentProps({
  actions,
  props,
}: BuildChatPanelContentPropsInput): ChatPanelContentProps {
  return {
    activeConversationId: props.activeConversationId,
    auditLogs: props.auditLogs,
    canManageSharing: props.canManageSharing,
    canManageWorkspace: props.canManageWorkspace,
    canWriteWorkspace: props.canWriteWorkspace,
    conversations: props.conversations,
    creatingShare: actions.creatingShare,
    disablingShareId: actions.disablingShareId,
    draft: actions.draft,
    error: actions.error,
    handleCreateShareLink: actions.handleCreateShareLink,
    handleDisableShareLink: actions.handleDisableShareLink,
    handleRefreshAuditLogs: actions.handleRefreshAuditLogs,
    handleReindexKnowledge: actions.handleReindexKnowledge,
    handleSend: actions.handleSend,
    handleSyncNotifications: actions.handleSyncNotifications,
    knowledgeStats: props.knowledgeStats,
    latestSharePath: props.latestSharePath,
    latestShareUrl: actions.latestShareUrl,
    loading: actions.loading,
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
    refreshingAudit: actions.refreshingAudit,
    reindexing: actions.reindexing,
    setDraft: actions.setDraft,
    setShareMaxUses: actions.setShareMaxUses,
    setShareName: actions.setShareName,
    setSharePermission: actions.setSharePermission,
    shareLinks: props.shareLinks,
    shareMaxUses: actions.shareMaxUses,
    shareName: actions.shareName,
    sharePermission: actions.sharePermission,
    syncing: actions.syncing,
    unreadCount: actions.unreadCount,
  };
}
