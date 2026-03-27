"use client";

import { deleteRecord } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import { refreshWorkspaceShellRecordDeletion } from "./workspace-shell-record-action-refresh";

export function createWorkspaceShellRecordDeleteActions({
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
    handleDeleteRecord,
  };
}
