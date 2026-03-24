"use client";
import type { ControllerProps } from "./record-panel-controller.types";
import { createRecordPanelControllerFilterApplyAction } from "./record-panel-controller-filter-apply-action";
import { createRecordPanelControllerFilterPresetActions, type RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-actions";
type FilterActionProps = RecordPanelControllerFilterPresetActionInput & {
  onApplyRecordFilter: ControllerProps["onApplyRecordFilter"];
};
export function createRecordPanelControllerFilterActions({
  ...props
}: FilterActionProps) {
  const applyAction = createRecordPanelControllerFilterApplyAction(props);
  const presetActions = createRecordPanelControllerFilterPresetActions(props);
  return {
    ...applyAction,
    ...presetActions,
  };
}
