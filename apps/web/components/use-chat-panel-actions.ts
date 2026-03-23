"use client";

import { useMemo, useState } from "react";

import type { NotificationItem } from "../lib/types";
import {
  buildChatShareUrl,
  countUnreadNotifications,
} from "./chat-panel-action-helpers";
import { createChatPanelOperatorHandlers } from "./chat-panel-operator-handlers";
import { createChatPanelShareHandlers } from "./chat-panel-share-handlers";

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
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [refreshingAudit, setRefreshingAudit] = useState(false);
  const [creatingShare, setCreatingShare] = useState(false);
  const [disablingShareId, setDisablingShareId] = useState("");
  const [shareName, setShareName] = useState("");
  const [sharePermission, setSharePermission] = useState("viewer");
  const [shareMaxUses, setShareMaxUses] = useState("");
  const [error, setError] = useState("");
  const unreadCount = countUnreadNotifications(notifications);
  const latestShareUrl = useMemo(
    () => (latestSharePath ? buildChatShareUrl(latestSharePath) : ""),
    [latestSharePath],
  );
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
