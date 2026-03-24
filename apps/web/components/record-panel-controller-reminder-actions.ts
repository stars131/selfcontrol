"use client";
import { getRecordPanelReminderErrorMessage, resolveRecordPanelReminderActionInput } from "./record-panel-controller-reminder-helpers";
import type { RecordPanelControllerReminderActionInput } from "./record-panel-controller-reminder-action-input.types";
import { applyRecordPanelReminderSuccessState } from "./record-panel-controller-reminder-success-helpers";

export function createRecordPanelControllerReminderActions({
  detailCopy,
  onCreateReminder,
  reminderForm,
  selectedRecord,
  setError,
  setReminderForm,
  setSavingReminder,
}: RecordPanelControllerReminderActionInput) {
  async function handleCreateReminderSubmit() {
    const reminderInput = resolveRecordPanelReminderActionInput({
      detailCopy,
      reminderForm,
      selectedRecord,
    });
    if ("errorMessage" in reminderInput) {
      setError(reminderInput.errorMessage);
      return;
    }
    setSavingReminder(true);
    setError("");
    try {
      await onCreateReminder(reminderInput.payload);
      applyRecordPanelReminderSuccessState({ setReminderForm });
    } catch (caught) {
      setError(getRecordPanelReminderErrorMessage(caught, detailCopy.createReminderError));
    } finally {
      setSavingReminder(false);
    }
  }

  return {
    handleCreateReminderSubmit,
  };
}
