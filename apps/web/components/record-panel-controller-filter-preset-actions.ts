"use client";
import { createRecordPanelControllerFilterPresetDeleteAction } from "./record-panel-controller-filter-preset-delete-action";
import { createRecordPanelControllerFilterPresetSaveAction } from "./record-panel-controller-filter-preset-save-action";
import type { RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-action-input.types";

export function createRecordPanelControllerFilterPresetActions({
  ...input
}: RecordPanelControllerFilterPresetActionInput) {
  const presetDeleteAction = createRecordPanelControllerFilterPresetDeleteAction(input);
  const presetSaveAction = createRecordPanelControllerFilterPresetSaveAction(input);

  return {
    ...presetSaveAction,
    ...presetDeleteAction,
  };
}
