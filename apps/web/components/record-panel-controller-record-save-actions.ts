"use client";
import { createRecordPanelControllerRecordSaveSubmitAction } from "./record-panel-controller-record-save-submit-action";
import type { RecordPanelControllerRecordSaveActionInput } from "./record-panel-controller-record-save-action-input.types";

export function createRecordPanelControllerRecordSaveActions(
  props: RecordPanelControllerRecordSaveActionInput,
) {
  return createRecordPanelControllerRecordSaveSubmitAction(props);
}
