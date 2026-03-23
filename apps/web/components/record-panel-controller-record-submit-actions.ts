"use client";

import { createRecordPanelControllerRecordDeleteActions } from "./record-panel-controller-record-delete-actions";
import { createRecordPanelControllerRecordSaveActions } from "./record-panel-controller-record-save-actions";

export function createRecordPanelControllerRecordSubmitActions({
  ...props
}: Parameters<typeof createRecordPanelControllerRecordSaveActions>[0] &
  Parameters<typeof createRecordPanelControllerRecordDeleteActions>[0]) {
  const recordSaveActions = createRecordPanelControllerRecordSaveActions(props);
  const recordDeleteActions = createRecordPanelControllerRecordDeleteActions(props);

  return {
    ...recordSaveActions,
    ...recordDeleteActions,
  };
}
