"use client";

import type { RecordReminderFormFieldsProps } from "./record-reminder-form-fields.types";

export function RecordReminderFormFields({
  canWriteWorkspace,
  channelInApp,
  channelLabel,
  onMessageChange,
  onRemindAtChange,
  onTitleChange,
  remindAtLabel,
  reminderForm,
  reminderNoteLabel,
  reminderNotePlaceholder,
  reminderTitleLabel,
  reminderTitlePlaceholder,
}: RecordReminderFormFieldsProps) {
  return (
    <>
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
    </>
  );
}
