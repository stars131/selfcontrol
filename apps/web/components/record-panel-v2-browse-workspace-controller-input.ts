"use client";
import type { BuildRecordBrowseWorkspaceControllerInputArgs } from "./record-panel-v2-browse-workspace-controller-input.types";
export function buildRecordBrowseWorkspaceControllerInput({ controller }: BuildRecordBrowseWorkspaceControllerInputArgs) {
  return {
    avoidCount: controller.avoidCount,
    detailCopy: controller.detailCopy,
    filterDraft: controller.filterDraft, foodCount: controller.foodCount, form: controller.form,
    formatAvoidCountLabel: controller.formatAvoidCountLabel,
    formatRecordSourceLabel: controller.formatRecordSourceLabel, formatRecordStatusLabel: controller.formatRecordStatusLabel,
    formatRecordTimestampLabel: controller.formatRecordTimestampLabel, formatRecordTypeLabel: controller.formatRecordTypeLabel,
    formatReviewStatusLabel: controller.formatReviewStatusLabel,
    formatTimelineCountLabel: controller.formatTimelineCountLabel,
    formatTimelineDateLabel: controller.formatTimelineDateLabel, handleApplyFilter: controller.handleApplyFilter,
    handleDeletePreset: controller.handleDeletePreset, handleSavePreset: controller.handleSavePreset, panelCopy: controller.panelCopy,
    presetName: controller.presetName,
    setFilterDraft: controller.setFilterDraft, setForm: controller.setForm,
    setPresetName: controller.setPresetName, setViewMode: controller.setViewMode,
    summarizeRecordFilterLabel: controller.summarizeRecordFilterLabel,
    viewMode: controller.viewMode,
  };
}
