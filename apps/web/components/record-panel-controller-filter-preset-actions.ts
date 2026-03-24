"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordFilterState } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelFilterErrorMessage, resolveRecordPanelPresetName } from "./record-panel-controller-filter-helpers";
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
  detailCopy,
  filterDraft,
  onCreateSearchPreset,
  onDeleteSearchPreset,
  presetName,
  setError,
  setPresetName,
}: RecordPanelControllerFilterPresetActionInput) {
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
  async function handleDeletePreset(presetId: string) {
    setError("");
    try {
      await onDeleteSearchPreset(presetId);
    } catch (caught) {
      setError(getRecordPanelFilterErrorMessage(caught, detailCopy.deletePresetError));
    }
  }
  return {
    handleSavePreset,
    handleDeletePreset,
  };
}
