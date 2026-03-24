"use client";
import { createRecordPanelControllerDeadLetterRetryAction } from "./record-panel-controller-dead-letter-retry-action";
import { createRecordPanelControllerDeadLetterSelectionActions } from "./record-panel-controller-dead-letter-selection-actions";
import type { RecordPanelControllerDeadLetterActionInput } from "./record-panel-controller-dead-letter-action-input.types";

export function createRecordPanelControllerDeadLetterActions({
  ...props
}: RecordPanelControllerDeadLetterActionInput) {
  const deadLetterRetryAction = createRecordPanelControllerDeadLetterRetryAction(props);
  const deadLetterSelectionActions =
    createRecordPanelControllerDeadLetterSelectionActions(props);

  return {
    ...deadLetterSelectionActions,
    ...deadLetterRetryAction,
  };
}
