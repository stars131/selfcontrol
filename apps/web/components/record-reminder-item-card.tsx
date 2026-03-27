"use client";

import {
  buildRecordReminderItemCardActionsProps,
  buildRecordReminderItemCardSummaryProps,
} from "./record-reminder-item-card-child-props";
import { RecordReminderItemCardActions } from "./record-reminder-item-card-actions";
import { RecordReminderItemCardSummary } from "./record-reminder-item-card-summary";
import type { RecordReminderItemCardProps } from "./record-reminder-panel.types";

export function RecordReminderItemCard(props: RecordReminderItemCardProps) {
  const summaryProps = buildRecordReminderItemCardSummaryProps(props);
  const actionsProps = buildRecordReminderItemCardActionsProps(props);

  return (
    <article className="record-card">
      <RecordReminderItemCardSummary {...summaryProps} />
      <RecordReminderItemCardActions {...actionsProps} />
    </article>
  );
}
