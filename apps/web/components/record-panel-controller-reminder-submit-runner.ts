"use client";

import type { RecordPanelControllerReminderActionInput } from "./record-panel-controller-reminder-action-input.types";
import type { ReminderPayload } from "./record-panel-controller-reminder-payload.types";
import { getRecordPanelReminderErrorMessage } from "./record-panel-controller-reminder-helpers";
import { applyRecordPanelReminderSuccessState } from "./record-panel-controller-reminder-success-helpers";

export async function runRecordPanelReminderSubmit(
  {
    detailCopy,
    onCreateReminder,
    setError,
    setReminderForm,
    setSavingReminder,
  }: RecordPanelControllerReminderActionInput,
  payload: ReminderPayload,
) {
  setSavingReminder(true);
  setError("");
  try {
    await onCreateReminder(payload);
    applyRecordPanelReminderSuccessState({ setReminderForm });
  } catch (caught) {
    setError(getRecordPanelReminderErrorMessage(caught, detailCopy.createReminderError));
  } finally {
    setSavingReminder(false);
  }
}
