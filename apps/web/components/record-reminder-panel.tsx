"use client";

import { RecordReminderForm } from "./record-reminder-form";
import { RecordReminderList } from "./record-reminder-list";
import type { RecordReminderPanelProps } from "./record-reminder-panel.types";

export function RecordReminderPanel({
  canWriteWorkspace,
  savingReminder,
  selectedRecordTitle,
  reminderForm,
  reminders,
  reminderSectionTitle,
  reminderSectionDescription,
  reminderTitleLabel,
  reminderTitlePlaceholder,
  remindAtLabel,
  channelLabel,
  channelInApp,
  reminderNoteLabel,
  reminderNotePlaceholder,
  savingReminderLabel,
  createReminderLabel,
  untitledReminderLabel,
  pauseReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  deleteReminderLabel,
  noRemindersLabel,
  formatReminderTimestampLabel,
  formatReminderStatusLabel,
  formatReminderEnabledLabel,
  onTitleChange,
  onRemindAtChange,
  onMessageChange,
  onCreateReminder,
  onToggleReminderEnabled,
  onMarkReminderDone,
  onDeleteReminder,
}: RecordReminderPanelProps) {
  return (
    <div className="record-card form-stack">
      <div className="eyebrow">{reminderSectionTitle}</div>
      <div className="muted">{reminderSectionDescription}</div>
      <RecordReminderForm
        canWriteWorkspace={canWriteWorkspace}
        channelInApp={channelInApp}
        channelLabel={channelLabel}
        createReminderLabel={createReminderLabel}
        onCreateReminder={onCreateReminder}
        onMessageChange={onMessageChange}
        onRemindAtChange={onRemindAtChange}
        onTitleChange={onTitleChange}
        remindAtLabel={remindAtLabel}
        reminderForm={reminderForm}
        reminderNoteLabel={reminderNoteLabel}
        reminderNotePlaceholder={reminderNotePlaceholder}
        reminderTitleLabel={reminderTitleLabel}
        reminderTitlePlaceholder={reminderTitlePlaceholder}
        savingReminder={savingReminder}
        savingReminderLabel={savingReminderLabel}
      />
      <RecordReminderList
        canWriteWorkspace={canWriteWorkspace}
        deleteReminderLabel={deleteReminderLabel}
        enableReminderLabel={enableReminderLabel}
        formatReminderEnabledLabel={formatReminderEnabledLabel}
        formatReminderStatusLabel={formatReminderStatusLabel}
        formatReminderTimestampLabel={formatReminderTimestampLabel}
        markReminderDoneLabel={markReminderDoneLabel}
        noRemindersLabel={noRemindersLabel}
        onDeleteReminder={onDeleteReminder}
        onMarkReminderDone={onMarkReminderDone}
        onToggleReminderEnabled={onToggleReminderEnabled}
        pauseReminderLabel={pauseReminderLabel}
        reminders={reminders}
        selectedRecordTitle={selectedRecordTitle}
        untitledReminderLabel={untitledReminderLabel}
      />
    </div>
  );
}
