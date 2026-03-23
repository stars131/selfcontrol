"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordFilterState } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
      setError(getErrorMessage(caught, detailCopy.applyFilterError));
    }
  }

  async function handleSavePreset() {
    if (!presetName.trim()) {
      setError(detailCopy.presetNameRequiredError);
      return;
    }

    setError("");
    try {
      await onCreateSearchPreset(presetName.trim(), filterDraft);
      setPresetName("");
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.savePresetError));
    }
  }

  async function handleDeletePreset(presetId: string) {
    setError("");
    try {
      await onDeleteSearchPreset(presetId);
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.deletePresetError));
    }
  }

  return {
    handleApplyFilter,
    handleSavePreset,
    handleDeletePreset,
  };
}
