"use client";

import type { RecordPanelControllerFilterActionInput } from "./record-panel-controller-filter-action-input.types";
import type { RecordPanelControllerFormActionInput } from "./record-panel-controller-form-action-input.types";

export type RecordPanelControllerRecordHandlerInput =
  RecordPanelControllerFormActionInput &
  RecordPanelControllerFilterActionInput;
