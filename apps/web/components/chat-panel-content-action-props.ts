"use client";

import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";

export function buildChatPanelContentActionProps(props: BuildChatPanelContentPropsInput) {
  return {
    creatingShare: props.actions.creatingShare,
    disablingShareId: props.actions.disablingShareId,
    draft: props.actions.draft,
    error: props.actions.error,
    handleCreateShareLink: props.actions.handleCreateShareLink,
    handleDisableShareLink: props.actions.handleDisableShareLink,
    handleRefreshAuditLogs: props.actions.handleRefreshAuditLogs,
    handleReindexKnowledge: props.actions.handleReindexKnowledge,
    handleSend: props.actions.handleSend,
    handleSyncNotifications: props.actions.handleSyncNotifications,
    latestShareUrl: props.actions.latestShareUrl,
    loading: props.actions.loading,
    refreshingAudit: props.actions.refreshingAudit,
    reindexing: props.actions.reindexing,
    setDraft: props.actions.setDraft,
    setShareMaxUses: props.actions.setShareMaxUses,
    setShareName: props.actions.setShareName,
    setSharePermission: props.actions.setSharePermission,
    shareMaxUses: props.actions.shareMaxUses,
    shareName: props.actions.shareName,
    sharePermission: props.actions.sharePermission,
    syncing: props.actions.syncing,
    unreadCount: props.actions.unreadCount,
  };
}
