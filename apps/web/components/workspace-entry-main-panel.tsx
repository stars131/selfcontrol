"use client";
import { WorkspaceEntryPanelBody } from "./workspace-entry-panel-body";
import { WorkspaceEntryHeader } from "./workspace-entry-header";
import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";

export function WorkspaceEntryMainPanel({ copy, creating, error, fileInputRef, importFile, importName, importSlug, importing, jobsLoading, joining, locale, name, onAcceptShare, onCreate, onDownloadTransferJob, onImportFileChange, onImportNameChange, onImportSlugChange, onImportWorkspace, onLocaleChange, onLogout, onNameChange, onPreviewShare, onQueueImportJob, onRefreshJobs, onShareTokenInputChange, previewing, queueingImportJob, sharePreview, shareTokenInput, suggestedSlug, token, transferJobs, username, workspaces }: WorkspaceEntryMainPanelProps) {
  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <WorkspaceEntryHeader copy={copy} locale={locale} onLocaleChange={onLocaleChange} onLogout={onLogout} username={username} />
        <WorkspaceEntryPanelBody copy={copy} creating={creating} error={error} fileInputRef={fileInputRef} importFile={importFile} importName={importName} importSlug={importSlug} importing={importing} jobsLoading={jobsLoading} joining={joining} locale={locale} name={name} onAcceptShare={onAcceptShare} onCreate={onCreate} onDownloadTransferJob={onDownloadTransferJob} onImportFileChange={onImportFileChange} onImportNameChange={onImportNameChange} onImportSlugChange={onImportSlugChange} onImportWorkspace={onImportWorkspace} onNameChange={onNameChange} onPreviewShare={onPreviewShare} onQueueImportJob={onQueueImportJob} onRefreshJobs={onRefreshJobs} onShareTokenInputChange={onShareTokenInputChange} previewing={previewing} queueingImportJob={queueingImportJob} sharePreview={sharePreview} shareTokenInput={shareTokenInput} suggestedSlug={suggestedSlug} token={token} transferJobs={transferJobs} workspaces={workspaces} />
      </section>
    </main>
  );
}
