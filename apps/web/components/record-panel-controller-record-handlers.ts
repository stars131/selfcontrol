"use client";

import { createRecordPanelControllerFilterActions } from "./record-panel-controller-filter-actions";
import { createRecordPanelControllerFormActions } from "./record-panel-controller-form-actions";
import type { RecordPanelControllerRecordHandlerInput } from "./record-panel-controller-record-handler-input.types";

export function createRecordPanelControllerRecordHandlers(
  props: RecordPanelControllerRecordHandlerInput,
) {
  const formActions = createRecordPanelControllerFormActions(props);
  const filterActions = createRecordPanelControllerFilterActions(props);

  return {
    ...formActions,
    ...filterActions,
  };
}
