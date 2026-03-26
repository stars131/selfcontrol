"use client";

import type { WorkspaceExportJobsListItemActionProps } from "./workspace-export-jobs-list-item-action.types";

export function WorkspaceExportJobsListItemAction({ actionLoading, downloadLabel, job, onDownload }: WorkspaceExportJobsListItemActionProps) {
  return job.status === "completed" ? <button className="button secondary" disabled={actionLoading} type="button" onClick={() => void onDownload(job.id)}>{downloadLabel}</button> : null;
}
