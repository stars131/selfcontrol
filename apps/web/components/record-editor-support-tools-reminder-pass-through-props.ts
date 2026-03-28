"use client";

import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";

export function buildRecordReminderToolsPassThroughProps(input: RecordEditorSupportToolsProps) {
  const { channelInAppLabel, selectedRecord, ...passThroughProps } = input;
  void channelInAppLabel;
  void selectedRecord;
  return passThroughProps;
}
