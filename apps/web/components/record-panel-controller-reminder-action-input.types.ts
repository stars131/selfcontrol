import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordPanelControllerReminderActionInput = {
  detailCopy: DetailCopy;
  onCreateReminder: ControllerProps["onCreateReminder"];
  reminderForm: ReminderFormState;
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setReminderForm: React.Dispatch<React.SetStateAction<ReminderFormState>>;
  setSavingReminder: (value: boolean) => void;
};
