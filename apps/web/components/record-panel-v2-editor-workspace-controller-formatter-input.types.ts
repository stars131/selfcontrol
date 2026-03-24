import type { RecordPanelController } from "./record-panel-v2-shell-props.types";

export type BuildRecordEditorWorkspaceControllerFormatterInput = Pick<
  RecordPanelController,
  | "formatFileCountLabel"
  | "formatHistoryTimestampLabel"
  | "formatReminderEnabledLabel"
  | "formatReminderStatusLabel"
  | "formatReminderTimestampLabel"
  | "formatReviewStatusLabel"
  | "summarizeHistoryActionLabel"
>;
