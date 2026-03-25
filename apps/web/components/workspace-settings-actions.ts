"use client";

import { createWorkspaceSettingsMemberActions } from "./workspace-settings-member-actions";
import { createWorkspaceSettingsProviderActions } from "./workspace-settings-provider-actions";
import type { CreateWorkspaceSettingsActionsInput } from "./workspace-settings-actions.types";

export function createWorkspaceSettingsActions({
  state,
  workspaceId,
}: CreateWorkspaceSettingsActionsInput) {
  const providerActions = createWorkspaceSettingsProviderActions({ state, workspaceId });
  const memberActions = createWorkspaceSettingsMemberActions({ state, workspaceId });

  return {
    ...providerActions,
    ...memberActions,
  };
}
