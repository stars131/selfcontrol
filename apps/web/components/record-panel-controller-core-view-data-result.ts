"use client";

import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export function buildRecordPanelControllerCoreViewDataResult(viewData: ControllerViewData) {
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
