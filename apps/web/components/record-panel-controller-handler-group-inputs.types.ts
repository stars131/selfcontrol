"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>;
type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export type RecordPanelControllerHandlerGroupInput = Pick<
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
> &
  Pick<
    ControllerState,
    | "filterDraft"
    | "form"
    | "locationReviewForm"
    | "presetName"
    | "reminderForm"
    | "selectedDeadLetterIds"
    | "setBulkRetryingDeadLetter"
    | "setDeleting"
    | "setDeletingMediaId"
    | "setDownloadingMediaId"
    | "setError"
    | "setForm"
    | "setPresetName"
    | "setRefreshingMediaId"
    | "setReminderForm"
    | "setRetryingMediaId"
    | "setSaving"
    | "setSavingReminder"
    | "setSelectedDeadLetterIds"
    | "setUploading"
  > &
  Pick<ControllerViewData, "detailCopy" | "selectedRecord">;
