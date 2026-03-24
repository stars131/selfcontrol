"use client";
import { getRecordPanelFilterErrorMessage, resolveRecordPanelPresetName } from "./record-panel-controller-filter-helpers";
import type { RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-action-input.types";

export function createRecordPanelControllerFilterPresetSaveAction({
  detailCopy,
  filterDraft,
  onCreateSearchPreset,
  presetName,
  setError,
  setPresetName,
}: Pick<
  RecordPanelControllerFilterPresetActionInput,
  "detailCopy" | "filterDraft" | "onCreateSearchPreset" | "presetName" | "setError" | "setPresetName"
>) {
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
