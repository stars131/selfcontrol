"use client";
import type { BuildRecordEditorWorkspaceControllerInputArgs } from "./record-panel-v2-editor-workspace-controller-input.types";

export function buildRecordEditorWorkspaceControllerFormatterInput({ controller }: BuildRecordEditorWorkspaceControllerInputArgs) {
  return {
    formatFileCountLabel: controller.formatFileCountLabel,
    formatHistoryTimestampLabel: controller.formatHistoryTimestampLabel,
    formatReminderEnabledLabel: controller.formatReminderEnabledLabel,
    formatReminderStatusLabel: controller.formatReminderStatusLabel,
    formatReminderTimestampLabel: controller.formatReminderTimestampLabel,
    formatReviewStatusLabel: controller.formatReviewStatusLabel,
    summarizeHistoryActionLabel: controller.summarizeHistoryActionLabel,
  };
}
