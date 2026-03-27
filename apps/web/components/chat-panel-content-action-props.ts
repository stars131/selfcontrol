"use client";

import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";

export function buildChatPanelContentActionProps({
  actions,
}: BuildChatPanelContentPropsInput) {
  return {
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
    latestShareUrl: actions.latestShareUrl,
    loading: actions.loading,
    refreshingAudit: actions.refreshingAudit,
    reindexing: actions.reindexing,
    setDraft: actions.setDraft,
    setShareMaxUses: actions.setShareMaxUses,
    setShareName: actions.setShareName,
    setSharePermission: actions.setSharePermission,
    shareMaxUses: actions.shareMaxUses,
    shareName: actions.shareName,
    sharePermission: actions.sharePermission,
    syncing: actions.syncing,
    unreadCount: actions.unreadCount,
  };
}
