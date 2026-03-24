import type { Workspace } from "../lib/types";
import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types";
import type {
  WorkspaceSettingsProviderSectionBuilderInput,
  WorkspaceSettingsProviderSectionProps,
} from "./workspace-settings-provider-section.types";

export function readWorkspaceSettingsManagedRole(workspace: Workspace | null) {
  return workspace && workspace.role !== "viewer" ? workspace.role : null;
}

export function buildWorkspaceSettingsProviderSectionProps({
  copy,
  highlightedAnchor,
  locale,
  managedRole,
  mediaStorageHealth,
  providerConfigs,
  refreshingMediaStorageHealth,
  refreshMediaStorageHealthState,
  token,
  onSaveProviderConfig,
}: WorkspaceSettingsProviderSectionBuilderInput): WorkspaceSettingsProviderSectionProps {
  return {
    highlightedAnchor,
    locale,
    managedRole,
    mediaStorageHealth,
    onRefreshMediaStorageHealth: token ? async () => refreshMediaStorageHealthState(token) : null,
    onSaveProviderConfig,
    providerConfigs,
    refreshingMediaStorageHealth,
    providerTitle: copy.providerTitle,
    viewerNotice: copy.viewerNotice,
  };
}

export function buildWorkspaceSettingsManagedSectionsProps(
  props: WorkspaceSettingsManagedSectionsProps,
): WorkspaceSettingsManagedSectionsProps {
  return props;
}
