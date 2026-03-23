"use client";

import { RecordMediaTools } from "./record-media-tools";
import { RecordReminderTools } from "./record-reminder-tools";
import {
  buildRecordMediaToolsProps,
  buildRecordReminderToolsProps,
} from "./record-editor-support-tools-props";
import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";

export function RecordEditorSupportTools({
  ...props
}: RecordEditorSupportToolsProps) {
  const mediaToolsProps = buildRecordMediaToolsProps(props);
  const reminderToolsProps = buildRecordReminderToolsProps(props);

  return (
    <>
      <RecordMediaTools {...mediaToolsProps} />
      <RecordReminderTools {...reminderToolsProps} />
    </>
  );
}
