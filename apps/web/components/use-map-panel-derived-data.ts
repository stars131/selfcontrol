"use client";

import { useMemo } from "react";

import {
  parseDraftCoordinates,
  parseMappedRecords,
  type LocationDraft,
} from "../lib/map-panel";
import type { RecordItem } from "../lib/types";
import { readLocationReview } from "../lib/location";

export function useMapPanelDerivedData({
  draftLocation,
  records,
}: {
  draftLocation?: LocationDraft | null;
  records: RecordItem[];
}) {
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
