"use client";

import { getStoredChatPanelActionCopy } from "./chat-panel-action-copy";
import { getChatPanelActionErrorMessage } from "./chat-panel-action-helpers";
import type { CreateChatPanelOperatorHandlersInput } from "./chat-panel-operator-handlers.types";

export function createChatPanelAdminHandlers({
  onRefreshAuditLogs,
  onReindexKnowledge,
  onSyncNotifications,
  setError, setRefreshingAudit, setReindexing, setSyncing,
}: CreateChatPanelOperatorHandlersInput) {
  const copy = getStoredChatPanelActionCopy();
  return {
    async handleSyncNotifications() {
      setSyncing(true);
      setError("");
      try {
        await onSyncNotifications();
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, copy.syncFailed));
      } finally { setSyncing(false); }
    },
    async handleReindexKnowledge() {
      setReindexing(true);
      setError("");
      try {
        await onReindexKnowledge();
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, copy.reindexFailed));
      } finally { setReindexing(false); }
    },
    async handleRefreshAuditLogs() {
      setRefreshingAudit(true);
      setError("");
      try {
        await onRefreshAuditLogs();
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, copy.auditRefreshFailed));
      } finally { setRefreshingAudit(false); }
    },
  };
}
