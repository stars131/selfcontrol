"use client";

import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export function buildRecordPanelControllerViewDataResult(viewData: ControllerViewData) {
  return {
    locale: viewData.locale,
    avoidCount: viewData.avoidCount,
    foodCount: viewData.foodCount,
    selectedRecord: viewData.selectedRecord,
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
  };
}
