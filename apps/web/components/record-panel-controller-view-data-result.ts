"use client";

import { buildRecordPanelControllerCoreViewDataResult } from "./record-panel-controller-core-view-data-result";
import { buildRecordPanelControllerLocalizedViewDataResult } from "./record-panel-controller-localized-view-data-result";
import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";

export function buildRecordPanelControllerViewDataResult(input: BuildRecordPanelControllerViewDataResultInput) {
  return {
    ...buildRecordPanelControllerCoreViewDataResult(input),
    ...buildRecordPanelControllerLocalizedViewDataResult(input),
  };
}
