"use client";

import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";

export function buildChatPanelContentActionProps(input: BuildChatPanelContentPropsInput) {
  return {
    creatingShare: input.actions.creatingShare,
    disablingShareId: input.actions.disablingShareId,
    draft: input.actions.draft,
    error: input.actions.error,
    handleCreateShareLink: input.actions.handleCreateShareLink,
    handleDisableShareLink: input.actions.handleDisableShareLink,
    handleRefreshAuditLogs: input.actions.handleRefreshAuditLogs,
    handleReindexKnowledge: input.actions.handleReindexKnowledge,
    handleSend: input.actions.handleSend,
    handleSyncNotifications: input.actions.handleSyncNotifications,
    latestShareUrl: input.actions.latestShareUrl,
    loading: input.actions.loading,
    refreshingAudit: input.actions.refreshingAudit,
    reindexing: input.actions.reindexing,
    setDraft: input.actions.setDraft,
    setShareMaxUses: input.actions.setShareMaxUses,
    setShareName: input.actions.setShareName,
    setSharePermission: input.actions.setSharePermission,
    shareMaxUses: input.actions.shareMaxUses,
    shareName: input.actions.shareName,
    sharePermission: input.actions.sharePermission,
    syncing: input.actions.syncing,
    unreadCount: input.actions.unreadCount,
  };
}
