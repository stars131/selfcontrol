"use client";
import type { BuildRecordBrowseWorkspaceControllerInputArgs } from "./record-panel-v2-browse-workspace-controller-input.types";
export function buildRecordBrowseWorkspaceControllerInput(input: BuildRecordBrowseWorkspaceControllerInputArgs) {
  return {
    avoidCount: input.avoidCount,
    detailCopy: input.detailCopy,
    filterDraft: input.filterDraft, foodCount: input.foodCount, form: input.form,
    formatAvoidCountLabel: input.formatAvoidCountLabel,
    formatRecordSourceLabel: input.formatRecordSourceLabel, formatRecordStatusLabel: input.formatRecordStatusLabel,
    formatRecordTimestampLabel: input.formatRecordTimestampLabel, formatRecordTypeLabel: input.formatRecordTypeLabel,
    formatReviewStatusLabel: input.formatReviewStatusLabel,
    formatTimelineCountLabel: input.formatTimelineCountLabel,
    formatTimelineDateLabel: input.formatTimelineDateLabel, handleApplyFilter: input.handleApplyFilter,
    handleDeletePreset: input.handleDeletePreset, handleSavePreset: input.handleSavePreset, panelCopy: input.panelCopy,
    presetName: input.presetName,
    setFilterDraft: input.setFilterDraft, setForm: input.setForm,
    setPresetName: input.setPresetName, setViewMode: input.setViewMode,
    summarizeRecordFilterLabel: input.summarizeRecordFilterLabel,
    viewMode: input.viewMode,
  };
}
