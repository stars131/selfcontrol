"use client";
import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";

export function buildRecordBrowseWorkspacePropInput({ props }: Pick<RecordPanelShellInput, "props">) {
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
