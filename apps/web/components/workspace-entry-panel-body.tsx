"use client";
import { WorkspaceEntryErrorNotice } from "./workspace-entry-error-notice";
import type { WorkspaceEntryPanelBodyProps } from "./workspace-entry-panel-body.types";
import { WorkspaceEntrySectionsGrid } from "./workspace-entry-sections-grid";

export function WorkspaceEntryPanelBody({ copy, creating, error, fileInputRef, importFile, importName, importSlug, importing, jobsLoading, joining, locale, name, onAcceptShare, onCreate, onDownloadTransferJob, onImportFileChange, onImportNameChange, onImportSlugChange, onImportWorkspace, onNameChange, onPreviewShare, onQueueImportJob, onRefreshJobs, onShareTokenInputChange, previewing, queueingImportJob, sharePreview, shareTokenInput, suggestedSlug, token, transferJobs, workspaces }: WorkspaceEntryPanelBodyProps) {
  return (
    <div className="panel-body">
      <WorkspaceEntryErrorNotice error={error} />
      <WorkspaceEntrySectionsGrid copy={copy} creating={creating} fileInputRef={fileInputRef} importFile={importFile} importName={importName} importSlug={importSlug} importing={importing} jobsLoading={jobsLoading} joining={joining} locale={locale} name={name} onAcceptShare={onAcceptShare} onCreate={onCreate} onDownloadTransferJob={onDownloadTransferJob} onImportFileChange={onImportFileChange} onImportNameChange={onImportNameChange} onImportSlugChange={onImportSlugChange} onImportWorkspace={onImportWorkspace} onNameChange={onNameChange} onPreviewShare={onPreviewShare} onQueueImportJob={onQueueImportJob} onRefreshJobs={onRefreshJobs} onShareTokenInputChange={onShareTokenInputChange} previewing={previewing} queueingImportJob={queueingImportJob} sharePreview={sharePreview} shareTokenInput={shareTokenInput} suggestedSlug={suggestedSlug} token={token} transferJobs={transferJobs} workspaces={workspaces} />
    </div>
  );
}
