"use client";

import {
  deleteWorkspaceMember,
  getMediaStorageProviderHealth,
  updateProviderConfig,
  updateWorkspaceMember,
} from "../lib/api";
import type {
  UseWorkspaceSettingsControllerState,
  WorkspaceSettingsProviderConfigInput,
} from "./workspace-settings-controller.types";

export function getWorkspaceSettingsActionErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createWorkspaceSettingsActions({
  state,
  workspaceId,
}: {
  state: UseWorkspaceSettingsControllerState;
  workspaceId: string;
}) {
  const {
    token,
    setError,
    setMediaStorageHealth,
    setMembers,
    setProviderConfigs,
    setRefreshingMediaStorageHealth,
    setRemovingMemberId,
    setSavingMemberId,
  } = state;

  async function refreshMediaStorageHealthState(activeToken: string) {
    setRefreshingMediaStorageHealth(true);
    try {
      const result = await getMediaStorageProviderHealth(activeToken, workspaceId);
      setMediaStorageHealth(result.health);
      setError("");
    } catch (caught) {
      setError(getWorkspaceSettingsActionErrorMessage(caught, "Failed to load media storage health"));
    } finally {
      setRefreshingMediaStorageHealth(false);
    }
  }

  async function handleSaveProviderConfig(
    featureCode: string,
    input: WorkspaceSettingsProviderConfigInput,
  ) {
    if (!token) {
      throw new Error("Not authenticated");
    }

    const result = await updateProviderConfig(token, workspaceId, featureCode, input);
    setProviderConfigs((current) =>
      current.map((item) => (item.feature_code === featureCode ? result.config : item)),
    );
    if (featureCode === "media_storage") {
      await refreshMediaStorageHealthState(token);
    }
  }

  async function handleUpdateMemberRole(memberId: string, role: "viewer" | "editor") {
    if (!token) {
      throw new Error("Not authenticated");
    }

    setSavingMemberId(memberId);
    setError("");
    try {
      const result = await updateWorkspaceMember(token, workspaceId, memberId, { role });
      setMembers((current) => current.map((item) => (item.id === memberId ? result.member : item)));
    } catch (caught) {
      setError(getWorkspaceSettingsActionErrorMessage(caught, "Failed to update workspace member"));
    } finally {
      setSavingMemberId("");
    }
  }

  async function handleRemoveMember(memberId: string) {
    if (!token) {
      throw new Error("Not authenticated");
    }

    setRemovingMemberId(memberId);
    setError("");
    try {
      await deleteWorkspaceMember(token, workspaceId, memberId);
      setMembers((current) => current.filter((item) => item.id !== memberId));
    } catch (caught) {
      setError(getWorkspaceSettingsActionErrorMessage(caught, "Failed to remove workspace member"));
    } finally {
      setRemovingMemberId("");
    }
  }

  return {
    refreshMediaStorageHealthState,
    handleSaveProviderConfig,
    handleUpdateMemberRole,
    handleRemoveMember,
  };
}
