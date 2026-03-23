"use client";

import {
  bulkRetryMediaDeadLetter,
  createSearchPreset,
  deleteMedia,
  deleteSearchPreset,
  getMediaStatus,
  retryMediaProcessing,
  uploadMedia,
} from "../lib/api";
import type {
  UseWorkspaceShellActionsProps,
  WorkspaceShellBulkRetryInput,
} from "./workspace-shell-actions.types";
import {
  requireSelectedRecordContext,
  requireWritableWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellMediaFilterActions(props: UseWorkspaceShellActionsProps) {
  const {
    token,
    workspaceId,
    canWriteWorkspace,
    recordFilter,
    selectedRecordId,
    initialRecordFilter,
    refreshAuditLogs,
    refreshKnowledge,
    refreshMedia,
    refreshMediaDeadLetterOverview,
    refreshMediaProcessingOverview,
    refreshMediaStorageSummary,
    refreshRecords,
    refreshSearchPresets,
    setFilteringRecords,
    setRecordFilter,
    setSavingSearchPreset,
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
      throw new Error("Viewer access is read-only");
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
      throw new Error("Viewer access is read-only");
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

  async function handleResetFilter() {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    setRecordFilter(initialRecordFilter);
    await refreshRecords(activeToken, initialRecordFilter);
  }

  async function handleApplyRecordFilter(nextFilter: UseWorkspaceShellActionsProps["recordFilter"]) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    setFilteringRecords(true);
    setRecordFilter(nextFilter);
    try {
      await refreshRecords(activeToken, nextFilter);
    } finally {
      setFilteringRecords(false);
    }
  }

  async function handleApplyLocationFilter({
    placeQuery,
    reviewStatus,
    mappedOnly,
  }: Pick<UseWorkspaceShellActionsProps["recordFilter"], "placeQuery" | "reviewStatus" | "mappedOnly">) {
    await handleApplyRecordFilter({
      ...recordFilter,
      placeQuery,
      reviewStatus,
      mappedOnly,
    });
  }

  async function handleCreateSearchPreset(
    name: string,
    nextFilter: UseWorkspaceShellActionsProps["recordFilter"],
  ) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    setSavingSearchPreset(true);
    try {
      await createSearchPreset(activeToken, workspaceId, {
        name,
        filters: nextFilter,
      });
      await refreshSearchPresets(activeToken);
      await refreshAuditLogs(activeToken);
    } finally {
      setSavingSearchPreset(false);
    }
  }

  async function handleDeleteSearchPreset(presetId: string) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await deleteSearchPreset(activeToken, workspaceId, presetId);
    await refreshSearchPresets(activeToken);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleUploadMedia,
    handleDeleteMedia,
    handleRetryMedia,
    handleRefreshMediaStatus,
    handleBulkRetryMediaDeadLetter,
    handleResetFilter,
    handleApplyRecordFilter,
    handleApplyLocationFilter,
    handleCreateSearchPreset,
    handleDeleteSearchPreset,
  };
}
