"use client";

import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";

export function buildRecordReminderToolsPassThroughProps({
  channelInAppLabel,
  selectedRecord,
  ...passThroughProps
}: RecordEditorSupportToolsProps) {
  void channelInAppLabel;
  void selectedRecord;
  return passThroughProps;
}
