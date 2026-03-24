import { buildRecordPanelReminderPayload } from "./record-panel-controller-reminder-payload";
import type { ReminderPayload, ResolveReminderActionInput } from "./record-panel-controller-reminder-payload.types";

type ReminderResolution =
  | { errorMessage: string }
  | { payload: ReminderPayload };

export function resolveRecordPanelReminderActionInput(
  input: ResolveReminderActionInput,
): ReminderResolution {
  if (!input.selectedRecord) {
    return { errorMessage: "Save or select a record before adding a reminder" };
  }
  if (!input.reminderForm.remind_at) {
    return { errorMessage: input.detailCopy.reminderTimeRequiredError };
  }
  return {
    payload: buildRecordPanelReminderPayload({
      reminderForm: input.reminderForm,
      selectedRecord: input.selectedRecord,
    }),
  };
}
