"use client";

import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>;

export function buildRecordPanelControllerHandlerGroupsStateInput(state: ControllerState) {
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
