"use client";
import { useEffect } from "react";
import { createEmptyForm, formatDatetimeInput, readLocationForm, readLocationReviewForm, type LocationReviewFormState, type RecordFormState } from "../lib/record-panel-forms";
import type { SelectedRecordFormSyncInput } from "./use-record-panel-controller-selected-record-sync.types";
export function useRecordPanelControllerSelectedRecordFormSync({
  selectedRecord,
  setForm,
  setLocationReviewForm,
}: SelectedRecordFormSyncInput) {
  useEffect(() => {
    if (!selectedRecord) {
      setForm(createEmptyForm());
      setLocationReviewForm({ status: "pending", note: "" });
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
}
