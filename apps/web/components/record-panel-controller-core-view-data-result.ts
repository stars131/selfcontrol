"use client";

import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";

export function buildRecordPanelControllerCoreViewDataResult(viewData: BuildRecordPanelControllerViewDataResultInput) {
  return {
    locale: viewData.locale,
    avoidCount: viewData.avoidCount,
    foodCount: viewData.foodCount,
    selectedRecord: viewData.selectedRecord,
    selectedLocationReview: viewData.selectedLocationReview,
    selectedLocationHistory: viewData.selectedLocationHistory,
    selectedRecordMediaSizeLabel: viewData.selectedRecordMediaSizeLabel,
  };
}
