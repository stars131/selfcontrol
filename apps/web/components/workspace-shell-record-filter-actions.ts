"use client";

import { createSearchPreset, deleteSearchPreset } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import type { ApplyWorkspaceShellLocationFilterInput } from "./workspace-shell-record-filter-actions.types";

export function createWorkspaceShellRecordFilterActions(props: UseWorkspaceShellActionsProps) {
  const {
    token,
    workspaceId,
    canWriteWorkspace,
    recordFilter,
    initialRecordFilter,
    refreshAuditLogs,
    refreshRecords,
    refreshSearchPresets,
    setFilteringRecords,
    setRecordFilter,
    setSavingSearchPreset,
  } = props;

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
  }: ApplyWorkspaceShellLocationFilterInput) {
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
    handleResetFilter,
    handleApplyRecordFilter,
    handleApplyLocationFilter,
    handleCreateSearchPreset,
    handleDeleteSearchPreset,
  };
}
