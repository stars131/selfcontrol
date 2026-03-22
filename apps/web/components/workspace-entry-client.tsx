"use client";

import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import { getWorkspaceEntryCopy } from "./workspace-entry-copy";
import { useWorkspaceEntryController } from "./use-workspace-entry-controller";
import { WorkspaceEntryMainPanel } from "./workspace-entry-main-panel";

export function WorkspaceEntryClient() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getWorkspaceEntryCopy(locale);
  const {
    fileInputRef,
    token,
    user,
    workspaces,
    name,
    shareTokenInput,
    importName,
    importSlug,
    importFile,
    transferJobs,
    sharePreview,
    loading,
    error,
    creating,
    importing,
    queueingImportJob,
    joining,
    previewing,
    jobsLoading,
    suggestedSlug,
    setName,
    setShareTokenInput,
    setImportName,
    setImportSlug,
    setImportFile,
    handleCreate,
    handleImportWorkspace,
    handleQueueImportJob,
    handlePreviewShare,
    handleAcceptShare,
    handleLogout,
    handleDownloadTransferJob,
    loadTransferJobs,
  } = useWorkspaceEntryController(router);

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">{copy.loading}</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <WorkspaceEntryMainPanel
      copy={copy}
      creating={creating}
      error={error}
      fileInputRef={fileInputRef}
      importFile={importFile}
      importName={importName}
      importSlug={importSlug}
      importing={importing}
      jobsLoading={jobsLoading}
      joining={joining}
      locale={locale}
      name={name}
      onAcceptShare={handleAcceptShare}
      onCreate={handleCreate}
      onDownloadTransferJob={handleDownloadTransferJob}
      onImportFileChange={setImportFile}
      onImportNameChange={setImportName}
      onImportSlugChange={setImportSlug}
      onImportWorkspace={handleImportWorkspace}
      onLocaleChange={setLocale}
      onLogout={handleLogout}
      onNameChange={setName}
      onPreviewShare={handlePreviewShare}
      onQueueImportJob={handleQueueImportJob}
      onRefreshJobs={() => (token ? loadTransferJobs(token) : Promise.resolve())}
      onShareTokenInputChange={setShareTokenInput}
      previewing={previewing}
      queueingImportJob={queueingImportJob}
      sharePreview={sharePreview}
      shareTokenInput={shareTokenInput}
      suggestedSlug={suggestedSlug}
      token={token}
      transferJobs={transferJobs}
      username={user?.username}
      workspaces={workspaces}
    />
  );
}
