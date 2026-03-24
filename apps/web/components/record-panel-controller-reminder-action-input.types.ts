import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export type RecordPanelControllerReminderActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  onCreateReminder: ControllerProps["onCreateReminder"];
  reminderForm: ReminderFormState;
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setReminderForm: React.Dispatch<React.SetStateAction<ReminderFormState>>;
  setSavingReminder: (value: boolean) => void;
};
