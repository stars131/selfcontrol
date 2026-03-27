"use client";

import { createConversation, sendMessage } from "../lib/api";
import { buildTimelineDays } from "../lib/timeline";
import { getStoredChatPanelDisplayCopy } from "./chat-panel-display-copy";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import {
  requireActiveConversationContext,
  requireWritableWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellChatActions({
  activeConversationId,
  canWriteWorkspace,
  conversationsCount,
  loadConversationMessages,
  recordFilter,
  refreshAuditLogs,
  refreshKnowledge,
  refreshRecords,
  setActiveConversationId,
  setConversations,
  setMessages,
  setSelectedRecordId,
  setTimelineDays,
  setVisibleRecords,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleSendMessage(message: string) {
    const { activeToken, conversationId } = requireActiveConversationContext(
      token,
      activeConversationId,
      canWriteWorkspace,
    );

    const result = await sendMessage(activeToken, workspaceId, conversationId, message);
    setMessages((prev) => [...prev, result.user_message, result.assistant_message]);

    const mode = String(result.assistant_message.metadata_json.mode ?? "");
    if (mode === "create") {
      await refreshRecords(activeToken, recordFilter);
      await refreshKnowledge(activeToken);
      await refreshAuditLogs(activeToken);
      if (result.records[0]) {
        setSelectedRecordId(result.records[0].id);
      }
      return;
    }

    setVisibleRecords(result.records);
    setTimelineDays(buildTimelineDays(result.records));
    setSelectedRecordId(result.records[0]?.id ?? null);
  }

  async function handleCreateConversation() {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    const copy = getStoredChatPanelDisplayCopy();
    const result = await createConversation(
      activeToken,
      workspaceId,
      copy.buildConversationTitle(conversationsCount + 1),
    );
    setConversations((prev) => [result.conversation, ...prev]);
    setActiveConversationId(result.conversation.id);
    setMessages([]);
  }

  function handleSelectConversation(conversationId: string) {
    if (!token) {
      return;
    }
    setActiveConversationId(conversationId);
    void loadConversationMessages(token, conversationId);
  }

  return {
    handleSendMessage,
    handleCreateConversation,
    handleSelectConversation,
  };
}
