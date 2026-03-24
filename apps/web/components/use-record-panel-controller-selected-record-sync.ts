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
import type { RecordItem } from "../lib/types";
export function useRecordPanelControllerSelectedRecordSync({
  selectedRecord,
  setForm,
  setLocationReviewForm,
  setReminderForm,
}: {
  selectedRecord: RecordItem | null;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  setLocationReviewForm: Dispatch<SetStateAction<LocationReviewFormState>>;
  setReminderForm: Dispatch<SetStateAction<ReminderFormState>>;
}) {
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

  useEffect(() => {
    if (!selectedRecord) {
      setReminderForm(createEmptyReminderForm());
      return;
    }
    setReminderForm({ title: selectedRecord.title ?? "", message: "", remind_at: "" });
  }, [selectedRecord, setReminderForm]);
}
