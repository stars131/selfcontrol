"use client";
import type { BuildChatPanelActionsResultInput } from "./chat-panel-action-handler-inputs.types";
export function buildChatPanelActionsResult({ creatingShare, disablingShareId, draft, error, latestShareUrl, loading, operatorHandlers, refreshingAudit, reindexing, setDraft, setShareMaxUses, setShareName, setSharePermission, shareMaxUses, shareName, sharePermission, shareHandlers, syncing, unreadCount }: BuildChatPanelActionsResultInput) {
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
    handleSend: operatorHandlers.handleSend,
    handleSyncNotifications: operatorHandlers.handleSyncNotifications,
    handleReindexKnowledge: operatorHandlers.handleReindexKnowledge,
    handleRefreshAuditLogs: operatorHandlers.handleRefreshAuditLogs,
    handleCreateShareLink: shareHandlers.handleCreateShareLink,
    handleDisableShareLink: shareHandlers.handleDisableShareLink,
  };
}
