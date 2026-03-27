"use client";

import { useMemo } from "react";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import {
  parseDraftCoordinates,
  parseMappedRecords,
} from "../lib/map-panel";
import { readLocationReview } from "../lib/location";
import type { UseMapPanelDerivedDataInput } from "./use-map-panel-derived-data.types";

export function useMapPanelDerivedData({
  draftLocation,
  records,
}: UseMapPanelDerivedDataInput) {
  const { locale } = useStoredLocale();
  const { panelCopy } = getRecordPanelUiBundle(locale);
  const mappedRecords = useMemo(
    () => parseMappedRecords(records, { untitledRecord: panelCopy.untitledRecord, unknownPlace: panelCopy.unknownPlace }),
    [panelCopy.unknownPlace, panelCopy.untitledRecord, records],
  );
  const confirmedCount = useMemo(
    () => records.filter((record) => readLocationReview(record.extra_data)?.status === "confirmed").length,
    [records],
  );
  const needsReviewCount = useMemo(
    () => records.filter((record) => readLocationReview(record.extra_data)?.status === "needs_review").length,
    [records],
  );

  return {
    draftCoordinates: parseDraftCoordinates(draftLocation),
    mappedRecords,
    confirmedCount,
    needsReviewCount,
  };
}
