"use client";
import type { RecordPanelControllerReminderActionInput } from "./record-panel-controller-reminder-action-input.types";
import { createRecordPanelControllerReminderSubmitAction } from "./record-panel-controller-reminder-submit-action";

export function createRecordPanelControllerReminderActions(
  input: RecordPanelControllerReminderActionInput,
) {
  return createRecordPanelControllerReminderSubmitAction(input);
}
