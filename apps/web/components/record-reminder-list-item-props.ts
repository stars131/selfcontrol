"use client";
import type { ReminderItem } from "../lib/types";
import type { RecordReminderItemCardProps } from "./record-reminder-panel.types";
import type { BuildRecordReminderItemCardPropsInput } from "./record-reminder-list-item-props.types";
export function buildRecordReminderItemCardProps({ canWriteWorkspace, deleteReminderLabel, enableReminderLabel, formatReminderEnabledLabel, formatReminderStatusLabel, formatReminderTimestampLabel, markReminderDoneLabel, onDeleteReminder, onMarkReminderDone, onToggleReminderEnabled, pauseReminderLabel, reminder, selectedRecordTitle, untitledReminderLabel }: BuildRecordReminderItemCardPropsInput): RecordReminderItemCardProps {
  return {
    canWriteWorkspace,
    deleteReminderLabel,
    enableReminderLabel,
    formatReminderEnabledLabel,
    formatReminderStatusLabel,
    formatReminderTimestampLabel,
    markReminderDoneLabel,
    onDeleteReminder,
    onMarkReminderDone,
    onToggleReminderEnabled,
    pauseReminderLabel,
    reminder,
    selectedRecordTitle,
    untitledReminderLabel,
  };
}
