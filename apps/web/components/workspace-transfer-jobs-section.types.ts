"use client";

import type { LocaleCode } from "../lib/locale";
import type { WorkspaceTransferJob } from "../lib/types";

export type WorkspaceTransferJobsCopy = {
  jobsEyebrow: string;
  jobsTitle: string;
  refreshJobs: string;
  openImportedWorkspace: string;
  downloadExportJob: string;
  noJobs: string;
};

export type WorkspaceTransferJobsSectionProps = {
  copy: WorkspaceTransferJobsCopy;
  locale: LocaleCode;
  token: string | null;
  jobsLoading: boolean;
  transferJobs: WorkspaceTransferJob[];
  onRefreshJobs: () => Promise<void>;
  onDownloadTransferJob: (jobId: string) => Promise<void>;
};
