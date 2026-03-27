"use client";

import { uploadMedia } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import { refreshWorkspaceShellMediaUpload } from "./workspace-shell-media-action-refresh";

export function createWorkspaceShellMediaUploadActions(
  props: UseWorkspaceShellActionsProps,
) {
  const { token, workspaceId, canWriteWorkspace } = props;

  async function handleUploadMedia(recordId: string, file: File) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await uploadMedia(activeToken, workspaceId, recordId, file);
    await refreshWorkspaceShellMediaUpload(props, activeToken, recordId);
  }

  return {
    handleUploadMedia,
  };
}
