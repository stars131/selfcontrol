"use client";

import type { FormEvent, RefObject } from "react";

import type { LocaleCode } from "../lib/locale";
import type { SharePreview, Workspace, WorkspaceTransferJob } from "../lib/types";
import type { WorkspaceEntryCopy } from "./workspace-entry-copy";

export type WorkspaceEntryMainPanelProps = {
  copy: WorkspaceEntryCopy;
  creating: boolean;
  error: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  importFile: File | null;
  importName: string;
  importSlug: string;
  importing: boolean;
  jobsLoading: boolean;
  joining: boolean;
  locale: LocaleCode;
  name: string;
  onAcceptShare: () => Promise<void>;
  onCreate: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onDownloadTransferJob: (jobId: string) => Promise<void>;
  onImportFileChange: (file: File | null) => void;
  onImportNameChange: (value: string) => void;
  onImportSlugChange: (value: string) => void;
  onImportWorkspace: () => Promise<void>;
  onLocaleChange: (nextLocale: LocaleCode) => void;
  onLogout: () => void;
  onNameChange: (value: string) => void;
  onPreviewShare: () => Promise<void>;
  onQueueImportJob: () => Promise<void>;
  onRefreshJobs: () => Promise<void>;
  onShareTokenInputChange: (value: string) => void;
  previewing: boolean;
  queueingImportJob: boolean;
  sharePreview: SharePreview | null;
  shareTokenInput: string;
  suggestedSlug: string;
  token: string | null;
  transferJobs: WorkspaceTransferJob[];
  username?: string | null;
  workspaces: Workspace[];
};
