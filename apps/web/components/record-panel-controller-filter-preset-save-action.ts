"use client";
import { getRecordPanelFilterErrorMessage, resolveRecordPanelPresetName } from "./record-panel-controller-filter-helpers";
import type { CreateRecordPanelControllerFilterPresetSaveActionInput } from "./record-panel-controller-filter-preset-save-action.types";

export function createRecordPanelControllerFilterPresetSaveAction({
  detailCopy,
  filterDraft,
  onCreateSearchPreset,
  presetName,
  setError,
  setPresetName,
}: CreateRecordPanelControllerFilterPresetSaveActionInput) {
  async function handleSavePreset() {
    const presetInput = resolveRecordPanelPresetName(detailCopy, presetName);
    if ("errorMessage" in presetInput) {
      setError(presetInput.errorMessage);
      return;
    }
    setError("");
    try {
      await onCreateSearchPreset(presetInput.presetName, filterDraft);
      setPresetName("");
    } catch (caught) {
      setError(getRecordPanelFilterErrorMessage(caught, detailCopy.savePresetError));
    }
  }

  return {
    handleSavePreset,
  };
}
