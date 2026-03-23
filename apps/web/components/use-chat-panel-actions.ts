"use client";

import type { NotificationItem } from "../lib/types";
import { createChatPanelOperatorHandlers } from "./chat-panel-operator-handlers";
import { createChatPanelShareHandlers } from "./chat-panel-share-handlers";
import { useChatPanelActionDerivedData } from "./use-chat-panel-action-derived-data";
import { useChatPanelActionState } from "./use-chat-panel-action-state";

type UseChatPanelActionsProps = {
  latestSharePath: string;
  notifications: NotificationItem[];
  onCreateShareLink: (input: {
    name?: string;
    permission_code: string;
    max_uses?: number | null;
  }) => Promise<void>;
  onDisableShareLink: (shareLinkId: string) => Promise<void>;
  onRefreshAuditLogs: () => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  onSyncNotifications: () => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
};

export function useChatPanelActions({
  latestSharePath,
  notifications,
  onCreateShareLink,
  onDisableShareLink,
  onRefreshAuditLogs,
  onReindexKnowledge,
  onSyncNotifications,
  onSendMessage,
}: UseChatPanelActionsProps) {
  const {
    draft,
    setDraft,
    loading,
    setLoading,
    syncing,
    setSyncing,
    reindexing,
    setReindexing,
    refreshingAudit,
    setRefreshingAudit,
    creatingShare,
    setCreatingShare,
    disablingShareId,
    setDisablingShareId,
    shareName,
    setShareName,
    sharePermission,
    setSharePermission,
    shareMaxUses,
    setShareMaxUses,
    error,
    setError,
  } = useChatPanelActionState();
  const { unreadCount, latestShareUrl } = useChatPanelActionDerivedData({
    latestSharePath,
    notifications,
  });
  const {
    handleSend,
    handleSyncNotifications,
    handleReindexKnowledge,
    handleRefreshAuditLogs,
  } = createChatPanelOperatorHandlers({
    draft,
    onRefreshAuditLogs,
    onReindexKnowledge,
    onSendMessage,
    onSyncNotifications,
    setDraft,
    setError,
    setLoading,
    setRefreshingAudit,
    setReindexing,
    setSyncing,
  });
  const { handleCreateShareLink, handleDisableShareLink } = createChatPanelShareHandlers({
    onCreateShareLink,
    onDisableShareLink,
    setCreatingShare,
    setDisablingShareId,
    setError,
    setShareMaxUses,
    setShareName,
    shareMaxUses,
    shareName,
    sharePermission,
  });

  return {
    draft,
    loading,
    syncing,
    reindexing,
    refreshingAudit,
    creatingShare,
    disablingShareId,
    shareName,
    sharePermission,
    shareMaxUses,
    error,
    unreadCount,
    latestShareUrl,
    setDraft,
    setShareName,
    setSharePermission,
    setShareMaxUses,
    handleSend,
    handleSyncNotifications,
    handleReindexKnowledge,
    handleRefreshAuditLogs,
    handleCreateShareLink,
    handleDisableShareLink,
  };
}
