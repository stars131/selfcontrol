import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { BuildReminderPayloadInput, ReminderPayload } from "./record-panel-controller-reminder-payload.types";

export function buildRecordPanelReminderPayload({
  reminderForm,
  selectedRecord,
}: BuildReminderPayloadInput): ReminderPayload {
  return {
    recordId: selectedRecord.id,
    title: reminderForm.title.trim() || selectedRecord.title || undefined,
    message: reminderForm.message.trim() || undefined,
    remind_at: new Date(reminderForm.remind_at).toISOString(),
    channel_code: "in_app",
  };
}
