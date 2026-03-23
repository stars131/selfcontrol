"use client";

import { createRecordPanelControllerFilterActions } from "./record-panel-controller-filter-actions";
import { createRecordPanelControllerFormActions } from "./record-panel-controller-form-actions";

export function createRecordPanelControllerRecordHandlers(
  props: Parameters<typeof createRecordPanelControllerFormActions>[0] &
    Parameters<typeof createRecordPanelControllerFilterActions>[0],
) {
  const formActions = createRecordPanelControllerFormActions(props);
  const filterActions = createRecordPanelControllerFilterActions(props);

  return {
    ...formActions,
    ...filterActions,
  };
}
