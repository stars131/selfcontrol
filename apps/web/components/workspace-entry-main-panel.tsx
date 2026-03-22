"use client";

import type { FormEvent, RefObject } from "react";

import type { LocaleCode } from "../lib/locale";
import type { SharePreview, Workspace, WorkspaceTransferJob } from "../lib/types";
import type { WorkspaceEntryCopy } from "./workspace-entry-copy";
import { WorkspaceCreateSection } from "./workspace-create-section";
import { WorkspaceEntryHeader } from "./workspace-entry-header";
import { WorkspaceImportSection } from "./workspace-import-section";
import { WorkspaceJoinSection } from "./workspace-join-section";
import { WorkspaceListSection } from "./workspace-list-section";
import { WorkspaceTransferJobsSection } from "./workspace-transfer-jobs-section";

type WorkspaceEntryMainPanelProps = {
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

export function WorkspaceEntryMainPanel({
  copy,
  creating,
  error,
  fileInputRef,
  importFile,
  importName,
  importSlug,
  importing,
  jobsLoading,
  joining,
  locale,
  name,
  onAcceptShare,
  onCreate,
  onDownloadTransferJob,
  onImportFileChange,
  onImportNameChange,
  onImportSlugChange,
  onImportWorkspace,
  onLocaleChange,
  onLogout,
  onNameChange,
  onPreviewShare,
  onQueueImportJob,
  onRefreshJobs,
  onShareTokenInputChange,
  previewing,
  queueingImportJob,
  sharePreview,
  shareTokenInput,
  suggestedSlug,
  token,
  transferJobs,
  username,
  workspaces,
}: WorkspaceEntryMainPanelProps) {
  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <WorkspaceEntryHeader
          copy={copy}
          locale={locale}
          onLocaleChange={onLocaleChange}
          onLogout={onLogout}
          username={username}
        />
        <div className="panel-body">
          {error ? <div className="notice error">{error}</div> : null}
          <div className="two-column-grid">
            <WorkspaceCreateSection
              copy={copy}
              creating={creating}
              name={name}
              onNameChange={onNameChange}
              onSubmit={onCreate}
              suggestedSlug={suggestedSlug}
            />

            <WorkspaceJoinSection
              copy={copy}
              joining={joining}
              onAcceptShare={onAcceptShare}
              onPreviewShare={onPreviewShare}
              onShareTokenInputChange={onShareTokenInputChange}
              previewing={previewing}
              sharePreview={sharePreview}
              shareTokenInput={shareTokenInput}
            />

            <WorkspaceImportSection
              copy={copy}
              fileInputRef={fileInputRef}
              importFile={importFile}
              importName={importName}
              importSlug={importSlug}
              importing={importing}
              onImportFileChange={onImportFileChange}
              onImportNameChange={onImportNameChange}
              onImportSlugChange={onImportSlugChange}
              onImportWorkspace={onImportWorkspace}
              onQueueImportJob={onQueueImportJob}
              queueingImportJob={queueingImportJob}
            />

            <WorkspaceListSection copy={copy} workspaces={workspaces} />

            <WorkspaceTransferJobsSection
              copy={copy}
              jobsLoading={jobsLoading}
              locale={locale}
              token={token}
              transferJobs={transferJobs}
              onDownloadTransferJob={onDownloadTransferJob}
              onRefreshJobs={onRefreshJobs}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
