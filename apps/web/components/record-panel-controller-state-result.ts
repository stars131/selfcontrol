"use client";

import type { BuildRecordPanelControllerStateResultInput } from "./record-panel-controller-state-result.types";

export function buildRecordPanelControllerStateResult(state: BuildRecordPanelControllerStateResultInput) {
  return {
    form: state.form,
    setForm: state.setForm,
    saving: state.saving,
    deleting: state.deleting,
    uploading: state.uploading,
    refreshingMediaId: state.refreshingMediaId,
    retryingMediaId: state.retryingMediaId,
    bulkRetryingDeadLetter: state.bulkRetryingDeadLetter,
    downloadingMediaId: state.downloadingMediaId,
    deletingMediaId: state.deletingMediaId,
    reminderForm: state.reminderForm,
    setReminderForm: state.setReminderForm,
    savingReminder: state.savingReminder,
    locationReviewForm: state.locationReviewForm,
    setLocationReviewForm: state.setLocationReviewForm,
    viewMode: state.viewMode,
    setViewMode: state.setViewMode,
    filterDraft: state.filterDraft,
    setFilterDraft: state.setFilterDraft,
    presetName: state.presetName,
    setPresetName: state.setPresetName,
    selectedDeadLetterIds: state.selectedDeadLetterIds,
    error: state.error,
  };
}
