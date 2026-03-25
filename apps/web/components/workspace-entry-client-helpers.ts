import type { WorkspaceEntryMainPanelProps } from "./workspace-entry-main-panel.types";
import type { WorkspaceEntryClientHelperInput } from "./workspace-entry-client-helpers.types";

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
