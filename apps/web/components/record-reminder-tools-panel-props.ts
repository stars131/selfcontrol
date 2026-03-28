"use client";

import type { RecordReminderPanelProps } from "./record-reminder-panel.types";
import type { BuildRecordReminderPanelPropsInput } from "./record-reminder-tools-panel-props.types";

export function buildRecordReminderPanelProps(input: BuildRecordReminderPanelPropsInput): RecordReminderPanelProps {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    channelInApp: input.channelInApp,
    channelLabel: input.channelLabel,
    createReminderLabel: input.createReminderLabel,
    deleteReminderLabel: input.deleteReminderLabel,
    enableReminderLabel: input.enableReminderLabel,
    formatReminderEnabledLabel: input.formatReminderEnabledLabel,
    formatReminderStatusLabel: input.formatReminderStatusLabel,
    formatReminderTimestampLabel: input.formatReminderTimestampLabel,
    markReminderDoneLabel: input.markReminderDoneLabel,
    noRemindersLabel: input.noRemindersLabel,
    onCreateReminder: input.onCreateReminder,
    onDeleteReminder: input.onDeleteReminder,
    onMarkReminderDone: input.bindings.onMarkReminderDone,
    onMessageChange: input.bindings.onMessageChange,
    onRemindAtChange: input.bindings.onRemindAtChange,
    onTitleChange: input.bindings.onTitleChange,
    onToggleReminderEnabled: input.bindings.onToggleReminderEnabled,
    pauseReminderLabel: input.pauseReminderLabel,
    reminderForm: input.reminderForm,
    reminderNoteLabel: input.reminderNoteLabel,
    reminderNotePlaceholder: input.reminderNotePlaceholder,
    reminderSectionDescription: input.reminderSectionDescription,
    reminderSectionTitle: input.reminderSectionTitle,
    reminderTitleLabel: input.reminderTitleLabel,
    reminderTitlePlaceholder: input.reminderTitlePlaceholder,
    remindAtLabel: input.remindAtLabel,
    reminders: input.reminders,
    savingReminder: input.savingReminder,
    savingReminderLabel: input.savingReminderLabel,
    selectedRecordTitle: input.selectedRecordTitle,
    untitledReminderLabel: input.untitledReminderLabel,
  };
}
