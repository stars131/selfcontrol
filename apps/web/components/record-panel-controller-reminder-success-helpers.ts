import type { ReminderFormState } from "../lib/record-panel-forms";
import type { ApplyRecordPanelReminderSuccessStateInput } from "./record-panel-controller-reminder-success-helpers.types";

export function applyRecordPanelReminderSuccessState({
  setReminderForm,
}: ApplyRecordPanelReminderSuccessStateInput) {
  setReminderForm((prev) => ({ ...prev, message: "", remind_at: "" }));
}
