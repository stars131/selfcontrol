import type { Workspace } from "../lib/types";
import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types";
import type {
  WorkspaceSettingsProviderSectionBuilderInput,
  WorkspaceSettingsProviderSectionProps,
} from "./workspace-settings-provider-section.types";

export function readWorkspaceSettingsManagedRole(workspace: Workspace | null) {
  return workspace && workspace.role !== "viewer" ? workspace.role : null;
}

export function buildWorkspaceSettingsProviderSectionProps(
  input: WorkspaceSettingsProviderSectionBuilderInput,
): WorkspaceSettingsProviderSectionProps {
  const refreshToken = input.token;
  return {
    highlightedAnchor: input.highlightedAnchor,
    locale: input.locale,
    managedRole: input.managedRole,
    mediaStorageHealth: input.mediaStorageHealth,
    onRefreshMediaStorageHealth: refreshToken
      ? async () => input.refreshMediaStorageHealthState(refreshToken)
      : null,
    onSaveProviderConfig: input.onSaveProviderConfig,
    providerConfigs: input.providerConfigs,
    refreshingMediaStorageHealth: input.refreshingMediaStorageHealth,
    providerTitle: input.copy.providerTitle,
    viewerNotice: input.copy.viewerNotice,
  };
}

export function buildWorkspaceSettingsManagedSectionsProps(
  input: WorkspaceSettingsManagedSectionsProps,
): WorkspaceSettingsManagedSectionsProps {
  return input;
}
