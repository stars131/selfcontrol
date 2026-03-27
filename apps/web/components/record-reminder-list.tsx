"use client";

import { buildRecordReminderItemCardProps } from "./record-reminder-list-item-props";
import { RecordReminderItemCard } from "./record-reminder-item-card";
import type { RecordReminderListProps } from "./record-reminder-list.types";
export function RecordReminderList({ ...props }: RecordReminderListProps) {
  return (
    <div className="record-list compact-list">
      {props.reminders.length ? (
        props.reminders.map((reminder) => (
          <RecordReminderItemCard
            key={reminder.id}
            {...buildRecordReminderItemCardProps({ props, reminder })}
          />
        ))
      ) : (
        <div className="notice">{props.noRemindersLabel}</div>
      )}
    </div>
  );
}
