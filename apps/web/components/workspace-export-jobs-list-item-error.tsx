"use client";

import type { WorkspaceExportJobsListItemErrorProps } from "./workspace-export-jobs-list-item-error.types";

export function WorkspaceExportJobsListItemError({ job }: WorkspaceExportJobsListItemErrorProps) {
  return job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null;
}
