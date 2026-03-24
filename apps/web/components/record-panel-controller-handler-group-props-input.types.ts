"use client";

import type { ControllerProps } from "./record-panel-controller.types";

export type RecordPanelControllerHandlerGroupPropsInput = Pick<
  ControllerProps,
  | "authToken"
  | "mediaDeadLetterOverview"
  | "onApplyRecordFilter"
  | "onBulkRetryMediaDeadLetter"
  | "onCreateReminder"
  | "onCreateSearchPreset"
  | "onDeleteMedia"
  | "onDeleteRecord"
  | "onDeleteSearchPreset"
  | "onRefreshMediaStatus"
  | "onRetryMedia"
  | "onSaveRecord"
  | "onUploadMedia"
  | "workspaceId"
>;
