"use client";

import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";

export function buildRecordReminderToolsDerivedProps({
  channelInAppLabel,
  selectedRecord,
}: Pick<RecordEditorSupportToolsProps, "channelInAppLabel" | "selectedRecord">) {
  return {
    channelInApp: channelInAppLabel,
    hasSelectedRecord: Boolean(selectedRecord),
    selectedRecordTitle: selectedRecord?.title ?? null,
  };
}
