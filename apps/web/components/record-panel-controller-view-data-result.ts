"use client";

import { buildRecordPanelControllerCoreViewDataResult } from "./record-panel-controller-core-view-data-result";
import { buildRecordPanelControllerLocalizedViewDataResult } from "./record-panel-controller-localized-view-data-result";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export function buildRecordPanelControllerViewDataResult(viewData: ControllerViewData) {
  return {
    ...buildRecordPanelControllerCoreViewDataResult(viewData),
    ...buildRecordPanelControllerLocalizedViewDataResult(viewData),
  };
}
