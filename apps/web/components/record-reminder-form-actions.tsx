"use client";

import type { RecordReminderFormActionsProps } from "./record-reminder-form-actions.types";

export function RecordReminderFormActions({
  canWriteWorkspace,
  createReminderLabel,
  onCreateReminder,
  savingReminder,
  savingReminderLabel,
}: RecordReminderFormActionsProps) {
  return (
    <div className="action-row">
      <button
        className="button secondary"
        disabled={savingReminder || !canWriteWorkspace}
        type="button"
        onClick={() => void onCreateReminder()}
      >
        {savingReminder ? savingReminderLabel : createReminderLabel}
      </button>
    </div>
  );
}
