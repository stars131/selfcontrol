"use client";

import type { RecordReminderPanelProps } from "./record-reminder-panel.types";
import type { RecordReminderToolsProps } from "./record-reminder-tools.types";

type ReminderBindings = Pick<
  RecordReminderPanelProps,
  | "onMarkReminderDone"
  | "onMessageChange"
  | "onRemindAtChange"
  | "onTitleChange"
  | "onToggleReminderEnabled"
>;

export function buildRecordReminderPanelProps({
  bindings,
  props,
}: {
  bindings: ReminderBindings;
  props: RecordReminderToolsProps;
}): RecordReminderPanelProps {
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
    onMarkReminderDone: bindings.onMarkReminderDone,
    onMessageChange: bindings.onMessageChange,
    onRemindAtChange: bindings.onRemindAtChange,
    onTitleChange: bindings.onTitleChange,
    onToggleReminderEnabled: bindings.onToggleReminderEnabled,
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
