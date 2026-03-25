"use client";

import type { RecordReminderItemCardSummaryProps } from "./record-reminder-item-card-summary.types";

export function RecordReminderItemCardSummary({
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  reminder,
  selectedRecordTitle,
  untitledReminderLabel,
}: RecordReminderItemCardSummaryProps) {
  return (
    <>
      <div className="eyebrow">{reminder.channel_code}</div>
      <h4 style={{ margin: "8px 0 6px", fontSize: 18 }}>
        {reminder.title || selectedRecordTitle || untitledReminderLabel}
      </h4>
      <div className="muted">{formatReminderTimestampLabel(reminder.remind_at)}</div>
      {reminder.message ? <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{reminder.message}</p> : null}
      <div className="tag-row">
        <span className="tag">{formatReminderStatusLabel(reminder.status)}</span>
        <span className="tag">{formatReminderEnabledLabel(reminder.is_enabled)}</span>
      </div>
    </>
  );
}
