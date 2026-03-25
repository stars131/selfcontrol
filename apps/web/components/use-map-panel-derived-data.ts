"use client";

import { useMemo } from "react";

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
  const mappedRecords = useMemo(() => parseMappedRecords(records), [records]);
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
