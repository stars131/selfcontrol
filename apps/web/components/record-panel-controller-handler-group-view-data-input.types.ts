"use client";

import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export type RecordPanelControllerHandlerGroupViewDataInput = Pick<
  ControllerViewData,
  "detailCopy" | "selectedRecord"
>;
