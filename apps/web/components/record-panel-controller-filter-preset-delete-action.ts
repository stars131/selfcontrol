"use client";
import { getRecordPanelFilterErrorMessage } from "./record-panel-controller-filter-helpers";
import type { CreateRecordPanelControllerFilterPresetDeleteActionInput } from "./record-panel-controller-filter-preset-delete-action.types";

export function createRecordPanelControllerFilterPresetDeleteAction({
  detailCopy,
  onDeleteSearchPreset,
  setError,
}: CreateRecordPanelControllerFilterPresetDeleteActionInput) {
  async function handleDeletePreset(presetId: string) {
    setError("");
    try {
      await onDeleteSearchPreset(presetId);
    } catch (caught) {
      setError(getRecordPanelFilterErrorMessage(caught, detailCopy.deletePresetError));
    }
  }

  return {
    handleDeletePreset,
  };
}
