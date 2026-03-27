"use client";

import type { ChatAuditLogsCardProps } from "./chat-audit-logs-card.types";
import type { ChatNotificationsCardProps } from "./chat-notifications-card.types";
import type { ChatPanelManagementContentProps } from "./chat-panel-content.types";
import type { ChatPanelManagementSectionProps } from "./chat-panel-management-section.types";

export function buildChatPanelManagementSectionProps({
  canManageSharing,
  canManageWorkspace,
  creatingShare,
  disablingShareId,
  knowledgeStats,
  latestShareUrl,
  handleCreateShareLink,
  handleDisableShareLink,
  handleReindexKnowledge,
  reindexing,
  setShareMaxUses,
  setShareName,
  setSharePermission,
  shareLinks,
  shareMaxUses,
  shareName,
  sharePermission,
}: ChatPanelManagementContentProps): ChatPanelManagementSectionProps {
  return {
    canManageSharing,
    canManageWorkspace,
    creatingShare,
    disablingShareId,
    knowledgeStats,
    latestShareUrl,
    onCreateShareLink: handleCreateShareLink,
    onDisableShareLink: handleDisableShareLink,
    onReindexKnowledge: handleReindexKnowledge,
    reindexing,
    setShareMaxUses,
    setShareName,
    setSharePermission,
    shareLinks,
    shareMaxUses,
    shareName,
    sharePermission,
  };
}

export function buildChatAuditLogsCardProps({
  auditLogs,
  handleRefreshAuditLogs,
  refreshingAudit,
}: ChatPanelManagementContentProps): ChatAuditLogsCardProps {
  return {
    auditLogs,
    onRefreshAuditLogs: handleRefreshAuditLogs,
    refreshingAudit,
  };
}

export function buildChatNotificationsCardProps({
  notifications,
  onMarkNotificationRead,
  unreadCount,
}: ChatPanelManagementContentProps): ChatNotificationsCardProps {
  return {
    notifications,
    onMarkNotificationRead,
    unreadCount,
  };
}
