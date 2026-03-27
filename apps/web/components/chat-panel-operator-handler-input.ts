"use client";

import type { BuildChatPanelOperatorHandlerInput } from "./chat-panel-action-handler-inputs.types";

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
