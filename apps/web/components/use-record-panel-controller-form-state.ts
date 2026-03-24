"use client";
import { useRecordPanelControllerRecordFormState } from "./use-record-panel-controller-record-form-state";
import { useRecordPanelControllerSupportingFormState } from "./use-record-panel-controller-supporting-form-state";

export function useRecordPanelControllerFormState() {
  const recordFormState = useRecordPanelControllerRecordFormState();
  const supportingFormState = useRecordPanelControllerSupportingFormState();
  return {
    ...recordFormState,
    ...supportingFormState,
  };
}
