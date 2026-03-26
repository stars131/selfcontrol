"use client";

import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";

export function buildRecordPanelControllerLocalizedViewDataResult(viewData: BuildRecordPanelControllerViewDataResultInput) {
  return {
    mediaIssueCopy: viewData.mediaIssueCopy, panelCopy: viewData.panelCopy, detailCopy: viewData.detailCopy,
    formatAvoidCountLabel: viewData.formatAvoidCountLabel, formatFileCountLabel: viewData.formatFileCountLabel,
    formatRecordSourceLabel: viewData.formatRecordSourceLabel, formatRecordStatusLabel: viewData.formatRecordStatusLabel,
    formatHistoryTimestampLabel: viewData.formatHistoryTimestampLabel, formatRecordTimestampLabel: viewData.formatRecordTimestampLabel,
    formatRecordTypeLabel: viewData.formatRecordTypeLabel, formatReminderEnabledLabel: viewData.formatReminderEnabledLabel,
    formatReminderStatusLabel: viewData.formatReminderStatusLabel, formatReminderTimestampLabel: viewData.formatReminderTimestampLabel,
    formatReviewStatusLabel: viewData.formatReviewStatusLabel, formatTimelineCountLabel: viewData.formatTimelineCountLabel,
    formatTimelineDateLabel: viewData.formatTimelineDateLabel, summarizeHistoryActionLabel: viewData.summarizeHistoryActionLabel,
    summarizeRecordFilterLabel: viewData.summarizeRecordFilterLabel,
  };
}
