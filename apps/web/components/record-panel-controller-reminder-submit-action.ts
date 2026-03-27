"use client";

import { resolveRecordPanelReminderActionInput } from "./record-panel-controller-reminder-helpers";
import type { RecordPanelControllerReminderActionInput } from "./record-panel-controller-reminder-action-input.types";
import { runRecordPanelReminderSubmit } from "./record-panel-controller-reminder-submit-runner";

export function createRecordPanelControllerReminderSubmitAction({
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
    await runRecordPanelReminderSubmit(
      { detailCopy, onCreateReminder, reminderForm, selectedRecord, setError, setReminderForm, setSavingReminder },
      reminderInput.payload,
    );
  }

  return {
    handleCreateReminderSubmit,
  };
}
