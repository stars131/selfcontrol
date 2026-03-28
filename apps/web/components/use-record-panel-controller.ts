"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import { buildRecordPanelControllerHandlerGroupsInput } from "./record-panel-controller-handler-groups-input";
import { buildRecordPanelControllerSyncInput } from "./record-panel-controller-sync-input";
import { createRecordPanelControllerHandlerGroups } from "./record-panel-controller-handler-groups";
import { buildRecordPanelControllerResult } from "./record-panel-controller-result";
import { useRecordPanelControllerSync } from "./use-record-panel-controller-sync";
import { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

export function useRecordPanelController(input: ControllerProps) {
  const viewData = useRecordPanelControllerViewData({
    mediaAssets: input.mediaAssets,
    mediaDeadLetterOverview: input.mediaDeadLetterOverview,
    records: input.records,
    selectedRecordId: input.selectedRecordId,
  });
  const state = useRecordPanelControllerState(input.recordFilter);
  useRecordPanelControllerSync(buildRecordPanelControllerSyncInput({ ...input, ...state, ...viewData }));
  const { recordHandlers, mediaHandlers } = createRecordPanelControllerHandlerGroups(
    buildRecordPanelControllerHandlerGroupsInput({ ...input, ...state, ...viewData }),
  );
  return buildRecordPanelControllerResult({ ...state, ...viewData, mediaHandlers, recordHandlers });
}
