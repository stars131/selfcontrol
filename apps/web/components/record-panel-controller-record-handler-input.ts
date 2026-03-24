"use client";

import type { RecordPanelControllerHandlerGroupInput } from "./record-panel-controller-handler-group-inputs.types";

export function buildRecordPanelControllerRecordHandlerInput(
  input: RecordPanelControllerHandlerGroupInput,
) {
  return {
    detailCopy: input.detailCopy,
    filterDraft: input.filterDraft,
    form: input.form,
    locationReviewForm: input.locationReviewForm,
    onApplyRecordFilter: input.onApplyRecordFilter,
    onCreateReminder: input.onCreateReminder,
    onCreateSearchPreset: input.onCreateSearchPreset,
    onDeleteRecord: input.onDeleteRecord,
    onDeleteSearchPreset: input.onDeleteSearchPreset,
    onSaveRecord: input.onSaveRecord,
    presetName: input.presetName,
    reminderForm: input.reminderForm,
    selectedRecord: input.selectedRecord,
    setDeleting: input.setDeleting,
    setError: input.setError,
    setForm: input.setForm,
    setPresetName: input.setPresetName,
    setReminderForm: input.setReminderForm,
    setSaving: input.setSaving,
    setSavingReminder: input.setSavingReminder,
  };
}
