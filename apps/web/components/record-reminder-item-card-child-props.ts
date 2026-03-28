"use client";
import type { RecordReminderItemCardActionsProps } from "./record-reminder-item-card-actions.types";
import type { RecordReminderItemCardSummaryProps } from "./record-reminder-item-card-summary.types";
import type { BuildRecordReminderItemCardChildPropsInput } from "./record-reminder-item-card-child-props.types";

export function buildRecordReminderItemCardSummaryProps(
  input: BuildRecordReminderItemCardChildPropsInput,
): RecordReminderItemCardSummaryProps {
  return {
    formatReminderEnabledLabel: input.formatReminderEnabledLabel,
    formatReminderStatusLabel: input.formatReminderStatusLabel,
    formatReminderTimestampLabel: input.formatReminderTimestampLabel,
    reminder: input.reminder,
    selectedRecordTitle: input.selectedRecordTitle,
    untitledReminderLabel: input.untitledReminderLabel,
  };
}

export function buildRecordReminderItemCardActionsProps(
  input: BuildRecordReminderItemCardChildPropsInput,
): RecordReminderItemCardActionsProps {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    deleteReminderLabel: input.deleteReminderLabel,
    enableReminderLabel: input.enableReminderLabel,
    markReminderDoneLabel: input.markReminderDoneLabel,
    onDeleteReminder: input.onDeleteReminder,
    onMarkReminderDone: input.onMarkReminderDone,
    onToggleReminderEnabled: input.onToggleReminderEnabled,
    pauseReminderLabel: input.pauseReminderLabel,
    reminder: input.reminder,
  };
}
