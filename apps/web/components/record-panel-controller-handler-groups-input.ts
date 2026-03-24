"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>;
type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export function buildRecordPanelControllerHandlerGroupsInput({
  props,
  state,
  viewData,
}: {
  props: Pick<
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
  state: ControllerState;
  viewData: ControllerViewData;
}) {
  return {
    authToken: props.authToken,
    detailCopy: viewData.detailCopy,
    filterDraft: state.filterDraft,
    form: state.form,
    locationReviewForm: state.locationReviewForm,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    onApplyRecordFilter: props.onApplyRecordFilter,
    onBulkRetryMediaDeadLetter: props.onBulkRetryMediaDeadLetter,
    onCreateReminder: props.onCreateReminder,
    onCreateSearchPreset: props.onCreateSearchPreset,
    onDeleteMedia: props.onDeleteMedia,
    onDeleteRecord: props.onDeleteRecord,
    onDeleteSearchPreset: props.onDeleteSearchPreset,
    onRefreshMediaStatus: props.onRefreshMediaStatus,
    onRetryMedia: props.onRetryMedia,
    onSaveRecord: props.onSaveRecord,
    onUploadMedia: props.onUploadMedia,
    presetName: state.presetName,
    reminderForm: state.reminderForm,
    selectedDeadLetterIds: state.selectedDeadLetterIds,
    selectedRecord: viewData.selectedRecord,
    setBulkRetryingDeadLetter: state.setBulkRetryingDeadLetter,
    setDeleting: state.setDeleting,
    setDeletingMediaId: state.setDeletingMediaId,
    setDownloadingMediaId: state.setDownloadingMediaId,
    setError: state.setError,
    setForm: state.setForm,
    setPresetName: state.setPresetName,
    setRefreshingMediaId: state.setRefreshingMediaId,
    setReminderForm: state.setReminderForm,
    setRetryingMediaId: state.setRetryingMediaId,
    setSaving: state.setSaving,
    setSavingReminder: state.setSavingReminder,
    setSelectedDeadLetterIds: state.setSelectedDeadLetterIds,
    setUploading: state.setUploading,
    workspaceId: props.workspaceId,
  };
}
