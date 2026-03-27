"use client";

import { createRecord, deleteRecord, updateRecord } from "../lib/api";
import type {
  UseWorkspaceShellActionsProps,
  WorkspaceShellSaveRecordInput,
} from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import {
  refreshWorkspaceShellRecordDeletion,
  refreshWorkspaceShellRecordMutation,
} from "./workspace-shell-record-action-refresh";

export function createWorkspaceShellRecordActions({
  canWriteWorkspace,
  recordFilter,
  records,
  refreshAuditLogs,
  refreshKnowledge,
  refreshMediaDeadLetterOverview,
  refreshMediaProcessingOverview,
  refreshMediaStorageSummary,
  refreshRecords,
  setSelectedRecordId,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
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
      await refreshWorkspaceShellRecordMutation(
        { refreshRecords, refreshKnowledge, refreshAuditLogs },
        activeToken,
        recordFilter,
      );
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
    await refreshWorkspaceShellRecordMutation(
      { refreshRecords, refreshKnowledge, refreshAuditLogs },
      activeToken,
      recordFilter,
    );
    setSelectedRecordId(result.record.id);
  }

  async function handleDeleteRecord(recordId: string) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await deleteRecord(activeToken, workspaceId, recordId);
    const nextRecords = records.filter((record) => record.id !== recordId);
    setSelectedRecordId(nextRecords[0]?.id ?? null);
    await refreshWorkspaceShellRecordDeletion(
      {
        refreshRecords,
        refreshMediaStorageSummary,
        refreshMediaProcessingOverview,
        refreshMediaDeadLetterOverview,
        refreshKnowledge,
        refreshAuditLogs,
      },
      activeToken,
      recordFilter,
    );
  }

  return {
    handleSaveRecord,
    handleDeleteRecord,
  };
}
