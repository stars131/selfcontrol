import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
type ReminderPayload = Parameters<ControllerProps["onCreateReminder"]>[0];

export type ResolveReminderActionInput = {
  detailCopy: DetailCopy;
  reminderForm: ReminderFormState;
  selectedRecord: RecordItem | null;
};

export function buildRecordPanelReminderPayload({
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
