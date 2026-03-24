"use client";

import { createRecordPanelControllerRecordSubmitActions } from "./record-panel-controller-record-submit-actions";
import { createRecordPanelControllerReminderActions } from "./record-panel-controller-reminder-actions";
import type { RecordPanelControllerFormActionInput } from "./record-panel-controller-form-action-input.types";

export function createRecordPanelControllerFormActions({
  ...props
}: RecordPanelControllerFormActionInput) {
  const recordSubmitActions = createRecordPanelControllerRecordSubmitActions(props);
  const reminderActions = createRecordPanelControllerReminderActions(props);

  return {
    ...recordSubmitActions,
    ...reminderActions,
  };
}
