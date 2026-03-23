"use client";

import type { RecordPanelV2Props } from "./record-panel-v2.types";

export type ControllerProps = Pick<
  RecordPanelV2Props,
  | "authToken"
  | "workspaceId"
  | "records"
  | "selectedRecordId"
  | "mediaAssets"
  | "mediaDeadLetterOverview"
  | "onSaveRecord"
  | "onCreateReminder"
  | "onDeleteMedia"
  | "onDeleteRecord"
  | "onBulkRetryMediaDeadLetter"
  | "onRefreshMediaStatus"
  | "onApplyRecordFilter"
  | "onCreateSearchPreset"
  | "onDeleteSearchPreset"
  | "onRetryMedia"
  | "onUploadMedia"
  | "recordFilter"
>;
