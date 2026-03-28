"use client";

import type { BuildRecordReminderToolsDerivedPropsInput } from "./record-editor-support-tools-reminder-derived-props.types";

export function buildRecordReminderToolsDerivedProps(input: BuildRecordReminderToolsDerivedPropsInput) {
  return {
    channelInApp: input.channelInAppLabel,
    hasSelectedRecord: Boolean(input.selectedRecord),
    selectedRecordTitle: input.selectedRecord?.title ?? null,
  };
}
