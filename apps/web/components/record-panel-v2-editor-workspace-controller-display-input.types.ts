import type { RecordPanelController } from "./record-panel-v2-shell-props.types";

export type BuildRecordEditorWorkspaceControllerDisplayInput = Pick<
  RecordPanelController,
  | "bulkRetryingDeadLetter"
  | "deleting"
  | "deletingMediaId"
  | "detailCopy"
  | "downloadingMediaId"
  | "error"
  | "form"
  | "locale"
  | "locationReviewForm"
  | "mediaIssueCopy"
  | "panelCopy"
  | "refreshingMediaId"
  | "reminderForm"
  | "retryingMediaId"
  | "saving"
  | "savingReminder"
  | "selectedDeadLetterIds"
  | "selectedLocationHistory"
  | "selectedLocationReview"
  | "selectedRecord"
  | "selectedRecordMediaSizeLabel"
  | "uploading"
>;
