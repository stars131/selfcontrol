"use client";

import type { ChatPanelProps } from "./chat-panel.types";

type ChatPanelActionBindings = ReturnType<
  typeof import("./use-chat-panel-actions").useChatPanelActions
>;

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
  ChatPanelActionBindings;

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
