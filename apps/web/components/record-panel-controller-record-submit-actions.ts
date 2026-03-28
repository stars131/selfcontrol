"use client";

import { createRecordPanelControllerRecordDeleteActions } from "./record-panel-controller-record-delete-actions";
import { createRecordPanelControllerRecordSaveActions } from "./record-panel-controller-record-save-actions";
import type { RecordPanelControllerRecordSubmitActionInput } from "./record-panel-controller-record-submit-action-input.types";

export function createRecordPanelControllerRecordSubmitActions({
  ...input
}: RecordPanelControllerRecordSubmitActionInput) {
  const recordSaveActions = createRecordPanelControllerRecordSaveActions(input);
  const recordDeleteActions = createRecordPanelControllerRecordDeleteActions(input);

  return {
    ...recordSaveActions,
    ...recordDeleteActions,
  };
}
