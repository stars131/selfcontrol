"use client";

import { WorkspaceCreateSection } from "./workspace-create-section";
import { WorkspaceImportSection } from "./workspace-import-section";
import { WorkspaceJoinSection } from "./workspace-join-section";
import { WorkspaceListSection } from "./workspace-list-section";
import { WorkspaceTransferJobsSection } from "./workspace-transfer-jobs-section";
import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";

type WorkspaceEntrySectionsGridProps = Omit<
  WorkspaceEntryMainPanelProps,
  "error" | "locale" | "onLocaleChange" | "onLogout" | "username"
> & {
  locale: WorkspaceEntryMainPanelProps["locale"];
};

export function WorkspaceEntrySectionsGrid({
  copy,
  creating,
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
  workspaces,
}: WorkspaceEntrySectionsGridProps) {
  return (
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
  );
}
