"use client";

import type { BuildRecordPanelControllerSyncInputArgs } from "./use-record-panel-controller-sync.types";

export function buildRecordPanelControllerSyncInput({
  actionableDeadLetterIds,
  recordFilter,
  selectedRecord,
  setFilterDraft,
  setForm,
  setLocationReviewForm,
  setReminderForm,
  setSelectedDeadLetterIds,
}: BuildRecordPanelControllerSyncInputArgs) {
  return {
    actionableDeadLetterIds,
    recordFilter,
    selectedRecord,
    setFilterDraft,
    setForm,
    setLocationReviewForm,
    setReminderForm,
    setSelectedDeadLetterIds,
  };
}
