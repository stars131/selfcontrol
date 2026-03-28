"use client";
import type { BuildChatPanelOperatorHandlerInput } from "./chat-panel-action-handler-inputs.types";
export function buildChatPanelOperatorHandlerInput({ draft, onRefreshAuditLogs, onReindexKnowledge, onSendMessage, onSyncNotifications, setDraft, setError, setLoading, setRefreshingAudit, setReindexing, setSyncing }: BuildChatPanelOperatorHandlerInput) {
  return {
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
  };
}
