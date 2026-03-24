"use client";

import type { createRecordPanelControllerHandlerGroups } from "./record-panel-controller-handler-groups";
import { buildRecordPanelControllerStateResult } from "./record-panel-controller-state-result";
import { buildRecordPanelControllerViewDataResult } from "./record-panel-controller-view-data-result";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>;
type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;
type ControllerHandlers = ReturnType<typeof createRecordPanelControllerHandlerGroups>;

export function buildRecordPanelControllerResult({
  mediaHandlers,
  recordHandlers,
  state,
  viewData,
}: {
  mediaHandlers: ControllerHandlers["mediaHandlers"];
  recordHandlers: ControllerHandlers["recordHandlers"];
  state: ControllerState;
  viewData: ControllerViewData;
}) {
  return {
    ...buildRecordPanelControllerViewDataResult(viewData),
    ...buildRecordPanelControllerStateResult(state),
    ...recordHandlers,
    ...mediaHandlers,
  };
}
