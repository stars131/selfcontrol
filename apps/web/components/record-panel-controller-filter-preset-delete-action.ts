"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelFilterErrorMessage } from "./record-panel-controller-filter-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerFilterPresetDeleteAction({
  detailCopy,
  onDeleteSearchPreset,
  setError,
}: {
  detailCopy: DetailCopy;
  onDeleteSearchPreset: ControllerProps["onDeleteSearchPreset"];
  setError: (value: string) => void;
}) {
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
