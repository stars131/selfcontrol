"use client";

import type { RecordReminderPanelProps } from "./record-reminder-panel.types";
import { RecordReminderItemCard } from "./record-reminder-item-card";

type RecordReminderListProps = Pick<
  RecordReminderPanelProps,
  | "canWriteWorkspace"
  | "deleteReminderLabel"
  | "enableReminderLabel"
  | "formatReminderEnabledLabel"
  | "formatReminderStatusLabel"
  | "formatReminderTimestampLabel"
  | "markReminderDoneLabel"
  | "noRemindersLabel"
  | "onDeleteReminder"
  | "onMarkReminderDone"
  | "onToggleReminderEnabled"
  | "pauseReminderLabel"
  | "reminders"
  | "selectedRecordTitle"
  | "untitledReminderLabel"
>;

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
