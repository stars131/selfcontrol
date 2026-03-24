"use client";
import type { RecordPanelControllerHandlerGroupViewDataInput } from "./record-panel-controller-handler-group-view-data-input.types";

export function buildRecordPanelControllerHandlerGroupsViewDataInput(
  viewData: RecordPanelControllerHandlerGroupViewDataInput,
) {
  return {
    detailCopy: viewData.detailCopy,
    selectedRecord: viewData.selectedRecord,
  };
}
