"use client";

import { deleteMedia, getMediaStatus, retryMediaProcessing } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { getStoredWorkspaceShellActionCopy } from "./workspace-shell-action-copy";
import { requireSelectedRecordContext } from "./workspace-shell-action-guards";
import {
  refreshWorkspaceShellMediaMutation,
  refreshWorkspaceShellMediaStatusViews,
} from "./workspace-shell-media-action-refresh";

export function createWorkspaceShellMediaSelectedActions(
  props: UseWorkspaceShellActionsProps,
) {
  const copy = getStoredWorkspaceShellActionCopy();
  const { token, workspaceId, canWriteWorkspace, selectedRecordId, refreshMediaStorageSummary } =
    props;

  async function handleDeleteMedia(mediaId: string) {
    const { activeToken, recordId } = requireSelectedRecordContext(token, selectedRecordId);
    if (!canWriteWorkspace) {
      throw new Error(copy.viewerReadOnly);
    }
    await deleteMedia(activeToken, workspaceId, mediaId);
    await refreshWorkspaceShellMediaMutation(props, activeToken, recordId);
    await refreshMediaStorageSummary(activeToken);
  }

  async function handleRetryMedia(mediaId: string) {
    const { activeToken, recordId } = requireSelectedRecordContext(token, selectedRecordId);
    if (!canWriteWorkspace) {
      throw new Error(copy.viewerReadOnly);
    }
    await retryMediaProcessing(activeToken, workspaceId, mediaId);
    await refreshWorkspaceShellMediaMutation(props, activeToken, recordId);
  }

  async function handleRefreshMediaStatus(mediaId: string) {
    const { activeToken, recordId } = requireSelectedRecordContext(token, selectedRecordId);
    await getMediaStatus(activeToken, workspaceId, mediaId);
    await refreshWorkspaceShellMediaStatusViews(props, activeToken, recordId);
  }

  return {
    handleDeleteMedia,
    handleRetryMedia,
    handleRefreshMediaStatus,
  };
}
