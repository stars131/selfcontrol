import type { RecordPanelV2Props } from "./record-panel-v2.types";

export type BuildRecordEditorWorkspacePropInput = Pick<
  RecordPanelV2Props,
  | "authToken"
  | "canWriteWorkspace"
  | "workspaceId"
  | "mediaAssets"
  | "mediaDeadLetterOverview"
  | "mediaProcessingOverview"
  | "mediaStorageSummary"
  | "reminders"
  | "onDeleteReminder"
  | "onUpdateReminder"
>;
