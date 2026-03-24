"use client";
import { useMemo } from "react";
import { useStoredLocale } from "../lib/locale";
import type { MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";
import { buildRecordPanelLocalizedViewData } from "./record-panel-controller-localized-view-data";
import { buildRecordPanelRecordViewData } from "./record-panel-controller-record-view-data";
import { buildRecordPanelSelectedRecordViewData } from "./record-panel-controller-selected-record-view-data";

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
  const recordViewData = useMemo(
    () => buildRecordPanelRecordViewData({ records, selectedRecordId }),
    [records, selectedRecordId],
  );
  const selectedRecordViewData = useMemo(
    () => buildRecordPanelSelectedRecordViewData({ mediaAssets, mediaDeadLetterOverview, selectedRecord: recordViewData.selectedRecord }),
    [mediaAssets, mediaDeadLetterOverview, recordViewData.selectedRecord],
  );
  const localizedViewData = useMemo(() => buildRecordPanelLocalizedViewData(locale), [locale]);

  return {
    locale,
    ...recordViewData,
    ...selectedRecordViewData,
    ...localizedViewData,
  };
}
