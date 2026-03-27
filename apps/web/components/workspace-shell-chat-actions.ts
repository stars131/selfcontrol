"use client";

import { createConversation, sendMessage } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import {
  requireActiveConversationContext,
  requireWritableWorkspaceToken,
} from "./workspace-shell-action-guards";
import {
  applyWorkspaceShellConversationCreation,
  buildWorkspaceShellConversationTitle,
} from "./workspace-shell-chat-action-conversations";
import {
  applyWorkspaceShellChatSearchResult,
  selectWorkspaceShellChatCreatedRecord,
} from "./workspace-shell-chat-action-results";
import { refreshWorkspaceShellRecordMutation } from "./workspace-shell-record-action-refresh";

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
      await refreshWorkspaceShellRecordMutation(
        { refreshRecords, refreshKnowledge, refreshAuditLogs },
        activeToken,
        recordFilter,
      );
      selectWorkspaceShellChatCreatedRecord(setSelectedRecordId, result.records);
      return;
    }

    applyWorkspaceShellChatSearchResult(
      { setVisibleRecords, setTimelineDays, setSelectedRecordId },
      result.records,
    );
  }

  async function handleCreateConversation() {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    const result = await createConversation(
      activeToken,
      workspaceId,
      buildWorkspaceShellConversationTitle(conversationsCount),
    );
    applyWorkspaceShellConversationCreation(
      { setConversations, setActiveConversationId, setMessages },
      result.conversation,
    );
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
