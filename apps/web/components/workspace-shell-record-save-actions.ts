"use client";

import { createRecord, updateRecord } from "../lib/api";
import type { WorkspaceShellSaveRecordInput } from "./workspace-shell-action-inputs.types";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import { buildWorkspaceShellRecordCreatePayload, buildWorkspaceShellRecordUpdatePayload } from "./workspace-shell-record-action-payloads";
import { refreshWorkspaceShellRecordMutation } from "./workspace-shell-record-action-refresh";

export function createWorkspaceShellRecordSaveActions({
  canWriteWorkspace,
  recordFilter,
  refreshAuditLogs,
  refreshKnowledge,
  refreshRecords,
  setSelectedRecordId,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleSaveRecord(input: WorkspaceShellSaveRecordInput) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);

    if (input.recordId) {
      await updateRecord(activeToken, workspaceId, input.recordId, buildWorkspaceShellRecordUpdatePayload(input));
      await refreshWorkspaceShellRecordMutation(
        { refreshRecords, refreshKnowledge, refreshAuditLogs },
        activeToken,
        recordFilter,
      );
      setSelectedRecordId(input.recordId);
      return;
    }

    const result = await createRecord(activeToken, workspaceId, buildWorkspaceShellRecordCreatePayload(input));
    await refreshWorkspaceShellRecordMutation(
      { refreshRecords, refreshKnowledge, refreshAuditLogs },
      activeToken,
      recordFilter,
    );
    setSelectedRecordId(result.record.id);
  }

  return {
    handleSaveRecord,
  };
}
