import type { BuildRecordBrowseWorkspacePropsInput, RecordBrowseWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export function buildRecordBrowseWorkspaceFilterProps(input: BuildRecordBrowseWorkspacePropsInput): Pick<RecordBrowseWorkspaceProps, "currentFilterSummary" | "filterDraft" | "onApplyFilter" | "onApplyLocationFilter" | "onApplyPreset" | "onDeletePreset" | "onResetFilter" | "onSavePreset" | "presetName" | "recordFilter" | "savingSearchPreset" | "searchPresets" | "setFilterDraft" | "setPresetName" | "summarizeRecordFilterLabel"> {
  return {
    currentFilterSummary: input.summarizeRecordFilterLabel(input.recordFilter),
    filterDraft: input.filterDraft,
    onApplyFilter: input.handleApplyFilter,
    onApplyLocationFilter: input.onApplyLocationFilter,
    onApplyPreset: input.onApplyRecordFilter,
    onDeletePreset: input.handleDeletePreset,
    onResetFilter: input.onResetFilter,
    onSavePreset: input.handleSavePreset,
    presetName: input.presetName,
    recordFilter: input.recordFilter,
    savingSearchPreset: input.savingSearchPreset,
    searchPresets: input.searchPresets,
    setFilterDraft: input.setFilterDraft,
    setPresetName: input.setPresetName,
    summarizeRecordFilterLabel: input.summarizeRecordFilterLabel,
  };
}
