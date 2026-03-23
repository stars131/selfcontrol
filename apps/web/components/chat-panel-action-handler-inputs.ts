"use client";

import type { NotificationItem } from "../lib/types";
import type { useChatPanelActionDerivedData } from "./use-chat-panel-action-derived-data";
import type { useChatPanelActionState } from "./use-chat-panel-action-state";

type ChatPanelActionState = ReturnType<typeof useChatPanelActionState>;

export type UseChatPanelActionsProps = {
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

export function buildChatPanelOperatorHandlerInput({
  props,
  state,
}: {
  props: UseChatPanelActionsProps;
  state: ChatPanelActionState;
}) {
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
}: {
  props: UseChatPanelActionsProps;
  state: ChatPanelActionState;
}) {
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
}: {
  derivedData: ReturnType<typeof useChatPanelActionDerivedData>;
  operatorHandlers: {
    handleRefreshAuditLogs: () => Promise<void>;
    handleReindexKnowledge: () => Promise<void>;
    handleSend: () => Promise<void>;
    handleSyncNotifications: () => Promise<void>;
  };
  shareHandlers: {
    handleCreateShareLink: () => Promise<void>;
    handleDisableShareLink: (shareLinkId: string) => Promise<void>;
  };
  state: ChatPanelActionState;
}) {
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
