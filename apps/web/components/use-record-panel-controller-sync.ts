"use client";
import { useRecordPanelControllerDeadLetterSync } from "./use-record-panel-controller-dead-letter-sync";
import { useRecordPanelControllerFilterSync } from "./use-record-panel-controller-filter-sync";
import { useRecordPanelControllerSelectedRecordSync } from "./use-record-panel-controller-selected-record-sync";
import type { RecordPanelControllerSyncInput } from "./use-record-panel-controller-sync.types";

export function useRecordPanelControllerSync({
  actionableDeadLetterIds,
  recordFilter,
  selectedRecord,
  setFilterDraft,
  setForm,
  setLocationReviewForm,
  setReminderForm,
  setSelectedDeadLetterIds,
}: RecordPanelControllerSyncInput) {
  useRecordPanelControllerDeadLetterSync({ actionableDeadLetterIds, setSelectedDeadLetterIds });
  useRecordPanelControllerSelectedRecordSync({ selectedRecord, setForm, setLocationReviewForm, setReminderForm });
  useRecordPanelControllerFilterSync({ recordFilter, setFilterDraft });
}
