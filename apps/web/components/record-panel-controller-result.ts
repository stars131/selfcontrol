"use client";

import type { BuildRecordPanelControllerResultInput } from "./record-panel-controller-result.types";
import { buildRecordPanelControllerStateResult } from "./record-panel-controller-state-result";
import { buildRecordPanelControllerViewDataResult } from "./record-panel-controller-view-data-result";

export function buildRecordPanelControllerResult({
  mediaHandlers,
  recordHandlers,
  state,
  viewData,
}: BuildRecordPanelControllerResultInput) {
  return {
    ...buildRecordPanelControllerViewDataResult(viewData),
    ...buildRecordPanelControllerStateResult(state),
    ...recordHandlers,
    ...mediaHandlers,
  };
}
