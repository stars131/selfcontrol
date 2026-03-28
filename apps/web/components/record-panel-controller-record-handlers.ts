"use client";

import { createRecordPanelControllerFilterActions } from "./record-panel-controller-filter-actions";
import { createRecordPanelControllerFormActions } from "./record-panel-controller-form-actions";
import type { RecordPanelControllerRecordHandlerInput } from "./record-panel-controller-record-handler-input.types";

export function createRecordPanelControllerRecordHandlers(
  input: RecordPanelControllerRecordHandlerInput,
) {
  const formActions = createRecordPanelControllerFormActions(input);
  const filterActions = createRecordPanelControllerFilterActions(input);

  return {
    ...formActions,
    ...filterActions,
  };
}
