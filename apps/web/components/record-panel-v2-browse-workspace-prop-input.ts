"use client";
import type { BuildRecordBrowseWorkspacePropInputArgs } from "./record-panel-v2-browse-workspace-prop-input.types";

export function buildRecordBrowseWorkspacePropInput(input: BuildRecordBrowseWorkspacePropInputArgs) {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    records: input.records,
    timelineDays: input.timelineDays,
    selectedRecordId: input.selectedRecordId,
    recordFilter: input.recordFilter,
    searchPresets: input.searchPresets,
    onApplyLocationFilter: input.onApplyLocationFilter,
    onApplyRecordFilter: input.onApplyRecordFilter,
    onResetFilter: input.onResetFilter,
    onSelectRecord: input.onSelectRecord,
    filteringRecords: input.filteringRecords,
    savingSearchPreset: input.savingSearchPreset,
  };
}
