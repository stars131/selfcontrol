"use client";

import type { RecordReminderFormProps } from "./record-reminder-form.types";

export function RecordReminderForm({
  canWriteWorkspace,
  channelInApp,
  channelLabel,
  createReminderLabel,
  onCreateReminder,
  onMessageChange,
  onRemindAtChange,
  onTitleChange,
  remindAtLabel,
  reminderForm,
  reminderNoteLabel,
  reminderNotePlaceholder,
  reminderTitleLabel,
  reminderTitlePlaceholder,
  savingReminder,
  savingReminderLabel,
}: RecordReminderFormProps) {
  return (
    <div className="form-stack">
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">{reminderTitleLabel}</span>
          <input
            className="input"
            disabled={!canWriteWorkspace}
            value={reminderForm.title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder={reminderTitlePlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{remindAtLabel}</span>
          <input
            className="input"
            type="datetime-local"
            disabled={!canWriteWorkspace}
            value={reminderForm.remind_at}
            onChange={(event) => onRemindAtChange(event.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">{channelLabel}</span>
          <input className="input" disabled value={channelInApp} />
        </label>
      </div>
      <label className="field">
        <span className="field-label">{reminderNoteLabel}</span>
        <textarea
          className="textarea"
          disabled={!canWriteWorkspace}
          value={reminderForm.message}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder={reminderNotePlaceholder}
        />
      </label>
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
    </div>
  );
}
