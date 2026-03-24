"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";
type ControllerState = ReturnType<typeof useRecordPanelControllerState>;
type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;

export function buildRecordPanelControllerSyncInput({
  props,
  state,
  viewData,
}: {
  props: Pick<ControllerProps, "recordFilter">;
  state: Pick<ControllerState, "setFilterDraft" | "setForm" | "setLocationReviewForm" | "setReminderForm" | "setSelectedDeadLetterIds">;
  viewData: Pick<ControllerViewData, "actionableDeadLetterIds" | "selectedRecord">;
}) {
  return {
    actionableDeadLetterIds: viewData.actionableDeadLetterIds,
    recordFilter: props.recordFilter,
    selectedRecord: viewData.selectedRecord,
    setFilterDraft: state.setFilterDraft,
    setForm: state.setForm,
    setLocationReviewForm: state.setLocationReviewForm,
    setReminderForm: state.setReminderForm,
    setSelectedDeadLetterIds: state.setSelectedDeadLetterIds,
  };
}
