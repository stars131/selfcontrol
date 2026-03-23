"use client";

import type { createRecordPanelControllerHandlerGroups } from "./record-panel-controller-handler-groups";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>;
type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;
type ControllerHandlers = ReturnType<typeof createRecordPanelControllerHandlerGroups>;

export function buildRecordPanelControllerResult({
  mediaHandlers,
  recordHandlers,
  state,
  viewData,
}: {
  mediaHandlers: ControllerHandlers["mediaHandlers"];
  recordHandlers: ControllerHandlers["recordHandlers"];
  state: ControllerState;
  viewData: ControllerViewData;
}) {
  return {
    locale: viewData.locale,
    avoidCount: viewData.avoidCount,
    foodCount: viewData.foodCount,
    selectedRecord: viewData.selectedRecord,
    form: state.form,
    setForm: state.setForm,
    saving: state.saving,
    deleting: state.deleting,
    uploading: state.uploading,
    refreshingMediaId: state.refreshingMediaId,
    retryingMediaId: state.retryingMediaId,
    bulkRetryingDeadLetter: state.bulkRetryingDeadLetter,
    downloadingMediaId: state.downloadingMediaId,
    deletingMediaId: state.deletingMediaId,
    reminderForm: state.reminderForm,
    setReminderForm: state.setReminderForm,
    savingReminder: state.savingReminder,
    locationReviewForm: state.locationReviewForm,
    setLocationReviewForm: state.setLocationReviewForm,
    viewMode: state.viewMode,
    setViewMode: state.setViewMode,
    filterDraft: state.filterDraft,
    setFilterDraft: state.setFilterDraft,
    presetName: state.presetName,
    setPresetName: state.setPresetName,
    selectedDeadLetterIds: state.selectedDeadLetterIds,
    error: state.error,
    selectedLocationReview: viewData.selectedLocationReview,
    selectedLocationHistory: viewData.selectedLocationHistory,
    selectedRecordMediaSizeLabel: viewData.selectedRecordMediaSizeLabel,
    mediaIssueCopy: viewData.mediaIssueCopy,
    panelCopy: viewData.panelCopy,
    detailCopy: viewData.detailCopy,
    formatAvoidCountLabel: viewData.formatAvoidCountLabel,
    formatFileCountLabel: viewData.formatFileCountLabel,
    formatHistoryTimestampLabel: viewData.formatHistoryTimestampLabel,
    formatRecordTimestampLabel: viewData.formatRecordTimestampLabel,
    formatReminderEnabledLabel: viewData.formatReminderEnabledLabel,
    formatReminderStatusLabel: viewData.formatReminderStatusLabel,
    formatReminderTimestampLabel: viewData.formatReminderTimestampLabel,
    formatReviewStatusLabel: viewData.formatReviewStatusLabel,
    formatTimelineCountLabel: viewData.formatTimelineCountLabel,
    formatTimelineDateLabel: viewData.formatTimelineDateLabel,
    summarizeHistoryActionLabel: viewData.summarizeHistoryActionLabel,
    summarizeRecordFilterLabel: viewData.summarizeRecordFilterLabel,
    ...recordHandlers,
    ...mediaHandlers,
  };
}
