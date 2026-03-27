"use client";

import type { RecordFilterState } from "../lib/types";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";

type WorkspaceShellRecordActionRefreshers = Pick<
  UseWorkspaceShellActionsProps,
  | "refreshAuditLogs"
  | "refreshKnowledge"
  | "refreshMediaDeadLetterOverview"
  | "refreshMediaProcessingOverview"
  | "refreshMediaStorageSummary"
  | "refreshRecords"
>;

export async function refreshWorkspaceShellRecordMutation(
  refreshers: Pick<
    WorkspaceShellRecordActionRefreshers,
    "refreshAuditLogs" | "refreshKnowledge" | "refreshRecords"
  >,
  activeToken: string,
  recordFilter: RecordFilterState,
) {
  await refreshers.refreshRecords(activeToken, recordFilter);
  await refreshers.refreshKnowledge(activeToken);
  await refreshers.refreshAuditLogs(activeToken);
}

export async function refreshWorkspaceShellRecordDeletion(
  refreshers: WorkspaceShellRecordActionRefreshers,
  activeToken: string,
  recordFilter: RecordFilterState,
) {
  await refreshWorkspaceShellRecordMutation(refreshers, activeToken, recordFilter);
  await refreshers.refreshMediaStorageSummary(activeToken);
  await refreshers.refreshMediaProcessingOverview(activeToken);
  await refreshers.refreshMediaDeadLetterOverview(activeToken);
}
