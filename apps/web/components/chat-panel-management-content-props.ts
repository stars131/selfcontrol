"use client";

import type { ChatAuditLogsCardProps } from "./chat-audit-logs-card.types";
import type { ChatNotificationsCardProps } from "./chat-notifications-card.types";
import type { ChatPanelManagementContentProps } from "./chat-panel-content.types";
import type { ChatPanelManagementSectionProps } from "./chat-panel-management-section.types";

export function buildChatPanelManagementSectionProps(
  input: ChatPanelManagementContentProps,
): ChatPanelManagementSectionProps {
  return {
    canManageSharing: input.canManageSharing,
    canManageWorkspace: input.canManageWorkspace,
    creatingShare: input.creatingShare,
    disablingShareId: input.disablingShareId,
    knowledgeStats: input.knowledgeStats,
    latestShareUrl: input.latestShareUrl,
    onCreateShareLink: input.handleCreateShareLink,
    onDisableShareLink: input.handleDisableShareLink,
    onReindexKnowledge: input.handleReindexKnowledge,
    reindexing: input.reindexing,
    setShareMaxUses: input.setShareMaxUses,
    setShareName: input.setShareName,
    setSharePermission: input.setSharePermission,
    shareLinks: input.shareLinks,
    shareMaxUses: input.shareMaxUses,
    shareName: input.shareName,
    sharePermission: input.sharePermission,
  };
}

export function buildChatAuditLogsCardProps(
  input: ChatPanelManagementContentProps,
): ChatAuditLogsCardProps {
  return {
    auditLogs: input.auditLogs,
    onRefreshAuditLogs: input.handleRefreshAuditLogs,
    refreshingAudit: input.refreshingAudit,
  };
}

export function buildChatNotificationsCardProps(
  input: ChatPanelManagementContentProps,
): ChatNotificationsCardProps {
  return {
    notifications: input.notifications,
    onMarkNotificationRead: input.onMarkNotificationRead,
    unreadCount: input.unreadCount,
  };
}
