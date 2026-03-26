"use client";
import { WorkspaceExportJobsHeader } from "./workspace-export-jobs-header";
import { WorkspaceExportJobsList } from "./workspace-export-jobs-list";
import { WorkspaceExportJobsNotices } from "./workspace-export-jobs-notices";
import type { WorkspaceExportJobsContentProps } from "./workspace-export-jobs-content.types";

export function WorkspaceExportJobsContent({ headerProps, listProps, noticesProps }: WorkspaceExportJobsContentProps) {
  return <><WorkspaceExportJobsHeader {...headerProps} /><WorkspaceExportJobsNotices {...noticesProps} /><WorkspaceExportJobsList {...listProps} /></>;
}
