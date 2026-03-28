"use client";
import type { RecordPanelControllerHandlerGroupStateInput } from "./record-panel-controller-handler-group-state-input.types";

export function buildRecordPanelControllerHandlerGroupsStateInput(
  input: RecordPanelControllerHandlerGroupStateInput,
) {
  return {
    filterDraft: input.filterDraft,
    form: input.form,
    locationReviewForm: input.locationReviewForm,
    presetName: input.presetName,
    reminderForm: input.reminderForm,
    selectedDeadLetterIds: input.selectedDeadLetterIds,
    setBulkRetryingDeadLetter: input.setBulkRetryingDeadLetter,
    setDeleting: input.setDeleting,
    setDeletingMediaId: input.setDeletingMediaId,
    setDownloadingMediaId: input.setDownloadingMediaId,
    setError: input.setError,
    setForm: input.setForm,
    setPresetName: input.setPresetName,
    setRefreshingMediaId: input.setRefreshingMediaId,
    setReminderForm: input.setReminderForm,
    setRetryingMediaId: input.setRetryingMediaId,
    setSaving: input.setSaving,
    setSavingReminder: input.setSavingReminder,
    setSelectedDeadLetterIds: input.setSelectedDeadLetterIds,
    setUploading: input.setUploading,
  };
}
