"use client";

import type { Dispatch, SetStateAction } from "react";

import type { ReminderFormState } from "../lib/record-panel-forms";
import type { ReminderItem } from "../lib/types";

export type RecordReminderToolsProps = {
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
