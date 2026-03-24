import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";
export type ReminderPayload = Parameters<ControllerProps["onCreateReminder"]>[0];
export type ResolveReminderActionInput = { detailCopy: RecordPanelControllerDetailCopy; reminderForm: ReminderFormState; selectedRecord: RecordItem | null };
export type BuildReminderPayloadInput = { reminderForm: ReminderFormState; selectedRecord: RecordItem };
