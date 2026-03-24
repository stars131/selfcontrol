"use client";
import type { ControllerProps } from "./record-panel-controller.types";
import { createRecordPanelControllerFilterPresetActions, type RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-actions";
import { getRecordPanelFilterErrorMessage } from "./record-panel-controller-filter-helpers";
type FilterActionProps = RecordPanelControllerFilterPresetActionInput & {
  onApplyRecordFilter: ControllerProps["onApplyRecordFilter"];
};
export function createRecordPanelControllerFilterActions({
  detailCopy,
  filterDraft,
  onApplyRecordFilter,
  onCreateSearchPreset,
  onDeleteSearchPreset,
  presetName,
  setError,
  setPresetName,
}: FilterActionProps) {
  const presetActions = createRecordPanelControllerFilterPresetActions({
    detailCopy,
    filterDraft,
    onCreateSearchPreset,
    onDeleteSearchPreset,
    presetName,
    setError,
    setPresetName,
  });
  async function handleApplyFilter() {
    setError("");
    try {
      await onApplyRecordFilter(filterDraft);
    } catch (caught) {
      setError(getRecordPanelFilterErrorMessage(caught, detailCopy.applyFilterError));
    }
  }
  return {
    handleApplyFilter,
    ...presetActions,
  };
}
