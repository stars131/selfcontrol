"use client";

import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";

export function buildRecordBrowseWorkspaceInput({
  controller,
  props,
}: RecordPanelShellInput) {
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
    avoidCount: controller.avoidCount,
    detailCopy: controller.detailCopy,
    filterDraft: controller.filterDraft,
    filteringRecords: props.filteringRecords,
    foodCount: controller.foodCount,
    form: controller.form,
    formatAvoidCountLabel: controller.formatAvoidCountLabel,
    formatRecordTimestampLabel: controller.formatRecordTimestampLabel,
    formatReviewStatusLabel: controller.formatReviewStatusLabel,
    formatTimelineCountLabel: controller.formatTimelineCountLabel,
    formatTimelineDateLabel: controller.formatTimelineDateLabel,
    handleApplyFilter: controller.handleApplyFilter,
    handleDeletePreset: controller.handleDeletePreset,
    handleSavePreset: controller.handleSavePreset,
    panelCopy: controller.panelCopy,
    presetName: controller.presetName,
    savingSearchPreset: props.savingSearchPreset,
    setFilterDraft: controller.setFilterDraft,
    setForm: controller.setForm,
    setPresetName: controller.setPresetName,
    setViewMode: controller.setViewMode,
    summarizeRecordFilterLabel: controller.summarizeRecordFilterLabel,
    viewMode: controller.viewMode,
  };
}
