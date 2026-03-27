"use client";

import { buildTimelineDays } from "../lib/timeline";
import type { RecordItem } from "../lib/types";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";

type WorkspaceShellChatResultSetters = Pick<
  UseWorkspaceShellActionsProps,
  "setSelectedRecordId" | "setTimelineDays" | "setVisibleRecords"
>;

export function applyWorkspaceShellChatSearchResult(
  setters: WorkspaceShellChatResultSetters,
  records: RecordItem[],
) {
  setters.setVisibleRecords(records);
  setters.setTimelineDays(buildTimelineDays(records));
  setters.setSelectedRecordId(records[0]?.id ?? null);
}

export function selectWorkspaceShellChatCreatedRecord(
  setSelectedRecordId: UseWorkspaceShellActionsProps["setSelectedRecordId"],
  records: RecordItem[],
) {
  if (records[0]) {
    setSelectedRecordId(records[0].id);
  }
}
