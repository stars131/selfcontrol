"use client";
import type { RecordReminderItemCardActionsProps } from "./record-reminder-item-card-actions.types";
import type { RecordReminderItemCardSummaryProps } from "./record-reminder-item-card-summary.types";
import type { BuildRecordReminderItemCardChildPropsInput } from "./record-reminder-item-card-child-props.types";

export function buildRecordReminderItemCardSummaryProps({
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  reminder,
  selectedRecordTitle,
  untitledReminderLabel,
}: BuildRecordReminderItemCardChildPropsInput): RecordReminderItemCardSummaryProps {
  return {
    formatReminderEnabledLabel,
    formatReminderStatusLabel,
    formatReminderTimestampLabel,
    reminder,
    selectedRecordTitle,
    untitledReminderLabel,
  };
}

export function buildRecordReminderItemCardActionsProps({
  canWriteWorkspace,
  deleteReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  onDeleteReminder,
  onMarkReminderDone,
  onToggleReminderEnabled,
  pauseReminderLabel,
  reminder,
}: BuildRecordReminderItemCardChildPropsInput): RecordReminderItemCardActionsProps {
  return {
    canWriteWorkspace,
    deleteReminderLabel,
    enableReminderLabel,
    markReminderDoneLabel,
    onDeleteReminder,
    onMarkReminderDone,
    onToggleReminderEnabled,
    pauseReminderLabel,
    reminder,
  };
}
