"use client";

import { getChatPanelActionErrorMessage } from "./chat-panel-action-helpers";

export function createChatPanelOperatorHandlers({
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
}: {
  draft: string;
  onRefreshAuditLogs: () => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
  onSyncNotifications: () => Promise<void>;
  setDraft: (value: string) => void;
  setError: (value: string) => void;
  setLoading: (value: boolean) => void;
  setRefreshingAudit: (value: boolean) => void;
  setReindexing: (value: boolean) => void;
  setSyncing: (value: boolean) => void;
}) {
  return {
    async handleSend() {
      const value = draft.trim();
      if (!value) {
        return;
      }

      setLoading(true);
      setError("");
      setDraft("");

      try {
        await onSendMessage(value);
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, "Request failed"));
      } finally {
        setLoading(false);
      }
    },
    async handleSyncNotifications() {
      setSyncing(true);
      setError("");
      try {
        await onSyncNotifications();
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, "Sync failed"));
      } finally {
        setSyncing(false);
      }
    },
    async handleReindexKnowledge() {
      setReindexing(true);
      setError("");
      try {
        await onReindexKnowledge();
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, "Reindex failed"));
      } finally {
        setReindexing(false);
      }
    },
    async handleRefreshAuditLogs() {
      setRefreshingAudit(true);
      setError("");
      try {
        await onRefreshAuditLogs();
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, "Audit refresh failed"));
      } finally {
        setRefreshingAudit(false);
      }
    },
  };
}
