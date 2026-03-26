"use client";

import type { WorkspaceExportJobsEmptyStateProps } from "./workspace-export-jobs-empty-state.types";

export function WorkspaceExportJobsEmptyState({ emptyLabel }: WorkspaceExportJobsEmptyStateProps) {
  return <div className="notice">{emptyLabel}</div>;
}
