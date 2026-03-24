"use client";
import { createRecordPanelControllerFilterApplyAction } from "./record-panel-controller-filter-apply-action";
import type { RecordPanelControllerFilterActionInput } from "./record-panel-controller-filter-action-input.types";
import { createRecordPanelControllerFilterPresetActions } from "./record-panel-controller-filter-preset-actions";

export function createRecordPanelControllerFilterActions({
  ...props
}: RecordPanelControllerFilterActionInput) {
  const applyAction = createRecordPanelControllerFilterApplyAction(props);
  const presetActions = createRecordPanelControllerFilterPresetActions(props);
  return {
    ...applyAction,
    ...presetActions,
  };
}
