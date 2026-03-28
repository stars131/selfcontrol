import type { WorkspaceEntryLoadingShellProps } from "./workspace-entry-loading-shell.types";
import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";
import type {
  WorkspaceEntryClientHelperInput,
  WorkspaceEntryClientViewInput,
  WorkspaceEntryClientViewProps,
} from "./workspace-entry-client-helpers.types";

export function buildWorkspaceEntryMainPanelProps(
  props: WorkspaceEntryClientHelperInput,
): WorkspaceEntryMainPanelProps {
  return props;
}

export function buildWorkspaceEntryRefreshJobs(
  token: string | null,
  loadTransferJobs: (activeToken: string) => Promise<void>,
) {
  return () => (token ? loadTransferJobs(token) : Promise.resolve());
}

export function buildWorkspaceEntryLoadingShellProps(
  loadingLabel: string,
): WorkspaceEntryLoadingShellProps {
  return { loadingLabel };
}

export function buildWorkspaceEntryClientViewProps(
  input: WorkspaceEntryClientViewInput,
): WorkspaceEntryClientViewProps {
  const onRefreshJobs = buildWorkspaceEntryRefreshJobs(
    input.controller.token,
    input.controller.loadTransferJobs,
  );
  return {
    showLoadingShell: input.controller.loading,
    loadingShellProps: buildWorkspaceEntryLoadingShellProps(input.copy.loading),
    mainPanelProps: buildWorkspaceEntryMainPanelProps({
      copy: input.copy,
      creating: input.controller.creating,
      error: input.controller.error,
      fileInputRef: input.controller.fileInputRef,
      importFile: input.controller.importFile,
      importName: input.controller.importName,
      importSlug: input.controller.importSlug,
      importing: input.controller.importing,
      jobsLoading: input.controller.jobsLoading,
      joining: input.controller.joining,
      locale: input.locale,
      name: input.controller.name,
      onAcceptShare: input.controller.handleAcceptShare,
      onCreate: input.controller.handleCreate,
      onDownloadTransferJob: input.controller.handleDownloadTransferJob,
      onImportFileChange: input.controller.setImportFile,
      onImportNameChange: input.controller.setImportName,
      onImportSlugChange: input.controller.setImportSlug,
      onImportWorkspace: input.controller.handleImportWorkspace,
      onLocaleChange: input.onLocaleChange,
      onLogout: input.controller.handleLogout,
      onNameChange: input.controller.setName,
      onPreviewShare: input.controller.handlePreviewShare,
      onQueueImportJob: input.controller.handleQueueImportJob,
      onRefreshJobs,
      onShareTokenInputChange: input.controller.setShareTokenInput,
      previewing: input.controller.previewing,
      queueingImportJob: input.controller.queueingImportJob,
      sharePreview: input.controller.sharePreview,
      shareTokenInput: input.controller.shareTokenInput,
      suggestedSlug: input.controller.suggestedSlug,
      token: input.controller.token,
      transferJobs: input.controller.transferJobs,
      username: input.controller.user?.username,
      workspaces: input.controller.workspaces,
    }),
  };
}
