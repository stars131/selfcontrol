"use client";
import type { CreateRecordReminderBindingsInput } from "./record-reminder-tools-bindings.types";
export function createRecordReminderBindings({
  onUpdateReminder,
  setReminderForm,
}: CreateRecordReminderBindingsInput) {
  return {
    onMarkReminderDone(reminder: { id: string }) {
      return onUpdateReminder(reminder.id, { status: "completed", is_enabled: false });
    },
    onMessageChange(value: string) {
      setReminderForm((prev) => ({ ...prev, message: value }));
    },
    onRemindAtChange(value: string) {
      setReminderForm((prev) => ({ ...prev, remind_at: value }));
    },
    onTitleChange(value: string) {
      setReminderForm((prev) => ({ ...prev, title: value }));
    },
    onToggleReminderEnabled(reminder: { id: string; is_enabled: boolean }) {
      return onUpdateReminder(reminder.id, { is_enabled: !reminder.is_enabled });
    },
  };
}
