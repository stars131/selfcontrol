"use client";
import { createRecordPanelControllerRecordDeleteRunAction } from "./record-panel-controller-record-delete-run-action";

export function createRecordPanelControllerRecordDeleteActions(
  props: Parameters<typeof createRecordPanelControllerRecordDeleteRunAction>[0],
) {
  return createRecordPanelControllerRecordDeleteRunAction(props);
}
