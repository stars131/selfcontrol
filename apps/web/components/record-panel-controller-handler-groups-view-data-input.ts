"use client";

import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export function buildRecordPanelControllerHandlerGroupsViewDataInput(
  viewData: ControllerViewData,
) {
  return {
    detailCopy: viewData.detailCopy,
    selectedRecord: viewData.selectedRecord,
  };
}
