"use client";

import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import {
  buildWorkspaceEntryMainPanelProps,
  buildWorkspaceEntryRefreshJobs,
} from "./workspace-entry-client-helpers";
import type { WorkspaceEntryClientProps } from "./workspace-entry-client.types";
import { getWorkspaceEntryCopy } from "./workspace-entry-copy";
import { useWorkspaceEntryController } from "./use-workspace-entry-controller";
import { WorkspaceEntryLoadingShell } from "./workspace-entry-loading-shell";
import { WorkspaceEntryMainPanel } from "./workspace-entry-main-panel";

export function WorkspaceEntryClient(_: WorkspaceEntryClientProps) {
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
    return <WorkspaceEntryLoadingShell loadingLabel={copy.loading} />;
  }

  return (
    <WorkspaceEntryMainPanel
      {...buildWorkspaceEntryMainPanelProps({
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
        onAcceptShare: handleAcceptShare,
        onCreate: handleCreate,
        onDownloadTransferJob: handleDownloadTransferJob,
        onImportFileChange: setImportFile,
        onImportNameChange: setImportName,
        onImportSlugChange: setImportSlug,
        onImportWorkspace: handleImportWorkspace,
        onLocaleChange: setLocale,
        onLogout: handleLogout,
        onNameChange: setName,
        onPreviewShare: handlePreviewShare,
        onQueueImportJob: handleQueueImportJob,
        onRefreshJobs: buildWorkspaceEntryRefreshJobs(token, loadTransferJobs),
        onShareTokenInputChange: setShareTokenInput,
        previewing,
        queueingImportJob,
        sharePreview,
        shareTokenInput,
        suggestedSlug,
        token,
        transferJobs,
        username: user?.username,
        workspaces,
      })}
    />
  );
}
