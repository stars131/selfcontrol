"use client";
import { createRecordPanelControllerDeadLetterRetryAction } from "./record-panel-controller-dead-letter-retry-action";
import { createRecordPanelControllerDeadLetterSelectionActions } from "./record-panel-controller-dead-letter-selection-actions";

export function createRecordPanelControllerDeadLetterActions({
  ...props
}: Parameters<typeof createRecordPanelControllerDeadLetterRetryAction>[0] &
  Parameters<typeof createRecordPanelControllerDeadLetterSelectionActions>[0]) {
  const deadLetterRetryAction = createRecordPanelControllerDeadLetterRetryAction(props);
  const deadLetterSelectionActions =
    createRecordPanelControllerDeadLetterSelectionActions(props);

  return {
    ...deadLetterSelectionActions,
    ...deadLetterRetryAction,
  };
}
