"use client";

import type { BuildChatPanelActionsResultInput } from "./chat-panel-action-handler-inputs.types";

export function buildChatPanelActionsResult({
  derivedData,
  operatorHandlers,
  shareHandlers,
  state,
}: BuildChatPanelActionsResultInput) {
  return {
    draft: state.draft,
    loading: state.loading,
    syncing: state.syncing,
    reindexing: state.reindexing,
    refreshingAudit: state.refreshingAudit,
    creatingShare: state.creatingShare,
    disablingShareId: state.disablingShareId,
    shareName: state.shareName,
    sharePermission: state.sharePermission,
    shareMaxUses: state.shareMaxUses,
    error: state.error,
    unreadCount: derivedData.unreadCount,
    latestShareUrl: derivedData.latestShareUrl,
    setDraft: state.setDraft,
    setShareName: state.setShareName,
    setSharePermission: state.setSharePermission,
    setShareMaxUses: state.setShareMaxUses,
    handleSend: operatorHandlers.handleSend,
    handleSyncNotifications: operatorHandlers.handleSyncNotifications,
    handleReindexKnowledge: operatorHandlers.handleReindexKnowledge,
    handleRefreshAuditLogs: operatorHandlers.handleRefreshAuditLogs,
    handleCreateShareLink: shareHandlers.handleCreateShareLink,
    handleDisableShareLink: shareHandlers.handleDisableShareLink,
  };
}
