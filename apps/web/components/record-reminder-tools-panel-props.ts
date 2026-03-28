"use client";

import type { RecordReminderPanelProps } from "./record-reminder-panel.types";
import type { BuildRecordReminderPanelPropsInput } from "./record-reminder-tools-panel-props.types";

export function buildRecordReminderPanelProps(props: BuildRecordReminderPanelPropsInput): RecordReminderPanelProps {
  return {
    canWriteWorkspace: props.canWriteWorkspace,
    channelInApp: props.channelInApp,
    channelLabel: props.channelLabel,
    createReminderLabel: props.createReminderLabel,
    deleteReminderLabel: props.deleteReminderLabel,
    enableReminderLabel: props.enableReminderLabel,
    formatReminderEnabledLabel: props.formatReminderEnabledLabel,
    formatReminderStatusLabel: props.formatReminderStatusLabel,
    formatReminderTimestampLabel: props.formatReminderTimestampLabel,
    markReminderDoneLabel: props.markReminderDoneLabel,
    noRemindersLabel: props.noRemindersLabel,
    onCreateReminder: props.onCreateReminder,
    onDeleteReminder: props.onDeleteReminder,
    onMarkReminderDone: props.bindings.onMarkReminderDone,
    onMessageChange: props.bindings.onMessageChange,
    onRemindAtChange: props.bindings.onRemindAtChange,
    onTitleChange: props.bindings.onTitleChange,
    onToggleReminderEnabled: props.bindings.onToggleReminderEnabled,
    pauseReminderLabel: props.pauseReminderLabel,
    reminderForm: props.reminderForm,
    reminderNoteLabel: props.reminderNoteLabel,
    reminderNotePlaceholder: props.reminderNotePlaceholder,
    reminderSectionDescription: props.reminderSectionDescription,
    reminderSectionTitle: props.reminderSectionTitle,
    reminderTitleLabel: props.reminderTitleLabel,
    reminderTitlePlaceholder: props.reminderTitlePlaceholder,
    remindAtLabel: props.remindAtLabel,
    reminders: props.reminders,
    savingReminder: props.savingReminder,
    savingReminderLabel: props.savingReminderLabel,
    selectedRecordTitle: props.selectedRecordTitle,
    untitledReminderLabel: props.untitledReminderLabel,
  };
}
