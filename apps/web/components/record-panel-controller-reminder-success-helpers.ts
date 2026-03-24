import type { ReminderFormState } from "../lib/record-panel-forms";

export function applyRecordPanelReminderSuccessState({
  setReminderForm,
}: {
  setReminderForm: React.Dispatch<React.SetStateAction<ReminderFormState>>;
}) {
  setReminderForm((prev) => ({ ...prev, message: "", remind_at: "" }));
}
