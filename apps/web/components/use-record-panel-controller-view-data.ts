"use client";
import { useMemo } from "react";
import { readLocationHistory, readLocationReview } from "../lib/location";
import { useStoredLocale } from "../lib/locale";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { LocationReview, MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";
import { countAvoidRecords, countFoodRecords, findSelectedRecord, getActionableDeadLetterIds, getSelectedRecordMediaSizeLabel } from "./record-panel-controller-view-data-helpers";

export function useRecordPanelControllerViewData({
  mediaAssets,
  mediaDeadLetterOverview,
  records,
  selectedRecordId,
}: {
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  records: RecordItem[];
  selectedRecordId?: string | null;
}) {
  const { locale } = useStoredLocale();
  const avoidCount = useMemo(() => countAvoidRecords(records), [records]);
  const foodCount = useMemo(() => countFoodRecords(records), [records]);
  const selectedRecord = useMemo(() => findSelectedRecord(records, selectedRecordId), [records, selectedRecordId]);
  const selectedLocationReview = useMemo<LocationReview | null>(
    () => readLocationReview(selectedRecord?.extra_data),
    [selectedRecord],
  );
  const selectedLocationHistory = useMemo(
    () => readLocationHistory(selectedRecord?.extra_data).slice().reverse(),
    [selectedRecord],
  );
  const selectedRecordMediaSizeLabel = useMemo(
    () => getSelectedRecordMediaSizeLabel(mediaAssets),
    [mediaAssets],
  );
  const actionableDeadLetterIds = useMemo(
    () => getActionableDeadLetterIds(mediaDeadLetterOverview),
    [mediaDeadLetterOverview],
  );

  const { mediaIssueCopy, panelCopy } = useMemo(() => getRecordPanelUiBundle(locale), [locale]);
  const detailBundle = useMemo(() => getRecordPanelDetailBundle(locale), [locale]);

  return {
    locale,
    avoidCount,
    foodCount,
    selectedRecord,
    selectedLocationReview,
    selectedLocationHistory,
    selectedRecordMediaSizeLabel,
    actionableDeadLetterIds,
    mediaIssueCopy,
    panelCopy,
    detailCopy: detailBundle.copy,
    formatAvoidCountLabel: detailBundle.formatAvoidCountLabel,
    formatFileCountLabel: detailBundle.formatFileCountLabel,
    formatHistoryTimestampLabel: detailBundle.formatHistoryTimestampLabel,
    formatRecordTimestampLabel: detailBundle.formatRecordTimestampLabel,
    formatReminderEnabledLabel: detailBundle.formatReminderEnabledLabel,
    formatReminderStatusLabel: detailBundle.formatReminderStatusLabel,
    formatReminderTimestampLabel: detailBundle.formatReminderTimestampLabel,
    formatReviewStatusLabel: detailBundle.formatReviewStatusLabel,
    formatTimelineCountLabel: detailBundle.formatTimelineCountLabel,
    formatTimelineDateLabel: detailBundle.formatTimelineDateLabel,
    summarizeHistoryActionLabel: detailBundle.summarizeHistoryActionLabel,
    summarizeRecordFilterLabel: detailBundle.summarizeRecordFilterLabel,
  };
}
