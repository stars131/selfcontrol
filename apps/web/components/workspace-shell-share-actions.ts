"use client";

import { createShareLink, updateShareLink } from "../lib/api";
import type { WorkspaceShellShareLinkInput } from "./workspace-shell-action-inputs.types";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireShareManagerToken } from "./workspace-shell-action-guards";

export function createWorkspaceShellShareActions({
  canManageSharing,
  refreshAuditLogs,
  refreshShareLinks,
  setLatestSharePath,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleCreateShareLink(input: WorkspaceShellShareLinkInput) {
    const activeToken = requireShareManagerToken(token, canManageSharing);
    const result = await createShareLink(activeToken, workspaceId, {
      name: input.name,
      permission_code: input.permission_code,
      max_uses: input.max_uses ?? null,
      expires_at: null,
    });
    setLatestSharePath(result.share_path);
    await refreshShareLinks(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleDisableShareLink(shareLinkId: string) {
    const activeToken = requireShareManagerToken(token, canManageSharing);
    await updateShareLink(activeToken, workspaceId, shareLinkId, { is_enabled: false });
    await refreshShareLinks(activeToken);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleCreateShareLink,
    handleDisableShareLink,
  };
}
