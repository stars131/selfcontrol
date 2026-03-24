import type { LocaleCode } from "../lib/locale";
import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";

export function buildWorkspaceEntryMainPanelProps(
  props: WorkspaceEntryMainPanelProps,
): WorkspaceEntryMainPanelProps {
  return props;
}

export function buildWorkspaceEntryRefreshJobs(
  token: string | null,
  loadTransferJobs: (activeToken: string) => Promise<void>,
) {
  return () => (token ? loadTransferJobs(token) : Promise.resolve());
}

export type WorkspaceEntryClientHelperInput = Pick<WorkspaceEntryMainPanelProps, "copy" | "creating" | "error" | "fileInputRef" | "importFile" | "importName" | "importSlug" | "importing" | "jobsLoading" | "joining" | "name" | "onAcceptShare" | "onCreate" | "onDownloadTransferJob" | "onImportFileChange" | "onImportNameChange" | "onImportSlugChange" | "onImportWorkspace" | "onLogout" | "onNameChange" | "onPreviewShare" | "onQueueImportJob" | "onShareTokenInputChange" | "previewing" | "queueingImportJob" | "sharePreview" | "shareTokenInput" | "suggestedSlug" | "token" | "transferJobs" | "username" | "workspaces"> & {
  locale: LocaleCode;
  onLocaleChange: WorkspaceEntryMainPanelProps["onLocaleChange"];
  onRefreshJobs: WorkspaceEntryMainPanelProps["onRefreshJobs"];
};
