import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export type ReminderPayload = Parameters<ControllerProps["onCreateReminder"]>[0];
export type ResolveReminderActionInput = { detailCopy: DetailCopy; reminderForm: ReminderFormState; selectedRecord: RecordItem | null };
export type BuildReminderPayloadInput = { reminderForm: ReminderFormState; selectedRecord: RecordItem };
