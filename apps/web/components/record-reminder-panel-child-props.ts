"use client";
import type { RecordReminderFormProps } from "./record-reminder-form.types";
import type { RecordReminderListProps } from "./record-reminder-list.types";
import type { BuildRecordReminderPanelChildPropsInput } from "./record-reminder-panel-child-props.types";

export function buildRecordReminderFormProps({
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
}: BuildRecordReminderPanelChildPropsInput): RecordReminderFormProps {
  return {
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
  };
}
export function buildRecordReminderListProps({
  canWriteWorkspace,
  deleteReminderLabel,
  enableReminderLabel,
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  markReminderDoneLabel,
  noRemindersLabel,
  onDeleteReminder,
  onMarkReminderDone,
  onToggleReminderEnabled,
  pauseReminderLabel,
  reminders,
  selectedRecordTitle,
  untitledReminderLabel,
}: BuildRecordReminderPanelChildPropsInput): RecordReminderListProps {
  return {
    canWriteWorkspace,
    deleteReminderLabel,
    enableReminderLabel,
    formatReminderEnabledLabel,
    formatReminderStatusLabel,
    formatReminderTimestampLabel,
    markReminderDoneLabel,
    noRemindersLabel,
    onDeleteReminder,
    onMarkReminderDone,
    onToggleReminderEnabled,
    pauseReminderLabel,
    reminders,
    selectedRecordTitle,
    untitledReminderLabel,
  };
}
