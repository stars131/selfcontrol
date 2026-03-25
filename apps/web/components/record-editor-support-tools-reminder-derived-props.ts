"use client";

import type { BuildRecordReminderToolsDerivedPropsInput } from "./record-editor-support-tools-reminder-derived-props.types";

export function buildRecordReminderToolsDerivedProps({
  channelInAppLabel,
  selectedRecord,
}: BuildRecordReminderToolsDerivedPropsInput) {
  return {
    channelInApp: channelInAppLabel,
    hasSelectedRecord: Boolean(selectedRecord),
    selectedRecordTitle: selectedRecord?.title ?? null,
  };
}
