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

export function buildRecordPanelControllerRecordHandlerInput(
  input: RecordPanelControllerHandlerGroupInput,
) {
  return {
    detailCopy: input.detailCopy,
    filterDraft: input.filterDraft,
    form: input.form,
    locationReviewForm: input.locationReviewForm,
    onApplyRecordFilter: input.onApplyRecordFilter,
    onCreateReminder: input.onCreateReminder,
    onCreateSearchPreset: input.onCreateSearchPreset,
    onDeleteRecord: input.onDeleteRecord,
    onDeleteSearchPreset: input.onDeleteSearchPreset,
    onSaveRecord: input.onSaveRecord,
    presetName: input.presetName,
    reminderForm: input.reminderForm,
    selectedRecord: input.selectedRecord,
    setDeleting: input.setDeleting,
    setError: input.setError,
    setForm: input.setForm,
    setPresetName: input.setPresetName,
    setReminderForm: input.setReminderForm,
    setSaving: input.setSaving,
    setSavingReminder: input.setSavingReminder,
  };
}

export function buildRecordPanelControllerMediaHandlerInput(
  input: RecordPanelControllerHandlerGroupInput,
) {
  return {
    authToken: input.authToken,
    detailCopy: input.detailCopy,
    mediaDeadLetterOverview: input.mediaDeadLetterOverview,
    onBulkRetryMediaDeadLetter: input.onBulkRetryMediaDeadLetter,
    onDeleteMedia: input.onDeleteMedia,
    onRefreshMediaStatus: input.onRefreshMediaStatus,
    onRetryMedia: input.onRetryMedia,
    onUploadMedia: input.onUploadMedia,
    selectedDeadLetterIds: input.selectedDeadLetterIds,
    selectedRecord: input.selectedRecord,
    setBulkRetryingDeadLetter: input.setBulkRetryingDeadLetter,
    setDeletingMediaId: input.setDeletingMediaId,
    setDownloadingMediaId: input.setDownloadingMediaId,
    setError: input.setError,
    setRefreshingMediaId: input.setRefreshingMediaId,
    setRetryingMediaId: input.setRetryingMediaId,
    setSelectedDeadLetterIds: input.setSelectedDeadLetterIds,
    setUploading: input.setUploading,
    workspaceId: input.workspaceId,
  };
}
