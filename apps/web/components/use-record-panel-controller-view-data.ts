"use client";

import { useMemo } from "react";

import { readLocationHistory, readLocationReview } from "../lib/location";
import { useStoredLocale } from "../lib/locale";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { formatByteCount } from "../lib/record-panel-format";
import { canRetryMediaIssue } from "../lib/record-panel-media";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { LocationReview, MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";

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

  const avoidCount = useMemo(() => records.filter((record) => record.is_avoid).length, [records]);
  const foodCount = useMemo(
    () => records.filter((record) => record.type_code === "food").length,
    [records],
  );
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );
  const selectedLocationReview = useMemo<LocationReview | null>(
    () => readLocationReview(selectedRecord?.extra_data),
    [selectedRecord],
  );
  const selectedLocationHistory = useMemo(
    () => readLocationHistory(selectedRecord?.extra_data).slice().reverse(),
    [selectedRecord],
  );
  const selectedRecordMediaSizeLabel = useMemo(
    () => formatByteCount(mediaAssets.reduce((sum, asset) => sum + asset.size_bytes, 0)),
    [mediaAssets],
  );
  const actionableDeadLetterIds = useMemo(
    () =>
      new Set(
        (mediaDeadLetterOverview?.items ?? [])
          .filter((item) => canRetryMediaIssue(item))
          .map((item) => item.media_id),
      ),
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
