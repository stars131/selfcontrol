"use client";
import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";
export function buildRecordBrowseWorkspaceControllerInput({ controller }: Pick<RecordPanelShellInput, "controller">) {
  return {
    avoidCount: controller.avoidCount,
    detailCopy: controller.detailCopy,
    filterDraft: controller.filterDraft,
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
    setFilterDraft: controller.setFilterDraft,
    setForm: controller.setForm,
    setPresetName: controller.setPresetName,
    setViewMode: controller.setViewMode,
    summarizeRecordFilterLabel: controller.summarizeRecordFilterLabel,
    viewMode: controller.viewMode,
  };
}
