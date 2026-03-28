"use client";
import type { BuildRecordEditorWorkspaceControllerInputArgs } from "./record-panel-v2-editor-workspace-controller-input.types";

export function buildRecordEditorWorkspaceControllerFormatterInput(input: BuildRecordEditorWorkspaceControllerInputArgs) {
  return {
    formatFileCountLabel: input.formatFileCountLabel,
    formatHistoryTimestampLabel: input.formatHistoryTimestampLabel,
    formatReminderEnabledLabel: input.formatReminderEnabledLabel,
    formatReminderStatusLabel: input.formatReminderStatusLabel,
    formatReminderTimestampLabel: input.formatReminderTimestampLabel,
    formatReviewStatusLabel: input.formatReviewStatusLabel,
    summarizeHistoryActionLabel: input.summarizeHistoryActionLabel,
  };
}
