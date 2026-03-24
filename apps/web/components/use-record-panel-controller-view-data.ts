"use client";
import { useMemo } from "react";
import { buildRecordPanelRecordViewData } from "./record-panel-controller-record-view-data";
import { buildRecordPanelSelectedRecordViewData } from "./record-panel-controller-selected-record-view-data";
import { useRecordPanelControllerLocalizedViewData } from "./use-record-panel-controller-localized-view-data";
import type { UseRecordPanelControllerViewDataInput } from "./use-record-panel-controller-view-data.types";
export function useRecordPanelControllerViewData({ mediaAssets, mediaDeadLetterOverview, records, selectedRecordId }: UseRecordPanelControllerViewDataInput) {
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
