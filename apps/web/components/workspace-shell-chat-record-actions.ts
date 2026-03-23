"use client";

import {
  createConversation,
  createRecord,
  deleteRecord,
  sendMessage,
  updateRecord,
} from "../lib/api";
import { buildTimelineDays } from "../lib/timeline";
import type {
  UseWorkspaceShellActionsProps,
  WorkspaceShellSaveRecordInput,
} from "./workspace-shell-actions.types";
import {
  requireActiveConversationContext,
  requireWritableWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellChatRecordActions(props: UseWorkspaceShellActionsProps) {
  const {
    token,
    workspaceId,
    activeConversationId,
    canWriteWorkspace,
    conversationsCount,
    recordFilter,
    records,
    loadConversationMessages,
    refreshAuditLogs,
    refreshKnowledge,
    refreshMediaDeadLetterOverview,
    refreshMediaProcessingOverview,
    refreshMediaStorageSummary,
    refreshRecords,
    setActiveConversationId,
    setConversations,
    setMessages,
    setSelectedRecordId,
    setTimelineDays,
    setVisibleRecords,
  } = props;

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
    const result = await createConversation(
      activeToken,
      workspaceId,
      `Chat ${conversationsCount + 1}`,
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

  async function handleSaveRecord(input: WorkspaceShellSaveRecordInput) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);

    if (input.recordId) {
      await updateRecord(activeToken, workspaceId, input.recordId, {
        title: input.title,
        content: input.content,
        rating: input.rating ?? null,
        occurred_at: input.occurred_at,
        is_avoid: input.is_avoid,
        extra_data: input.extra_data,
      });
      await refreshRecords(activeToken, recordFilter);
      await refreshKnowledge(activeToken);
      await refreshAuditLogs(activeToken);
      setSelectedRecordId(input.recordId);
      return;
    }

    const result = await createRecord(activeToken, workspaceId, {
      title: input.title,
      content: input.content,
      type_code: input.type_code,
      rating: input.rating ?? undefined,
      occurred_at: input.occurred_at,
      is_avoid: input.is_avoid,
      source_type: "manual",
      extra_data: input.extra_data,
    });
    await refreshRecords(activeToken, recordFilter);
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
    setSelectedRecordId(result.record.id);
  }

  async function handleDeleteRecord(recordId: string) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await deleteRecord(activeToken, workspaceId, recordId);
    const nextRecords = records.filter((record) => record.id !== recordId);
    setSelectedRecordId(nextRecords[0]?.id ?? null);
    await refreshRecords(activeToken, recordFilter);
    await refreshMediaStorageSummary(activeToken);
    await refreshMediaProcessingOverview(activeToken);
    await refreshMediaDeadLetterOverview(activeToken);
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleSendMessage,
    handleCreateConversation,
    handleSelectConversation,
    handleSaveRecord,
    handleDeleteRecord,
  };
}
