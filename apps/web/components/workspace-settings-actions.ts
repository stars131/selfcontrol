"use client";

import { createWorkspaceSettingsMemberActions } from "./workspace-settings-member-actions";
import { createWorkspaceSettingsProviderActions } from "./workspace-settings-provider-actions";
import type { UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types";

export function createWorkspaceSettingsActions({
  state,
  workspaceId,
}: {
  state: UseWorkspaceSettingsControllerState;
  workspaceId: string;
}) {
  const providerActions = createWorkspaceSettingsProviderActions({ state, workspaceId });
  const memberActions = createWorkspaceSettingsMemberActions({ state, workspaceId });

  return {
    ...providerActions,
    ...memberActions,
  };
}
