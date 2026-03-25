"use client";

import type { RecordReminderItemCardActionsProps } from "./record-reminder-item-card-actions.types";

export function RecordReminderItemCardActions({
  canWriteWorkspace,
  deleteReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  onDeleteReminder,
  onMarkReminderDone,
  onToggleReminderEnabled,
  pauseReminderLabel,
  reminder,
}: RecordReminderItemCardActionsProps) {
  return (
    <div className="action-row" style={{ marginTop: 12 }}>
      <button
        className="button secondary"
        type="button"
        disabled={!canWriteWorkspace}
        onClick={() => void onToggleReminderEnabled(reminder)}
      >
        {reminder.is_enabled ? pauseReminderLabel : enableReminderLabel}
      </button>
      {reminder.status !== "completed" ? (
        <button
          className="button secondary"
          type="button"
          disabled={!canWriteWorkspace}
          onClick={() => void onMarkReminderDone(reminder)}
        >
          {markReminderDoneLabel}
        </button>
      ) : null}
      <button
        className="button secondary"
        type="button"
        disabled={!canWriteWorkspace}
        onClick={() => void onDeleteReminder(reminder.id)}
      >
        {deleteReminderLabel}
      </button>
    </div>
  );
}
