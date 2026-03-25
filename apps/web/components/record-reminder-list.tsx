"use client";

import { RecordReminderItemCard } from "./record-reminder-item-card";
import type { RecordReminderListProps } from "./record-reminder-list.types";

export function RecordReminderList({
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
}: RecordReminderListProps) {
  return (
    <div className="record-list compact-list">
      {reminders.length ? (
        reminders.map((reminder) => (
          <RecordReminderItemCard
            canWriteWorkspace={canWriteWorkspace}
            deleteReminderLabel={deleteReminderLabel}
            enableReminderLabel={enableReminderLabel}
            formatReminderEnabledLabel={formatReminderEnabledLabel}
            formatReminderStatusLabel={formatReminderStatusLabel}
            formatReminderTimestampLabel={formatReminderTimestampLabel}
            key={reminder.id}
            markReminderDoneLabel={markReminderDoneLabel}
            onDeleteReminder={onDeleteReminder}
            onMarkReminderDone={onMarkReminderDone}
            onToggleReminderEnabled={onToggleReminderEnabled}
            pauseReminderLabel={pauseReminderLabel}
            reminder={reminder}
            selectedRecordTitle={selectedRecordTitle}
            untitledReminderLabel={untitledReminderLabel}
          />
        ))
      ) : (
        <div className="notice">{noRemindersLabel}</div>
      )}
    </div>
  );
}
