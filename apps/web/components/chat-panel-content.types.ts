"use client";

import type { ChatPanelActions } from "./chat-panel-actions-result.types";
import type { ChatPanelProps } from "./chat-panel.types";

export type ChatPanelContentProps = Pick<
  ChatPanelProps,
  | "activeConversationId"
  | "auditLogs"
  | "canManageSharing"
  | "canManageWorkspace"
  | "canWriteWorkspace"
  | "conversations"
  | "knowledgeStats"
  | "latestSharePath"
  | "messages"
  | "notifications"
  | "onCreateConversation"
  | "onCreateShareLink"
  | "onDisableShareLink"
  | "onMarkNotificationRead"
  | "onRefreshAuditLogs"
  | "onReindexKnowledge"
  | "onSaveProviderConfig"
  | "onSelectConversation"
  | "onSendMessage"
  | "onSyncNotifications"
  | "providerConfigs"
  | "shareLinks"
> &
  ChatPanelActions;

export type ChatPanelManagementContentProps = Pick<
  ChatPanelContentProps,
  | "auditLogs"
  | "canManageSharing"
  | "canManageWorkspace"
  | "creatingShare"
  | "disablingShareId"
  | "handleCreateShareLink"
  | "handleDisableShareLink"
  | "handleRefreshAuditLogs"
  | "handleReindexKnowledge"
  | "knowledgeStats"
  | "latestShareUrl"
  | "notifications"
  | "onMarkNotificationRead"
  | "onSaveProviderConfig"
  | "providerConfigs"
  | "refreshingAudit"
  | "reindexing"
  | "setShareMaxUses"
  | "setShareName"
  | "setSharePermission"
  | "shareLinks"
  | "shareMaxUses"
  | "shareName"
  | "sharePermission"
  | "unreadCount"
>;

export type ChatPanelConversationContentProps = Pick<
  ChatPanelContentProps,
  | "activeConversationId"
  | "canWriteWorkspace"
  | "conversations"
  | "draft"
  | "error"
  | "handleSend"
  | "handleSyncNotifications"
  | "loading"
  | "messages"
  | "onCreateConversation"
  | "onSelectConversation"
  | "setDraft"
  | "syncing"
>;
