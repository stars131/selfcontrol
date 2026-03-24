import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
type ReminderPayload = Parameters<ControllerProps["onCreateReminder"]>[0];
type ResolveReminderActionInput = {
  detailCopy: DetailCopy;
  reminderForm: ReminderFormState;
  selectedRecord: RecordItem | null;
};
type ReminderResolution = { errorMessage: string } | { payload: ReminderPayload };

function buildReminderPayload({
  reminderForm,
  selectedRecord,
}: {
  reminderForm: ReminderFormState;
  selectedRecord: RecordItem;
}): ReminderPayload {
  return {
    recordId: selectedRecord.id,
    title: reminderForm.title.trim() || selectedRecord.title || undefined,
    message: reminderForm.message.trim() || undefined,
    remind_at: new Date(reminderForm.remind_at).toISOString(),
    channel_code: "in_app",
  };
}

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
    payload: buildReminderPayload({
      reminderForm: input.reminderForm,
      selectedRecord: input.selectedRecord,
    }),
  };
}
