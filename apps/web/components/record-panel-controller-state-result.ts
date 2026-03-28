"use client";

import type { BuildRecordPanelControllerStateResultInput } from "./record-panel-controller-state-result.types";

export function buildRecordPanelControllerStateResult(input: BuildRecordPanelControllerStateResultInput) {
  return {
    form: input.form,
    setForm: input.setForm,
    saving: input.saving,
    deleting: input.deleting,
    uploading: input.uploading,
    refreshingMediaId: input.refreshingMediaId,
    retryingMediaId: input.retryingMediaId,
    bulkRetryingDeadLetter: input.bulkRetryingDeadLetter,
    downloadingMediaId: input.downloadingMediaId,
    deletingMediaId: input.deletingMediaId,
    reminderForm: input.reminderForm,
    setReminderForm: input.setReminderForm,
    savingReminder: input.savingReminder,
    locationReviewForm: input.locationReviewForm,
    setLocationReviewForm: input.setLocationReviewForm,
    viewMode: input.viewMode,
    setViewMode: input.setViewMode,
    filterDraft: input.filterDraft,
    setFilterDraft: input.setFilterDraft,
    presetName: input.presetName,
    setPresetName: input.setPresetName,
    selectedDeadLetterIds: input.selectedDeadLetterIds,
    error: input.error,
  };
}
