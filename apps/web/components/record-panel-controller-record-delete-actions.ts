"use client";
import { createRecordPanelControllerRecordDeleteRunAction } from "./record-panel-controller-record-delete-run-action";
import type { RecordPanelControllerRecordDeleteActionInput } from "./record-panel-controller-record-delete-action-input.types";

export function createRecordPanelControllerRecordDeleteActions(
  props: RecordPanelControllerRecordDeleteActionInput,
) {
  return createRecordPanelControllerRecordDeleteRunAction(props);
}
