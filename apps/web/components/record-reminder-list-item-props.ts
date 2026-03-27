"use client";
import type { ReminderItem } from "../lib/types";
import type { RecordReminderItemCardProps } from "./record-reminder-panel.types";
import type { BuildRecordReminderItemCardPropsInput } from "./record-reminder-list-item-props.types";

export function buildRecordReminderItemCardProps({
  props,
  reminder,
}: BuildRecordReminderItemCardPropsInput): RecordReminderItemCardProps {
  return {
    canWriteWorkspace: props.canWriteWorkspace,
    deleteReminderLabel: props.deleteReminderLabel,
    enableReminderLabel: props.enableReminderLabel,
    formatReminderEnabledLabel: props.formatReminderEnabledLabel,
    formatReminderStatusLabel: props.formatReminderStatusLabel,
    formatReminderTimestampLabel: props.formatReminderTimestampLabel,
    markReminderDoneLabel: props.markReminderDoneLabel,
    onDeleteReminder: props.onDeleteReminder,
    onMarkReminderDone: props.onMarkReminderDone,
    onToggleReminderEnabled: props.onToggleReminderEnabled,
    pauseReminderLabel: props.pauseReminderLabel,
    reminder,
    selectedRecordTitle: props.selectedRecordTitle,
    untitledReminderLabel: props.untitledReminderLabel,
  };
}
