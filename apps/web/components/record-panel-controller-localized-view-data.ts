import type { LocaleCode } from "../lib/locale";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";

export function buildRecordPanelLocalizedViewData(locale: LocaleCode) {
  const { mediaIssueCopy, panelCopy } = getRecordPanelUiBundle(locale);
  const detailBundle = getRecordPanelDetailBundle(locale);
  return {
    mediaIssueCopy, panelCopy, detailCopy: detailBundle.copy,
    formatAvoidCountLabel: detailBundle.formatAvoidCountLabel, formatFileCountLabel: detailBundle.formatFileCountLabel,
    formatRecordSourceLabel: detailBundle.formatRecordSourceLabel, formatRecordStatusLabel: detailBundle.formatRecordStatusLabel,
    formatHistoryTimestampLabel: detailBundle.formatHistoryTimestampLabel, formatRecordTimestampLabel: detailBundle.formatRecordTimestampLabel,
    formatRecordTypeLabel: detailBundle.formatRecordTypeLabel, formatReminderEnabledLabel: detailBundle.formatReminderEnabledLabel,
    formatReminderStatusLabel: detailBundle.formatReminderStatusLabel, formatReminderTimestampLabel: detailBundle.formatReminderTimestampLabel,
    formatReviewStatusLabel: detailBundle.formatReviewStatusLabel, formatTimelineCountLabel: detailBundle.formatTimelineCountLabel,
    formatTimelineDateLabel: detailBundle.formatTimelineDateLabel, summarizeHistoryActionLabel: detailBundle.summarizeHistoryActionLabel,
    summarizeRecordFilterLabel: detailBundle.summarizeRecordFilterLabel,
  };
}
