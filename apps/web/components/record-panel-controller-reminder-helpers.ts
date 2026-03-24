import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import {
  buildRecordPanelReminderPayload,
  type ResolveReminderActionInput,
} from "./record-panel-controller-reminder-payload";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
type ReminderResolution =
  | { errorMessage: string }
  | { payload: ReturnType<typeof buildRecordPanelReminderPayload> };

export function getRecordPanelReminderErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
