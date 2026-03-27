"use client";

import { bulkRetryMediaDeadLetter, deleteMedia, getMediaStatus, retryMediaProcessing, uploadMedia } from "../lib/api";
import type { WorkspaceShellBulkRetryInput } from "./workspace-shell-action-inputs.types";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { getStoredWorkspaceShellActionCopy } from "./workspace-shell-action-copy";
import { requireSelectedRecordContext, requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import {
  refreshWorkspaceShellMediaMutation,
  refreshWorkspaceShellMediaStatusViews,
  refreshWorkspaceShellMediaUpload,
} from "./workspace-shell-media-action-refresh";

export function createWorkspaceShellMediaActions(props: UseWorkspaceShellActionsProps) {
  const copy = getStoredWorkspaceShellActionCopy();
  const {
    token,
    workspaceId,
    canWriteWorkspace,
    selectedRecordId,
    refreshMediaStorageSummary,
  } = props;

  async function handleUploadMedia(recordId: string, file: File) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await uploadMedia(activeToken, workspaceId, recordId, file);
    await refreshWorkspaceShellMediaUpload(props, activeToken, recordId);
  }

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

  async function handleBulkRetryMediaDeadLetter(input: WorkspaceShellBulkRetryInput) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await bulkRetryMediaDeadLetter(activeToken, workspaceId, input);
    await refreshWorkspaceShellMediaMutation(props, activeToken, selectedRecordId);
  }

  return {
    handleUploadMedia,
    handleDeleteMedia,
    handleRetryMedia,
    handleRefreshMediaStatus,
    handleBulkRetryMediaDeadLetter,
  };
}
