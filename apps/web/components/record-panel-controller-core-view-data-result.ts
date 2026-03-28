"use client";

import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";

export function buildRecordPanelControllerCoreViewDataResult(input: BuildRecordPanelControllerViewDataResultInput) {
  return {
    locale: input.locale,
    avoidCount: input.avoidCount,
    foodCount: input.foodCount,
    selectedRecord: input.selectedRecord,
    selectedLocationReview: input.selectedLocationReview,
    selectedLocationHistory: input.selectedLocationHistory,
    selectedRecordMediaSizeLabel: input.selectedRecordMediaSizeLabel,
  };
}
