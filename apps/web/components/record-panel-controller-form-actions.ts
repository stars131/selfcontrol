"use client";

import { createRecordPanelControllerRecordSubmitActions } from "./record-panel-controller-record-submit-actions";
import { createRecordPanelControllerReminderActions } from "./record-panel-controller-reminder-actions";

export function createRecordPanelControllerFormActions({
  ...props
}: Parameters<typeof createRecordPanelControllerRecordSubmitActions>[0] &
  Parameters<typeof createRecordPanelControllerReminderActions>[0]) {
  const recordSubmitActions = createRecordPanelControllerRecordSubmitActions(props);
  const reminderActions = createRecordPanelControllerReminderActions(props);

  return {
    ...recordSubmitActions,
    ...reminderActions,
  };
}
