"use client";

import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";
import { buildRecordReminderToolsDerivedProps } from "./record-editor-support-tools-reminder-derived-props";
import { buildRecordReminderToolsPassThroughProps } from "./record-editor-support-tools-reminder-pass-through-props";

export function buildRecordReminderToolsProps(props: RecordEditorSupportToolsProps) {
  const derivedProps = buildRecordReminderToolsDerivedProps(props);
  const passThroughProps = buildRecordReminderToolsPassThroughProps(props);

  return {
    ...derivedProps,
    ...passThroughProps,
  };
}
