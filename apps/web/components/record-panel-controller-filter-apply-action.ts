"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelFilterErrorMessage } from "./record-panel-controller-filter-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerFilterApplyAction({
  detailCopy,
  filterDraft,
  onApplyRecordFilter,
  setError,
}: { detailCopy: DetailCopy; filterDraft: ControllerProps["recordFilter"]; onApplyRecordFilter: ControllerProps["onApplyRecordFilter"]; setError: (value: string) => void }) {
  async function handleApplyFilter() {
    setError("");
    try {
      await onApplyRecordFilter(filterDraft);
    } catch (caught) {
      setError(getRecordPanelFilterErrorMessage(caught, detailCopy.applyFilterError));
    }
  }
  return { handleApplyFilter };
}
