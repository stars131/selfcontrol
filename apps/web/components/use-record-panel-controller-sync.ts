"use client";
import type { Dispatch, SetStateAction } from "react";
import type { LocationReviewFormState, RecordFormState, ReminderFormState } from "../lib/record-panel-forms";
import type { RecordFilterState, RecordItem } from "../lib/types";
import { useRecordPanelControllerDeadLetterSync } from "./use-record-panel-controller-dead-letter-sync";
import { useRecordPanelControllerFilterSync } from "./use-record-panel-controller-filter-sync";
import { useRecordPanelControllerSelectedRecordSync } from "./use-record-panel-controller-selected-record-sync";
export function useRecordPanelControllerSync({
  actionableDeadLetterIds,
  recordFilter,
  selectedRecord,
  setFilterDraft,
  setForm,
  setLocationReviewForm,
  setReminderForm,
  setSelectedDeadLetterIds,
}: {
  actionableDeadLetterIds: Set<string>;
  recordFilter: RecordFilterState;
  selectedRecord: RecordItem | null;
  setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  setLocationReviewForm: Dispatch<SetStateAction<LocationReviewFormState>>;
  setReminderForm: Dispatch<SetStateAction<ReminderFormState>>;
  setSelectedDeadLetterIds: Dispatch<SetStateAction<string[]>>;
}) {
  useRecordPanelControllerDeadLetterSync({ actionableDeadLetterIds, setSelectedDeadLetterIds });
  useRecordPanelControllerSelectedRecordSync({ selectedRecord, setForm, setLocationReviewForm, setReminderForm });
  useRecordPanelControllerFilterSync({ recordFilter, setFilterDraft });
}
