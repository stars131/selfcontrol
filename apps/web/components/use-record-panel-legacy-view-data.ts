"use client";

import { useMemo } from "react";
import { buildRecordPanelRecordViewData } from "./record-panel-controller-record-view-data";
import type { UseRecordPanelLegacyViewDataInput } from "./use-record-panel-legacy-view-data.types";
export function useRecordPanelLegacyViewData({ records, selectedRecordId }: UseRecordPanelLegacyViewDataInput) {
  return useMemo(
    () => buildRecordPanelRecordViewData({ records, selectedRecordId }),
    [records, selectedRecordId],
  );
}
