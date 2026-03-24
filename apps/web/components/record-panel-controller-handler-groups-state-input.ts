"use client";
import type { RecordPanelControllerHandlerGroupStateInput } from "./record-panel-controller-handler-group-state-input.types";

export function buildRecordPanelControllerHandlerGroupsStateInput(
  state: RecordPanelControllerHandlerGroupStateInput,
) {
  return {
    filterDraft: state.filterDraft,
    form: state.form,
    locationReviewForm: state.locationReviewForm,
    presetName: state.presetName,
    reminderForm: state.reminderForm,
    selectedDeadLetterIds: state.selectedDeadLetterIds,
    setBulkRetryingDeadLetter: state.setBulkRetryingDeadLetter,
    setDeleting: state.setDeleting,
    setDeletingMediaId: state.setDeletingMediaId,
    setDownloadingMediaId: state.setDownloadingMediaId,
    setError: state.setError,
    setForm: state.setForm,
    setPresetName: state.setPresetName,
    setRefreshingMediaId: state.setRefreshingMediaId,
    setReminderForm: state.setReminderForm,
    setRetryingMediaId: state.setRetryingMediaId,
    setSaving: state.setSaving,
    setSavingReminder: state.setSavingReminder,
    setSelectedDeadLetterIds: state.setSelectedDeadLetterIds,
    setUploading: state.setUploading,
  };
}
