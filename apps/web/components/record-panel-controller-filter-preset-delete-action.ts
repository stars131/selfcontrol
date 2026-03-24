"use client";
import { getRecordPanelFilterErrorMessage } from "./record-panel-controller-filter-helpers";
import type { RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-action-input.types";

export function createRecordPanelControllerFilterPresetDeleteAction({
  detailCopy,
  onDeleteSearchPreset,
  setError,
}: Pick<RecordPanelControllerFilterPresetActionInput, "detailCopy" | "onDeleteSearchPreset" | "setError">) {
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
