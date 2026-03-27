"use client";

import { getMediaStorageProviderHealth, updateProviderConfig } from "../lib/api";
import { getStoredLocale } from "../lib/locale";
import type {
  WorkspaceSettingsProviderConfigInput,
} from "./workspace-settings-controller.types";
import { getWorkspaceSettingsActionErrorMessage } from "./workspace-settings-action-error";
import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";
import type { CreateWorkspaceSettingsProviderActionsInput } from "./workspace-settings-provider-actions.types";

export function createWorkspaceSettingsProviderActions({
  state,
  workspaceId,
}: CreateWorkspaceSettingsProviderActionsInput) {
  const {
    token,
    setError,
    setMediaStorageHealth,
    setProviderConfigs,
    setRefreshingMediaStorageHealth,
  } = state;
  const copy = getWorkspaceSettingsCopy(getStoredLocale());

  async function refreshMediaStorageHealthState(activeToken: string) {
    setRefreshingMediaStorageHealth(true);
    try {
      const result = await getMediaStorageProviderHealth(activeToken, workspaceId);
      setMediaStorageHealth(result.health);
      setError("");
    } catch (caught) {
      setError(getWorkspaceSettingsActionErrorMessage(caught, copy.loadMediaStorageHealthFailed));
    } finally {
      setRefreshingMediaStorageHealth(false);
    }
  }

  async function handleSaveProviderConfig(
    featureCode: string,
    input: WorkspaceSettingsProviderConfigInput,
  ) {
    if (!token) {
      throw new Error(copy.notAuthenticated);
    }

    const result = await updateProviderConfig(token, workspaceId, featureCode, input);
    setProviderConfigs((current) =>
      current.map((item) => (item.feature_code === featureCode ? result.config : item)),
    );
    if (featureCode === "media_storage") {
      await refreshMediaStorageHealthState(token);
    }
  }

  return {
    refreshMediaStorageHealthState,
    handleSaveProviderConfig,
  };
}
