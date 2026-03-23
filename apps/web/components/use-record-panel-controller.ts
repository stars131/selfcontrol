"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import { createRecordPanelControllerHandlerGroups } from "./record-panel-controller-handler-groups";
import { buildRecordPanelControllerResult } from "./record-panel-controller-result";
import { useRecordPanelControllerSync } from "./use-record-panel-controller-sync";
import { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

export function useRecordPanelController({
  authToken,
  workspaceId,
  records,
  selectedRecordId,
  mediaAssets,
  mediaDeadLetterOverview,
  onSaveRecord,
  onCreateReminder,
  onDeleteMedia,
  onDeleteRecord,
  onBulkRetryMediaDeadLetter,
  onRefreshMediaStatus,
  onApplyRecordFilter,
  onCreateSearchPreset,
  onDeleteSearchPreset,
  onRetryMedia,
  onUploadMedia,
  recordFilter,
}: ControllerProps) {
  const viewData = useRecordPanelControllerViewData({
    mediaAssets,
    mediaDeadLetterOverview,
    records,
    selectedRecordId,
  });
  const state = useRecordPanelControllerState(recordFilter);
  useRecordPanelControllerSync({
    actionableDeadLetterIds: viewData.actionableDeadLetterIds,
    recordFilter,
    selectedRecord: viewData.selectedRecord,
    setFilterDraft: state.setFilterDraft,
    setForm: state.setForm,
    setLocationReviewForm: state.setLocationReviewForm,
    setReminderForm: state.setReminderForm,
    setSelectedDeadLetterIds: state.setSelectedDeadLetterIds,
  });
  const { recordHandlers, mediaHandlers } = createRecordPanelControllerHandlerGroups({
    authToken,
    detailCopy: viewData.detailCopy,
    filterDraft: state.filterDraft,
    form: state.form,
    locationReviewForm: state.locationReviewForm,
    mediaDeadLetterOverview,
    onApplyRecordFilter,
    onBulkRetryMediaDeadLetter,
    onCreateReminder,
    onCreateSearchPreset,
    onDeleteRecord,
    onDeleteSearchPreset,
    onSaveRecord,
    onDeleteMedia,
    onRefreshMediaStatus,
    onRetryMedia,
    onUploadMedia,
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
    workspaceId,
  });
  return buildRecordPanelControllerResult({ mediaHandlers, recordHandlers, state, viewData });
}
