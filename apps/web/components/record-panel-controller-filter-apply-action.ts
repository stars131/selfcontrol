"use client";
import type { RecordPanelControllerFilterApplyActionInput } from "./record-panel-controller-filter-apply-action.types";
import { getRecordPanelFilterErrorMessage } from "./record-panel-controller-filter-helpers";
export function createRecordPanelControllerFilterApplyAction({
  detailCopy,
  filterDraft,
  onApplyRecordFilter,
  setError,
}: RecordPanelControllerFilterApplyActionInput) {
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
