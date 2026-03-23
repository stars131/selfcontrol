"use client";

import {
  INITIAL_RECORD_FILTER,
  refreshMediaAssets,
  refreshRecordCollection,
} from "../lib/workspace-shell-refresh";
import type { RecordFilterState } from "../lib/types";
import type { WorkspaceShellRefreshersParams } from "./workspace-shell-refreshers.types";

export function createWorkspaceShellRecordMediaRefreshers({
  setMediaAssets,
  setRecords,
  setSelectedRecordId,
  setTimelineDays,
  setVisibleRecords,
  workspaceId,
}: WorkspaceShellRefreshersParams) {
  const refreshRecords = async (
    activeToken: string,
    nextRecordFilter: RecordFilterState = INITIAL_RECORD_FILTER,
  ) => {
    await refreshRecordCollection({
      token: activeToken,
      workspaceId,
      nextRecordFilter,
      setRecords,
      setVisibleRecords,
      setTimelineDays,
      setSelectedRecordId,
    });
  };

  const refreshMedia = async (activeToken: string, recordId: string | null) => {
    await refreshMediaAssets(activeToken, workspaceId, recordId, setMediaAssets);
  };

  return {
    initialRecordFilter: INITIAL_RECORD_FILTER,
    refreshRecords,
    refreshMedia,
  };
}
