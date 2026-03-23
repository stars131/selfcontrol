"use client";

import type { RecordReminderItemCardProps } from "./record-reminder-panel.types";

export function RecordReminderItemCard({
  canWriteWorkspace,
  reminder,
  selectedRecordTitle,
  untitledReminderLabel,
  pauseReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  deleteReminderLabel,
  formatReminderTimestampLabel,
  formatReminderStatusLabel,
  formatReminderEnabledLabel,
  onToggleReminderEnabled,
  onMarkReminderDone,
  onDeleteReminder,
}: RecordReminderItemCardProps) {
  return (
    <article className="record-card">
      <div className="eyebrow">{reminder.channel_code}</div>
      <h4 style={{ margin: "8px 0 6px", fontSize: 18 }}>
        {reminder.title || selectedRecordTitle || untitledReminderLabel}
      </h4>
      <div className="muted">{formatReminderTimestampLabel(reminder.remind_at)}</div>
      {reminder.message ? <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{reminder.message}</p> : null}
      <div className="tag-row">
        <span className="tag">{formatReminderStatusLabel(reminder.status)}</span>
        <span className="tag">{formatReminderEnabledLabel(reminder.is_enabled)}</span>
      </div>
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
    </article>
  );
}
