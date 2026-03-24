"use client";
import { useMemo } from "react";
import { useStoredLocale } from "../lib/locale";
import type { LocationReview, MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";
import { buildRecordPanelLocalizedViewData } from "./record-panel-controller-localized-view-data";
import {
  getSelectedRecordLocationHistory,
  getSelectedRecordLocationReview,
} from "./record-panel-controller-location-view-data";
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
    () => getSelectedRecordLocationReview(selectedRecord),
    [selectedRecord],
  );
  const selectedLocationHistory = useMemo(
    () => getSelectedRecordLocationHistory(selectedRecord),
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
  const localizedViewData = useMemo(() => buildRecordPanelLocalizedViewData(locale), [locale]);

  return {
    locale,
    avoidCount,
    foodCount,
    selectedRecord,
    selectedLocationReview,
    selectedLocationHistory,
    selectedRecordMediaSizeLabel,
    actionableDeadLetterIds,
    ...localizedViewData,
  };
}
