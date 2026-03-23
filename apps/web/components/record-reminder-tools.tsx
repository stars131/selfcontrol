"use client";

import { RecordReminderPanel } from "./record-reminder-panel";
import { createRecordReminderBindings } from "./record-reminder-tools-bindings";
import type { RecordReminderToolsProps } from "./record-reminder-tools.types";

export function RecordReminderTools({
  canWriteWorkspace,
  hasSelectedRecord,
  selectedRecordTitle,
  reminderForm,
  reminders,
  savingReminder,
  channelInApp,
  channelLabel,
  createReminderLabel,
  deleteReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  noRemindersLabel,
  pauseReminderLabel,
  reminderNoteLabel,
  reminderNotePlaceholder,
  reminderSectionDescription,
  reminderSectionTitle,
  reminderTitleLabel,
  reminderTitlePlaceholder,
  remindAtLabel,
  savingReminderLabel,
  untitledReminderLabel,
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  onCreateReminder,
  onDeleteReminder,
  onUpdateReminder,
  setReminderForm,
}: RecordReminderToolsProps) {
  const bindings = createRecordReminderBindings({ onUpdateReminder, setReminderForm });

  if (!hasSelectedRecord) {
    return null;
  }

  return (
    <RecordReminderPanel
      canWriteWorkspace={canWriteWorkspace}
      channelInApp={channelInApp}
      channelLabel={channelLabel}
      createReminderLabel={createReminderLabel}
      deleteReminderLabel={deleteReminderLabel}
      enableReminderLabel={enableReminderLabel}
      formatReminderEnabledLabel={formatReminderEnabledLabel}
      formatReminderStatusLabel={formatReminderStatusLabel}
      formatReminderTimestampLabel={formatReminderTimestampLabel}
      markReminderDoneLabel={markReminderDoneLabel}
      noRemindersLabel={noRemindersLabel}
      onCreateReminder={onCreateReminder}
      onDeleteReminder={onDeleteReminder}
      onMarkReminderDone={bindings.onMarkReminderDone}
      onMessageChange={bindings.onMessageChange}
      onRemindAtChange={bindings.onRemindAtChange}
      onTitleChange={bindings.onTitleChange}
      onToggleReminderEnabled={bindings.onToggleReminderEnabled}
      pauseReminderLabel={pauseReminderLabel}
      reminderForm={reminderForm}
      reminderNoteLabel={reminderNoteLabel}
      reminderNotePlaceholder={reminderNotePlaceholder}
      reminderSectionDescription={reminderSectionDescription}
      reminderSectionTitle={reminderSectionTitle}
      reminderTitleLabel={reminderTitleLabel}
      reminderTitlePlaceholder={reminderTitlePlaceholder}
      remindAtLabel={remindAtLabel}
      reminders={reminders}
      savingReminder={savingReminder}
      savingReminderLabel={savingReminderLabel}
      selectedRecordTitle={selectedRecordTitle}
      untitledReminderLabel={untitledReminderLabel}
    />
  );
}
