"use client";

import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";

export function buildRecordPanelControllerLocalizedViewDataResult(input: BuildRecordPanelControllerViewDataResultInput) {
  return {
    mediaIssueCopy: input.mediaIssueCopy, panelCopy: input.panelCopy, detailCopy: input.detailCopy,
    formatAvoidCountLabel: input.formatAvoidCountLabel, formatFileCountLabel: input.formatFileCountLabel,
    formatRecordSourceLabel: input.formatRecordSourceLabel, formatRecordStatusLabel: input.formatRecordStatusLabel,
    formatHistoryTimestampLabel: input.formatHistoryTimestampLabel, formatRecordTimestampLabel: input.formatRecordTimestampLabel,
    formatRecordTypeLabel: input.formatRecordTypeLabel, formatReminderEnabledLabel: input.formatReminderEnabledLabel,
    formatReminderStatusLabel: input.formatReminderStatusLabel, formatReminderTimestampLabel: input.formatReminderTimestampLabel,
    formatReviewStatusLabel: input.formatReviewStatusLabel, formatTimelineCountLabel: input.formatTimelineCountLabel,
    formatTimelineDateLabel: input.formatTimelineDateLabel, summarizeHistoryActionLabel: input.summarizeHistoryActionLabel,
    summarizeRecordFilterLabel: input.summarizeRecordFilterLabel,
  };
}
