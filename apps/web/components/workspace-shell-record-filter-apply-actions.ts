"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import type { ApplyWorkspaceShellLocationFilterInput } from "./workspace-shell-record-filter-actions.types";

export function createWorkspaceShellRecordFilterApplyActions({
  canWriteWorkspace,
  initialRecordFilter,
  recordFilter,
  refreshRecords,
  setFilteringRecords,
  setRecordFilter,
  token,
}: UseWorkspaceShellActionsProps) {
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

  async function handleApplyLocationFilter({ placeQuery, reviewStatus, mappedOnly }: ApplyWorkspaceShellLocationFilterInput) {
    await handleApplyRecordFilter({
      ...recordFilter,
      placeQuery,
      reviewStatus,
      mappedOnly,
    });
  }

  return {
    handleResetFilter,
    handleApplyRecordFilter,
    handleApplyLocationFilter,
  };
}
