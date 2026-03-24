"use client";
import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";

export function buildRecordEditorWorkspaceControllerFormatterInput({ controller }: Pick<RecordPanelShellInput, "controller">) {
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
