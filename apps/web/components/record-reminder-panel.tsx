"use client";

import {
  buildRecordReminderFormProps,
  buildRecordReminderListProps,
} from "./record-reminder-panel-child-props";
import { RecordReminderForm } from "./record-reminder-form";
import { RecordReminderList } from "./record-reminder-list";
import type { RecordReminderPanelProps } from "./record-reminder-panel.types";

export function RecordReminderPanel(props: RecordReminderPanelProps) {
  const formProps = buildRecordReminderFormProps(props);
  const listProps = buildRecordReminderListProps(props);

  return (
    <div className="record-card form-stack">
      <div className="eyebrow">{props.reminderSectionTitle}</div>
      <div className="muted">{props.reminderSectionDescription}</div>
      <RecordReminderForm {...formProps} />
      <RecordReminderList {...listProps} />
    </div>
  );
}
