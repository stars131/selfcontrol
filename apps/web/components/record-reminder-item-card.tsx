"use client";

import { RecordReminderItemCardActions } from "./record-reminder-item-card-actions";
import { RecordReminderItemCardSummary } from "./record-reminder-item-card-summary";
import type { RecordReminderItemCardProps } from "./record-reminder-panel.types";

export function RecordReminderItemCard({
  canWriteWorkspace,
  reminder,
  selectedRecordTitle,
  untitledReminderLabel,
  pauseReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  deleteReminderLabel,
  formatReminderTimestampLabel,
  formatReminderStatusLabel,
  formatReminderEnabledLabel,
  onToggleReminderEnabled,
  onMarkReminderDone,
  onDeleteReminder,
}: RecordReminderItemCardProps) {
  return (
    <article className="record-card">
      <RecordReminderItemCardSummary
        formatReminderEnabledLabel={formatReminderEnabledLabel}
        formatReminderStatusLabel={formatReminderStatusLabel}
        formatReminderTimestampLabel={formatReminderTimestampLabel}
        reminder={reminder}
        selectedRecordTitle={selectedRecordTitle}
        untitledReminderLabel={untitledReminderLabel}
      />
      <RecordReminderItemCardActions
        canWriteWorkspace={canWriteWorkspace}
        deleteReminderLabel={deleteReminderLabel}
        enableReminderLabel={enableReminderLabel}
        markReminderDoneLabel={markReminderDoneLabel}
        onDeleteReminder={onDeleteReminder}
        onMarkReminderDone={onMarkReminderDone}
        onToggleReminderEnabled={onToggleReminderEnabled}
        pauseReminderLabel={pauseReminderLabel}
        reminder={reminder}
      />
    </article>
  );
}
