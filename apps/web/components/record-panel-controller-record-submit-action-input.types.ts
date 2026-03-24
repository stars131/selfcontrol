"use client";

import type { RecordPanelControllerRecordDeleteActionInput } from "./record-panel-controller-record-delete-action-input.types";
import type { RecordPanelControllerRecordSaveActionInput } from "./record-panel-controller-record-save-action-input.types";

export type RecordPanelControllerRecordSubmitActionInput =
  RecordPanelControllerRecordSaveActionInput &
  RecordPanelControllerRecordDeleteActionInput;
