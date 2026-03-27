"use client";

import { sendMessage } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireActiveConversationContext } from "./workspace-shell-action-guards";
import { applyWorkspaceShellChatSearchResult, selectWorkspaceShellChatCreatedRecord } from "./workspace-shell-chat-action-results";
import { refreshWorkspaceShellRecordMutation } from "./workspace-shell-record-action-refresh";

export function createWorkspaceShellChatSendActions({
  activeConversationId,
  canWriteWorkspace,
  recordFilter,
  refreshAuditLogs,
  refreshKnowledge,
  refreshRecords,
  setMessages,
  setSelectedRecordId,
  setTimelineDays,
  setVisibleRecords,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleSendMessage(message: string) {
    const { activeToken, conversationId } = requireActiveConversationContext(token, activeConversationId, canWriteWorkspace);

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

  return {
    handleSendMessage,
  };
}
