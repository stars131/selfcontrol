"use client";

import { deleteWorkspaceMember, updateWorkspaceMember } from "../lib/api";
import { getWorkspaceSettingsActionErrorMessage } from "./workspace-settings-action-error";
import type { CreateWorkspaceSettingsMemberActionsInput } from "./workspace-settings-member-actions.types";

export function createWorkspaceSettingsMemberActions({
  state,
  workspaceId,
}: CreateWorkspaceSettingsMemberActionsInput) {
  const { token, setError, setMembers, setRemovingMemberId, setSavingMemberId } = state;

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
    handleUpdateMemberRole,
    handleRemoveMember,
  };
}
