"use client";

import {
  bulkRetryMediaDeadLetter,
  deleteMedia,
  getMediaStatus,
  retryMediaProcessing,
  uploadMedia,
} from "../lib/api";
import type {
  UseWorkspaceShellActionsProps,
  WorkspaceShellBulkRetryInput,
} from "./workspace-shell-actions.types";
import { getStoredWorkspaceShellActionCopy } from "./workspace-shell-action-copy";
import {
  requireSelectedRecordContext,
  requireWritableWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellMediaActions(props: UseWorkspaceShellActionsProps) {
  const copy = getStoredWorkspaceShellActionCopy();
  const {
    token,
    workspaceId,
    canWriteWorkspace,
    selectedRecordId,
    refreshAuditLogs,
    refreshKnowledge,
    refreshMedia,
    refreshMediaDeadLetterOverview,
    refreshMediaProcessingOverview,
    refreshMediaStorageSummary,
  } = props;

  async function handleUploadMedia(recordId: string, file: File) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await uploadMedia(activeToken, workspaceId, recordId, file);
    await refreshMedia(activeToken, recordId);
    await refreshMediaStorageSummary(activeToken);
    await refreshMediaProcessingOverview(activeToken);
    await refreshMediaDeadLetterOverview(activeToken);
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleDeleteMedia(mediaId: string) {
    const { activeToken, recordId } = requireSelectedRecordContext(token, selectedRecordId);
    if (!canWriteWorkspace) {
      throw new Error(copy.viewerReadOnly);
    }
    await deleteMedia(activeToken, workspaceId, mediaId);
    await refreshMedia(activeToken, recordId);
    await refreshMediaStorageSummary(activeToken);
    await refreshMediaProcessingOverview(activeToken);
    await refreshMediaDeadLetterOverview(activeToken);
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleRetryMedia(mediaId: string) {
    const { activeToken, recordId } = requireSelectedRecordContext(token, selectedRecordId);
    if (!canWriteWorkspace) {
      throw new Error(copy.viewerReadOnly);
    }
    await retryMediaProcessing(activeToken, workspaceId, mediaId);
    await refreshMedia(activeToken, recordId);
    await refreshMediaProcessingOverview(activeToken);
    await refreshMediaDeadLetterOverview(activeToken);
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleRefreshMediaStatus(mediaId: string) {
    const { activeToken, recordId } = requireSelectedRecordContext(token, selectedRecordId);
    await getMediaStatus(activeToken, workspaceId, mediaId);
    await refreshMedia(activeToken, recordId);
    await refreshMediaProcessingOverview(activeToken);
    await refreshMediaDeadLetterOverview(activeToken);
  }

  async function handleBulkRetryMediaDeadLetter(input: WorkspaceShellBulkRetryInput) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await bulkRetryMediaDeadLetter(activeToken, workspaceId, input);
    await refreshMedia(activeToken, selectedRecordId);
    await refreshMediaProcessingOverview(activeToken);
    await refreshMediaDeadLetterOverview(activeToken);
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleUploadMedia,
    handleDeleteMedia,
    handleRetryMedia,
    handleRefreshMediaStatus,
    handleBulkRetryMediaDeadLetter,
  };
}
