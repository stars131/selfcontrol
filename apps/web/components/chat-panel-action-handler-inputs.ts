"use client";

import type { ChatPanelActionDerivedData } from "./chat-panel-action-derived-data-result.types";
import type { ChatPanelActionState } from "./chat-panel-action-state-result.types";
import type {
  BuildChatPanelActionsResultInput,
  BuildChatPanelOperatorHandlerInput,
  BuildChatPanelShareHandlerInput,
} from "./chat-panel-action-handler-inputs.types";

export function buildChatPanelOperatorHandlerInput({
  props,
  state,
}: BuildChatPanelOperatorHandlerInput) {
  return {
    draft: state.draft,
    onRefreshAuditLogs: props.onRefreshAuditLogs,
    onReindexKnowledge: props.onReindexKnowledge,
    onSendMessage: props.onSendMessage,
    onSyncNotifications: props.onSyncNotifications,
    setDraft: state.setDraft,
    setError: state.setError,
    setLoading: state.setLoading,
    setRefreshingAudit: state.setRefreshingAudit,
    setReindexing: state.setReindexing,
    setSyncing: state.setSyncing,
  };
}

export function buildChatPanelShareHandlerInput({
  props,
  state,
}: BuildChatPanelShareHandlerInput) {
  return {
    onCreateShareLink: props.onCreateShareLink,
    onDisableShareLink: props.onDisableShareLink,
    setCreatingShare: state.setCreatingShare,
    setDisablingShareId: state.setDisablingShareId,
    setError: state.setError,
    setShareMaxUses: state.setShareMaxUses,
    setShareName: state.setShareName,
    shareMaxUses: state.shareMaxUses,
    shareName: state.shareName,
    sharePermission: state.sharePermission,
  };
}

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
