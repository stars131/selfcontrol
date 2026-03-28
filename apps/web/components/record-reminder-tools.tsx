"use client";

import { RecordReminderPanel } from "./record-reminder-panel";
import { buildRecordReminderPanelProps } from "./record-reminder-tools-panel-props";
import { createRecordReminderBindings } from "./record-reminder-tools-bindings";
import type { RecordReminderToolsProps } from "./record-reminder-tools.types";

export function RecordReminderTools(props: RecordReminderToolsProps) {
  const bindings = createRecordReminderBindings({
    onUpdateReminder: props.onUpdateReminder,
    setReminderForm: props.setReminderForm,
  });

  if (!props.hasSelectedRecord) {
    return null;
  }

  return <RecordReminderPanel {...buildRecordReminderPanelProps({ ...props, bindings })} />;
}
