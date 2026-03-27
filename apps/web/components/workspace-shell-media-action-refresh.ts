"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";

type WorkspaceShellMediaActionRefreshers = Pick<
  UseWorkspaceShellActionsProps,
  | "refreshAuditLogs"
  | "refreshKnowledge"
  | "refreshMedia"
  | "refreshMediaDeadLetterOverview"
  | "refreshMediaProcessingOverview"
  | "refreshMediaStorageSummary"
>;

export async function refreshWorkspaceShellMediaUpload(
  refreshers: WorkspaceShellMediaActionRefreshers,
  activeToken: string,
  recordId: string,
) {
  await refreshers.refreshMedia(activeToken, recordId);
  await refreshers.refreshMediaStorageSummary(activeToken);
  await refreshers.refreshMediaProcessingOverview(activeToken);
  await refreshers.refreshMediaDeadLetterOverview(activeToken);
  await refreshers.refreshKnowledge(activeToken);
  await refreshers.refreshAuditLogs(activeToken);
}

export async function refreshWorkspaceShellMediaMutation(
  refreshers: WorkspaceShellMediaActionRefreshers,
  activeToken: string,
  recordId: string | null,
) {
  await refreshers.refreshMedia(activeToken, recordId);
  await refreshers.refreshMediaProcessingOverview(activeToken);
  await refreshers.refreshMediaDeadLetterOverview(activeToken);
  await refreshers.refreshKnowledge(activeToken);
  await refreshers.refreshAuditLogs(activeToken);
}

export async function refreshWorkspaceShellMediaStatusViews(
  refreshers: Pick<
    WorkspaceShellMediaActionRefreshers,
    | "refreshMedia"
    | "refreshMediaDeadLetterOverview"
    | "refreshMediaProcessingOverview"
  >,
  activeToken: string,
  recordId: string | null,
) {
  await refreshers.refreshMedia(activeToken, recordId);
  await refreshers.refreshMediaProcessingOverview(activeToken);
  await refreshers.refreshMediaDeadLetterOverview(activeToken);
}
