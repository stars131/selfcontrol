"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-action-input.types";

export type RecordPanelControllerFilterActionInput =
  RecordPanelControllerFilterPresetActionInput & {
    onApplyRecordFilter: ControllerProps["onApplyRecordFilter"];
  };
