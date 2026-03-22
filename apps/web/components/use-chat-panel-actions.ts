"use client";

import { useMemo, useState } from "react";

import type { NotificationItem } from "../lib/types";

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

function buildShareUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }
  return `${window.location.origin}${path}`;
}

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const latestShareUrl = useMemo(() => (latestSharePath ? buildShareUrl(latestSharePath) : ""), [latestSharePath]);

  const handleSend = async () => {
    const value = draft.trim();
    if (!value) {
      return;
    }

    setLoading(true);
    setError("");
    setDraft("");

    try {
      await onSendMessage(value);
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Request failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleSyncNotifications = async () => {
    setSyncing(true);
    setError("");
    try {
      await onSyncNotifications();
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Sync failed"));
    } finally {
      setSyncing(false);
    }
  };

  const handleReindexKnowledge = async () => {
    setReindexing(true);
    setError("");
    try {
      await onReindexKnowledge();
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Reindex failed"));
    } finally {
      setReindexing(false);
    }
  };

  const handleRefreshAuditLogs = async () => {
    setRefreshingAudit(true);
    setError("");
    try {
      await onRefreshAuditLogs();
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Audit refresh failed"));
    } finally {
      setRefreshingAudit(false);
    }
  };

  const handleCreateShareLink = async () => {
    setCreatingShare(true);
    setError("");
    try {
      await onCreateShareLink({
        name: shareName || undefined,
        permission_code: sharePermission,
        max_uses: shareMaxUses ? Number(shareMaxUses) : null,
      });
      setShareName("");
      setShareMaxUses("");
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Share creation failed"));
    } finally {
      setCreatingShare(false);
    }
  };

  const handleDisableShareLink = async (shareLinkId: string) => {
    setDisablingShareId(shareLinkId);
    setError("");
    try {
      await onDisableShareLink(shareLinkId);
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Share update failed"));
    } finally {
      setDisablingShareId("");
    }
  };

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
