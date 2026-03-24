"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordFilterState } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { createRecordPanelControllerFilterPresetDeleteAction } from "./record-panel-controller-filter-preset-delete-action";
import { createRecordPanelControllerFilterPresetSaveAction } from "./record-panel-controller-filter-preset-save-action";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export type RecordPanelControllerFilterPresetActionInput = {
  detailCopy: DetailCopy;
  filterDraft: RecordFilterState;
  onCreateSearchPreset: ControllerProps["onCreateSearchPreset"];
  onDeleteSearchPreset: ControllerProps["onDeleteSearchPreset"];
  presetName: string;
  setError: (value: string) => void;
  setPresetName: (value: string) => void;
};
export function createRecordPanelControllerFilterPresetActions({
  ...props
}: RecordPanelControllerFilterPresetActionInput) {
  const presetDeleteAction = createRecordPanelControllerFilterPresetDeleteAction(props);
  const presetSaveAction = createRecordPanelControllerFilterPresetSaveAction(props);

  return {
    ...presetSaveAction,
    ...presetDeleteAction,
  };
}
