"use client";

import { createRecordPanelControllerMediaHandlers } from "./record-panel-controller-media-handlers";
import { createRecordPanelControllerRecordHandlers } from "./record-panel-controller-record-handlers";
import type { ControllerProps } from "./record-panel-controller.types";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>;
type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export function createRecordPanelControllerHandlerGroups({
  authToken,
  detailCopy,
  filterDraft,
  form,
  locationReviewForm,
  mediaDeadLetterOverview,
  onApplyRecordFilter,
  onBulkRetryMediaDeadLetter,
  onCreateReminder,
  onCreateSearchPreset,
  onDeleteMedia,
  onDeleteRecord,
  onDeleteSearchPreset,
  onRefreshMediaStatus,
  onRetryMedia,
  onSaveRecord,
  onUploadMedia,
  presetName,
  reminderForm,
  selectedDeadLetterIds,
  selectedRecord,
  setBulkRetryingDeadLetter,
  setDeleting,
  setDeletingMediaId,
  setDownloadingMediaId,
  setError,
  setForm,
  setPresetName,
  setRefreshingMediaId,
  setReminderForm,
  setRetryingMediaId,
  setSaving,
  setSavingReminder,
  setSelectedDeadLetterIds,
  setUploading,
  workspaceId,
}: Pick<ControllerProps, "authToken" | "mediaDeadLetterOverview" | "onApplyRecordFilter" | "onBulkRetryMediaDeadLetter" | "onCreateReminder" | "onCreateSearchPreset" | "onDeleteMedia" | "onDeleteRecord" | "onDeleteSearchPreset" | "onRefreshMediaStatus" | "onRetryMedia" | "onSaveRecord" | "onUploadMedia" | "workspaceId"> &
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
  Pick<ControllerViewData, "detailCopy" | "selectedRecord">) {
  const recordHandlers = createRecordPanelControllerRecordHandlers({
    detailCopy,
    filterDraft,
    form,
    locationReviewForm,
    onApplyRecordFilter,
    onCreateReminder,
    onCreateSearchPreset,
    onDeleteRecord,
    onDeleteSearchPreset,
    onSaveRecord,
    presetName,
    reminderForm,
    selectedRecord,
    setDeleting,
    setError,
    setForm,
    setPresetName,
    setReminderForm,
    setSaving,
    setSavingReminder,
  });
  const mediaHandlers = createRecordPanelControllerMediaHandlers({
    authToken,
    detailCopy,
    mediaDeadLetterOverview,
    onBulkRetryMediaDeadLetter,
    onDeleteMedia,
    onRefreshMediaStatus,
    onRetryMedia,
    onUploadMedia,
    selectedDeadLetterIds,
    selectedRecord,
    setBulkRetryingDeadLetter,
    setDeletingMediaId,
    setDownloadingMediaId,
    setError,
    setRefreshingMediaId,
    setRetryingMediaId,
    setSelectedDeadLetterIds,
    setUploading,
    workspaceId,
  });

  return {
    recordHandlers,
    mediaHandlers,
  };
}
