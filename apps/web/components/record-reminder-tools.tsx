"use client";

import type { Dispatch, SetStateAction } from "react";

import { RecordReminderPanel } from "./record-reminder-panel";
import type { ReminderFormState } from "../lib/record-panel-forms";
import type { ReminderItem } from "../lib/types";

type RecordReminderToolsProps = {
  canWriteWorkspace: boolean;
  hasSelectedRecord: boolean;
  selectedRecordTitle: string | null;
  reminderForm: ReminderFormState;
  reminders: ReminderItem[];
  savingReminder: boolean;
  channelInApp: string;
  channelLabel: string;
  createReminderLabel: string;
  deleteReminderLabel: string;
  enableReminderLabel: string;
  markReminderDoneLabel: string;
  noRemindersLabel: string;
  pauseReminderLabel: string;
  reminderNoteLabel: string;
  reminderNotePlaceholder: string;
  reminderSectionDescription: string;
  reminderSectionTitle: string;
  reminderTitleLabel: string;
  reminderTitlePlaceholder: string;
  remindAtLabel: string;
  savingReminderLabel: string;
  untitledReminderLabel: string;
  formatReminderEnabledLabel: (value: boolean) => string;
  formatReminderStatusLabel: (value: string) => string;
  formatReminderTimestampLabel: (value: string) => string;
  onCreateReminder: () => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onUpdateReminder: (
    reminderId: string,
    input: Partial<{
      title: string | null;
      message: string | null;
      remind_at: string | null;
      status: string;
      is_enabled: boolean;
    }>,
  ) => Promise<void>;
  setReminderForm: Dispatch<SetStateAction<ReminderFormState>>;
};

export function RecordReminderTools({
  canWriteWorkspace,
  hasSelectedRecord,
  selectedRecordTitle,
  reminderForm,
  reminders,
  savingReminder,
  channelInApp,
  channelLabel,
  createReminderLabel,
  deleteReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  noRemindersLabel,
  pauseReminderLabel,
  reminderNoteLabel,
  reminderNotePlaceholder,
  reminderSectionDescription,
  reminderSectionTitle,
  reminderTitleLabel,
  reminderTitlePlaceholder,
  remindAtLabel,
  savingReminderLabel,
  untitledReminderLabel,
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  onCreateReminder,
  onDeleteReminder,
  onUpdateReminder,
  setReminderForm,
}: RecordReminderToolsProps) {
  if (!hasSelectedRecord) {
    return null;
  }

  return (
    <RecordReminderPanel
      canWriteWorkspace={canWriteWorkspace}
      channelInApp={channelInApp}
      channelLabel={channelLabel}
      createReminderLabel={createReminderLabel}
      deleteReminderLabel={deleteReminderLabel}
      enableReminderLabel={enableReminderLabel}
      formatReminderEnabledLabel={formatReminderEnabledLabel}
      formatReminderStatusLabel={formatReminderStatusLabel}
      formatReminderTimestampLabel={formatReminderTimestampLabel}
      markReminderDoneLabel={markReminderDoneLabel}
      noRemindersLabel={noRemindersLabel}
      onCreateReminder={onCreateReminder}
      onDeleteReminder={onDeleteReminder}
      onMarkReminderDone={(reminder) =>
        onUpdateReminder(reminder.id, {
          status: "completed",
          is_enabled: false,
        })
      }
      onMessageChange={(value) =>
        setReminderForm((prev) => ({
          ...prev,
          message: value,
        }))
      }
      onRemindAtChange={(value) =>
        setReminderForm((prev) => ({
          ...prev,
          remind_at: value,
        }))
      }
      onTitleChange={(value) =>
        setReminderForm((prev) => ({
          ...prev,
          title: value,
        }))
      }
      onToggleReminderEnabled={(reminder) =>
        onUpdateReminder(reminder.id, {
          is_enabled: !reminder.is_enabled,
        })
      }
      pauseReminderLabel={pauseReminderLabel}
      reminderForm={reminderForm}
      reminderNoteLabel={reminderNoteLabel}
      reminderNotePlaceholder={reminderNotePlaceholder}
      reminderSectionDescription={reminderSectionDescription}
      reminderSectionTitle={reminderSectionTitle}
      reminderTitleLabel={reminderTitleLabel}
      reminderTitlePlaceholder={reminderTitlePlaceholder}
      remindAtLabel={remindAtLabel}
      reminders={reminders}
      savingReminder={savingReminder}
      savingReminderLabel={savingReminderLabel}
      selectedRecordTitle={selectedRecordTitle}
      untitledReminderLabel={untitledReminderLabel}
    />
  );
}
