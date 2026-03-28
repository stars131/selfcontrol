"use client";
import type { BuildRecordBrowseWorkspacePropInputArgs } from "./record-panel-v2-browse-workspace-prop-input.types";

export function buildRecordBrowseWorkspacePropInput(props: BuildRecordBrowseWorkspacePropInputArgs) {
  return {
    canWriteWorkspace: props.canWriteWorkspace,
    records: props.records,
    timelineDays: props.timelineDays,
    selectedRecordId: props.selectedRecordId,
    recordFilter: props.recordFilter,
    searchPresets: props.searchPresets,
    onApplyLocationFilter: props.onApplyLocationFilter,
    onApplyRecordFilter: props.onApplyRecordFilter,
    onResetFilter: props.onResetFilter,
    onSelectRecord: props.onSelectRecord,
    filteringRecords: props.filteringRecords,
    savingSearchPreset: props.savingSearchPreset,
  };
}
