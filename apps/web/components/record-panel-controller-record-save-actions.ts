"use client";
import { createRecordPanelControllerRecordSaveSubmitAction } from "./record-panel-controller-record-save-submit-action";
import type { RecordPanelControllerRecordSaveActionInput } from "./record-panel-controller-record-save-action-input.types";

export function createRecordPanelControllerRecordSaveActions(
  input: RecordPanelControllerRecordSaveActionInput,
) {
  return createRecordPanelControllerRecordSaveSubmitAction(input);
}
