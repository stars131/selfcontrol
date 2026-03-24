"use client";
import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";

export type RecordPanelControllerHandlerGroupViewDataInput = Pick<
  BuildRecordPanelControllerViewDataResultInput,
  "detailCopy" | "selectedRecord"
>;
