"use client";
import { useMemo } from "react";
import type { MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";
import { buildRecordPanelRecordViewData } from "./record-panel-controller-record-view-data";
import { buildRecordPanelSelectedRecordViewData } from "./record-panel-controller-selected-record-view-data";
import { useRecordPanelControllerLocalizedViewData } from "./use-record-panel-controller-localized-view-data";

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
  const recordViewData = useMemo(
    () => buildRecordPanelRecordViewData({ records, selectedRecordId }),
    [records, selectedRecordId],
  );
  const selectedRecordViewData = useMemo(
    () => buildRecordPanelSelectedRecordViewData({ mediaAssets, mediaDeadLetterOverview, selectedRecord: recordViewData.selectedRecord }),
    [mediaAssets, mediaDeadLetterOverview, recordViewData.selectedRecord],
  );
  const localizedViewData = useRecordPanelControllerLocalizedViewData();

  return {
    ...recordViewData,
    ...selectedRecordViewData,
    ...localizedViewData,
  };
}
