"use client";

import type { ReminderItem } from "../lib/types";

type ReminderFormValue = {
  title: string;
  message: string;
  remind_at: string;
};

type RecordReminderPanelProps = {
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

export function RecordReminderPanel({
  canWriteWorkspace,
  savingReminder,
  selectedRecordTitle,
  reminderForm,
  reminders,
  reminderSectionTitle,
  reminderSectionDescription,
  reminderTitleLabel,
  reminderTitlePlaceholder,
  remindAtLabel,
  channelLabel,
  channelInApp,
  reminderNoteLabel,
  reminderNotePlaceholder,
  savingReminderLabel,
  createReminderLabel,
  untitledReminderLabel,
  pauseReminderLabel,
  enableReminderLabel,
  markReminderDoneLabel,
  deleteReminderLabel,
  noRemindersLabel,
  formatReminderTimestampLabel,
  formatReminderStatusLabel,
  formatReminderEnabledLabel,
  onTitleChange,
  onRemindAtChange,
  onMessageChange,
  onCreateReminder,
  onToggleReminderEnabled,
  onMarkReminderDone,
  onDeleteReminder,
}: RecordReminderPanelProps) {
  return (
    <div className="record-card form-stack">
      <div className="eyebrow">{reminderSectionTitle}</div>
      <div className="muted">{reminderSectionDescription}</div>
      <div className="form-stack">
        <div className="inline-fields">
          <label className="field">
            <span className="field-label">{reminderTitleLabel}</span>
            <input
              className="input"
              disabled={!canWriteWorkspace}
              value={reminderForm.title}
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder={reminderTitlePlaceholder}
            />
          </label>
          <label className="field">
            <span className="field-label">{remindAtLabel}</span>
            <input
              className="input"
              type="datetime-local"
              disabled={!canWriteWorkspace}
              value={reminderForm.remind_at}
              onChange={(event) => onRemindAtChange(event.target.value)}
            />
          </label>
          <label className="field">
            <span className="field-label">{channelLabel}</span>
            <input className="input" disabled value={channelInApp} />
          </label>
        </div>
        <label className="field">
          <span className="field-label">{reminderNoteLabel}</span>
          <textarea
            className="textarea"
            disabled={!canWriteWorkspace}
            value={reminderForm.message}
            onChange={(event) => onMessageChange(event.target.value)}
            placeholder={reminderNotePlaceholder}
          />
        </label>
        <div className="action-row">
          <button
            className="button secondary"
            disabled={savingReminder || !canWriteWorkspace}
            type="button"
            onClick={() => void onCreateReminder()}
          >
            {savingReminder ? savingReminderLabel : createReminderLabel}
          </button>
        </div>
      </div>
      <div className="record-list compact-list">
        {reminders.length ? (
          reminders.map((reminder) => (
            <article className="record-card" key={reminder.id}>
              <div className="eyebrow">{reminder.channel_code}</div>
              <h4 style={{ margin: "8px 0 6px", fontSize: 18 }}>
                {reminder.title || selectedRecordTitle || untitledReminderLabel}
              </h4>
              <div className="muted">{formatReminderTimestampLabel(reminder.remind_at)}</div>
              {reminder.message ? (
                <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{reminder.message}</p>
              ) : null}
              <div className="tag-row">
                <span className="tag">{formatReminderStatusLabel(reminder.status)}</span>
                <span className="tag">{formatReminderEnabledLabel(reminder.is_enabled)}</span>
              </div>
              <div className="action-row" style={{ marginTop: 12 }}>
                <button
                  className="button secondary"
                  type="button"
                  disabled={!canWriteWorkspace}
                  onClick={() => void onToggleReminderEnabled(reminder)}
                >
                  {reminder.is_enabled ? pauseReminderLabel : enableReminderLabel}
                </button>
                {reminder.status !== "completed" ? (
                  <button
                    className="button secondary"
                    type="button"
                    disabled={!canWriteWorkspace}
                    onClick={() => void onMarkReminderDone(reminder)}
                  >
                    {markReminderDoneLabel}
                  </button>
                ) : null}
                <button
                  className="button secondary"
                  type="button"
                  disabled={!canWriteWorkspace}
                  onClick={() => void onDeleteReminder(reminder.id)}
                >
                  {deleteReminderLabel}
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="notice">{noRemindersLabel}</div>
        )}
      </div>
    </div>
  );
}
