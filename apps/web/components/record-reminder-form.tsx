"use client";

import { RecordReminderFormActions } from "./record-reminder-form-actions";
import { RecordReminderFormFields } from "./record-reminder-form-fields";
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
      <RecordReminderFormFields
        canWriteWorkspace={canWriteWorkspace}
        channelInApp={channelInApp}
        channelLabel={channelLabel}
        onMessageChange={onMessageChange}
        onRemindAtChange={onRemindAtChange}
        onTitleChange={onTitleChange}
        remindAtLabel={remindAtLabel}
        reminderForm={reminderForm}
        reminderNoteLabel={reminderNoteLabel}
        reminderNotePlaceholder={reminderNotePlaceholder}
        reminderTitleLabel={reminderTitleLabel}
        reminderTitlePlaceholder={reminderTitlePlaceholder}
      />
      <RecordReminderFormActions
        canWriteWorkspace={canWriteWorkspace}
        createReminderLabel={createReminderLabel}
        onCreateReminder={onCreateReminder}
        savingReminder={savingReminder}
        savingReminderLabel={savingReminderLabel}
      />
    </div>
  );
}
