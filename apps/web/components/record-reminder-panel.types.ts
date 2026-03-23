"use client";

import type { ReminderItem } from "../lib/types";

export type ReminderFormValue = {
  title: string;
  message: string;
  remind_at: string;
};

export type RecordReminderPanelProps = {
  canWriteWorkspace: boolean;
  savingReminder: boolean;
  selectedRecordTitle: string | null;
  reminderForm: ReminderFormValue;
  reminders: ReminderItem[];
  reminderSectionTitle: string;
  reminderSectionDescription: string;
  reminderTitleLabel: string;
  reminderTitlePlaceholder: string;
  remindAtLabel: string;
  channelLabel: string;
  channelInApp: string;
  reminderNoteLabel: string;
  reminderNotePlaceholder: string;
  savingReminderLabel: string;
  createReminderLabel: string;
  untitledReminderLabel: string;
  pauseReminderLabel: string;
  enableReminderLabel: string;
  markReminderDoneLabel: string;
  deleteReminderLabel: string;
  noRemindersLabel: string;
  formatReminderTimestampLabel: (value: string) => string;
  formatReminderStatusLabel: (value: string) => string;
  formatReminderEnabledLabel: (value: boolean) => string;
  onTitleChange: (value: string) => void;
  onRemindAtChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onCreateReminder: () => Promise<void>;
  onToggleReminderEnabled: (reminder: ReminderItem) => Promise<void>;
  onMarkReminderDone: (reminder: ReminderItem) => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
};

export type RecordReminderItemCardProps = {
  canWriteWorkspace: boolean;
  reminder: ReminderItem;
  selectedRecordTitle: string | null;
  untitledReminderLabel: string;
  pauseReminderLabel: string;
  enableReminderLabel: string;
  markReminderDoneLabel: string;
  deleteReminderLabel: string;
  formatReminderTimestampLabel: (value: string) => string;
  formatReminderStatusLabel: (value: string) => string;
  formatReminderEnabledLabel: (value: boolean) => string;
  onToggleReminderEnabled: (reminder: ReminderItem) => Promise<void>;
  onMarkReminderDone: (reminder: ReminderItem) => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
};
