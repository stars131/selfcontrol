import type { BuildRecordBrowseWorkspacePropsInput, RecordBrowseWorkspaceProps } from "./record-panel-v2-workspace-props.types";
import { buildRecordBrowseWorkspaceCopyProps, buildRecordBrowseWorkspaceDraftLocationProps } from "./record-panel-v2-browse-workspace-props-helpers";

export function buildRecordBrowseWorkspaceProps(
  input: BuildRecordBrowseWorkspacePropsInput,
): RecordBrowseWorkspaceProps {
  const copyProps = buildRecordBrowseWorkspaceCopyProps(input);
  const draftLocationProps = buildRecordBrowseWorkspaceDraftLocationProps(input);

  return {
    ...copyProps,
    avoidCount: input.avoidCount,
    canWriteWorkspace: input.canWriteWorkspace,
    currentFilterSummary: input.summarizeRecordFilterLabel(input.recordFilter),
    ...draftLocationProps,
    filteringRecords: input.filteringRecords,
    filterDraft: input.filterDraft,
    foodCount: input.foodCount,
    formatAvoidCountLabel: input.formatAvoidCountLabel,
    formatRecordTimestampLabel: input.formatRecordTimestampLabel,
    formatReviewStatusLabel: input.formatReviewStatusLabel,
    formatTimelineCountLabel: input.formatTimelineCountLabel,
    formatTimelineDateLabel: input.formatTimelineDateLabel,
    onApplyFilter: input.handleApplyFilter,
    onApplyLocationFilter: input.onApplyLocationFilter,
    onApplyPreset: input.onApplyRecordFilter,
    onDeletePreset: input.handleDeletePreset,
    onResetFilter: input.onResetFilter,
    onSavePreset: input.handleSavePreset,
    onSelectRecord: input.onSelectRecord,
    panelCopy: input.panelCopy,
    presetName: input.presetName,
    recordFilter: input.recordFilter,
    records: input.records,
    savingSearchPreset: input.savingSearchPreset,
    searchPresets: input.searchPresets,
    selectedRecordId: input.selectedRecordId,
    setFilterDraft: input.setFilterDraft,
    setPresetName: input.setPresetName,
    setViewMode: input.setViewMode,
    summarizeRecordFilterLabel: input.summarizeRecordFilterLabel,
    timelineDays: input.timelineDays,
    viewMode: input.viewMode,
    visibleRecordCount: input.records.length,
  };
}
