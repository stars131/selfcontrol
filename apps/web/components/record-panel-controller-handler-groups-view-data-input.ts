"use client";
import type { RecordPanelControllerHandlerGroupViewDataInput } from "./record-panel-controller-handler-group-view-data-input.types";

export function buildRecordPanelControllerHandlerGroupsViewDataInput(
  input: RecordPanelControllerHandlerGroupViewDataInput,
) {
  return {
    detailCopy: input.detailCopy,
    selectedRecord: input.selectedRecord,
  };
}
