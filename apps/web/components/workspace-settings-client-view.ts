import {
  buildWorkspaceSettingsManagedSectionsProps,
  buildWorkspaceSettingsProviderSectionProps,
  readWorkspaceSettingsManagedRole,
} from "./workspace-settings-client-helpers";
import type {
  WorkspaceSettingsClientViewInput,
  WorkspaceSettingsClientViewProps,
} from "./workspace-settings-client-view.types";
import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types";
import type { WorkspaceSettingsLoadingShellProps } from "./workspace-settings-loading-shell.types";
import type { WorkspaceSettingsMainContentProps } from "./workspace-settings-main-content.types";

export function buildWorkspaceSettingsLoadingShellProps(
  loadingLabel: string,
): WorkspaceSettingsLoadingShellProps {
  return { loadingLabel };
}

export function buildWorkspaceSettingsHeaderProps(
  input: WorkspaceSettingsClientViewInput,
): WorkspaceSettingsHeaderProps {
  return {
    copy: input.copy,
    locale: input.locale,
    onLocaleChange: input.onLocaleChange,
    username: input.controller.user?.username,
    workspace: input.controller.workspace,
    workspaceId: input.workspaceId,
  };
}

export function buildWorkspaceSettingsMainContentProps(
  input: WorkspaceSettingsClientViewInput,
): WorkspaceSettingsMainContentProps {
  const managedRole = readWorkspaceSettingsManagedRole(input.controller.workspace);
  return {
    copy: input.copy,
    error: input.controller.error,
    knowledgeStats: input.controller.knowledgeStats,
    managedSectionsProps: buildWorkspaceSettingsManagedSectionsProps({
      copy: input.copy,
      locale: input.locale,
      managedRole,
      members: input.controller.members,
      onRemoveMember: input.controller.handleRemoveMember,
      onUpdateMemberRole: input.controller.handleUpdateMemberRole,
      removingMemberId: input.controller.removingMemberId,
      savingMemberId: input.controller.savingMemberId,
      token: input.controller.token,
      userId: input.controller.user?.id,
      workspaceId: input.workspaceId,
      workspaceSlug: input.controller.workspace?.slug,
    }),
    providerSectionProps: buildWorkspaceSettingsProviderSectionProps({
      copy: input.copy,
      highlightedAnchor: input.controller.highlightedAnchor,
      locale: input.locale,
      managedRole,
      mediaStorageHealth: input.controller.mediaStorageHealth,
      onSaveProviderConfig: input.controller.handleSaveProviderConfig,
      providerConfigs: input.controller.providerConfigs,
      refreshingMediaStorageHealth: input.controller.refreshingMediaStorageHealth,
      refreshMediaStorageHealthState: input.controller.refreshMediaStorageHealthState,
      token: input.controller.token,
    }),
  };
}

export function buildWorkspaceSettingsClientViewProps(
  input: WorkspaceSettingsClientViewInput,
): WorkspaceSettingsClientViewProps {
  return {
    headerProps: buildWorkspaceSettingsHeaderProps(input),
    loadingShellProps: buildWorkspaceSettingsLoadingShellProps(input.copy.loading),
    mainContentProps: buildWorkspaceSettingsMainContentProps(input),
    showLoadingShell: input.controller.loading,
  };
}
