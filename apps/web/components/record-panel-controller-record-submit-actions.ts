"use client";

import { createRecordPanelControllerRecordDeleteActions } from "./record-panel-controller-record-delete-actions";
import { createRecordPanelControllerRecordSaveActions } from "./record-panel-controller-record-save-actions";
import type { RecordPanelControllerRecordSubmitActionInput } from "./record-panel-controller-record-submit-action-input.types";

export function createRecordPanelControllerRecordSubmitActions({
  ...props
}: RecordPanelControllerRecordSubmitActionInput) {
  const recordSaveActions = createRecordPanelControllerRecordSaveActions(props);
  const recordDeleteActions = createRecordPanelControllerRecordDeleteActions(props);

  return {
    ...recordSaveActions,
    ...recordDeleteActions,
  };
}
