"use client";

import type { BuildRecordPanelControllerSyncInputArgs } from "./use-record-panel-controller-sync.types";

export function buildRecordPanelControllerSyncInput({
  props,
  state,
  viewData,
}: BuildRecordPanelControllerSyncInputArgs) {
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
