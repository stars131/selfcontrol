"use client";

import { createWorkspaceSettingsMemberActions } from "./workspace-settings-member-actions";
import { createWorkspaceSettingsProviderActions } from "./workspace-settings-provider-actions";
import type { CreateWorkspaceSettingsActionsInput } from "./workspace-settings-actions.types";

export function createWorkspaceSettingsActions({
  ...props
}: CreateWorkspaceSettingsActionsInput) {
  const providerActions = createWorkspaceSettingsProviderActions(props);
  const memberActions = createWorkspaceSettingsMemberActions(props);
  return {
    ...providerActions,
    ...memberActions,
  };
}
