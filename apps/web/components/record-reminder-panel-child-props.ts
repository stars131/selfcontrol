"use client";
import type { RecordReminderFormProps } from "./record-reminder-form.types";
import type { RecordReminderListProps } from "./record-reminder-list.types";
import type { BuildRecordReminderPanelChildPropsInput } from "./record-reminder-panel-child-props.types";

export function buildRecordReminderFormProps(
  input: BuildRecordReminderPanelChildPropsInput,
): RecordReminderFormProps {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    channelInApp: input.channelInApp,
    channelLabel: input.channelLabel,
    createReminderLabel: input.createReminderLabel,
    onCreateReminder: input.onCreateReminder,
    onMessageChange: input.onMessageChange,
    onRemindAtChange: input.onRemindAtChange,
    onTitleChange: input.onTitleChange,
    remindAtLabel: input.remindAtLabel,
    reminderForm: input.reminderForm,
    reminderNoteLabel: input.reminderNoteLabel,
    reminderNotePlaceholder: input.reminderNotePlaceholder,
    reminderTitleLabel: input.reminderTitleLabel,
    reminderTitlePlaceholder: input.reminderTitlePlaceholder,
    savingReminder: input.savingReminder,
    savingReminderLabel: input.savingReminderLabel,
  };
}
export function buildRecordReminderListProps(
  input: BuildRecordReminderPanelChildPropsInput,
): RecordReminderListProps {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    deleteReminderLabel: input.deleteReminderLabel,
    enableReminderLabel: input.enableReminderLabel,
    formatReminderEnabledLabel: input.formatReminderEnabledLabel,
    formatReminderStatusLabel: input.formatReminderStatusLabel,
    formatReminderTimestampLabel: input.formatReminderTimestampLabel,
    markReminderDoneLabel: input.markReminderDoneLabel,
    noRemindersLabel: input.noRemindersLabel,
    onDeleteReminder: input.onDeleteReminder,
    onMarkReminderDone: input.onMarkReminderDone,
    onToggleReminderEnabled: input.onToggleReminderEnabled,
    pauseReminderLabel: input.pauseReminderLabel,
    reminders: input.reminders,
    selectedRecordTitle: input.selectedRecordTitle,
    untitledReminderLabel: input.untitledReminderLabel,
  };
}
