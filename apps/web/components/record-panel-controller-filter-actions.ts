"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordFilterState } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelFilterErrorMessage, resolveRecordPanelPresetName } from "./record-panel-controller-filter-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function createRecordPanelControllerFilterActions({
  detailCopy,
  filterDraft,
  onApplyRecordFilter,
  onCreateSearchPreset,
  onDeleteSearchPreset,
  presetName,
  setError,
  setPresetName,
}: {
  detailCopy: DetailCopy;
  filterDraft: RecordFilterState;
  onApplyRecordFilter: ControllerProps["onApplyRecordFilter"];
  onCreateSearchPreset: ControllerProps["onCreateSearchPreset"];
  onDeleteSearchPreset: ControllerProps["onDeleteSearchPreset"];
  presetName: string;
  setError: (value: string) => void;
  setPresetName: (value: string) => void;
}) {
  async function handleApplyFilter() {
    setError("");
    try {
      await onApplyRecordFilter(filterDraft);
    } catch (caught) {
      setError(getRecordPanelFilterErrorMessage(caught, detailCopy.applyFilterError));
    }
  }

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
    handleApplyFilter,
    handleSavePreset,
    handleDeletePreset,
  };
}
