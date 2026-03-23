"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

import {
  createEmptyForm,
  createEmptyReminderForm,
  formatDatetimeInput,
  readLocationForm,
  readLocationReviewForm,
  type LocationReviewFormState,
  type RecordFormState,
  type ReminderFormState,
} from "../lib/record-panel-forms";
import type { RecordFilterState, RecordItem } from "../lib/types";

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
  useEffect(() => {
    setSelectedDeadLetterIds((current) => current.filter((item) => actionableDeadLetterIds.has(item)));
  }, [actionableDeadLetterIds, setSelectedDeadLetterIds]);

  useEffect(() => {
    if (!selectedRecord) {
      setForm(createEmptyForm());
      setLocationReviewForm({
        status: "pending",
        note: "",
      });
      return;
    }

    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      occurred_at: formatDatetimeInput(selectedRecord.occurred_at),
      is_avoid: selectedRecord.is_avoid,
      location: readLocationForm(selectedRecord),
    });
    setLocationReviewForm(readLocationReviewForm(selectedRecord));
  }, [selectedRecord, setForm, setLocationReviewForm]);

  useEffect(() => {
    if (!selectedRecord) {
      setReminderForm(createEmptyReminderForm());
      return;
    }

    setReminderForm({
      title: selectedRecord.title ?? "",
      message: "",
      remind_at: "",
    });
  }, [selectedRecord, setReminderForm]);

  useEffect(() => {
    setFilterDraft(recordFilter);
  }, [recordFilter, setFilterDraft]);
}
