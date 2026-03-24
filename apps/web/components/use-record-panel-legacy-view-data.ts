"use client";

import { useMemo } from "react";

import type { RecordItem } from "../lib/types";
import { buildRecordPanelRecordViewData } from "./record-panel-controller-record-view-data";

export function useRecordPanelLegacyViewData({
  records,
  selectedRecordId,
}: {
  records: RecordItem[];
  selectedRecordId: string | null;
}) {
  return useMemo(
    () => buildRecordPanelRecordViewData({ records, selectedRecordId }),
    [records, selectedRecordId],
  );
}
