"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { createEmptyReminderForm, type ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
export function useRecordPanelControllerSelectedRecordReminderSync({
  selectedRecord,
  setReminderForm,
}: { selectedRecord: RecordItem | null; setReminderForm: Dispatch<SetStateAction<ReminderFormState>> }) {
  useEffect(() => {
    if (!selectedRecord) {
      setReminderForm(createEmptyReminderForm());
      return;
    }
    setReminderForm({ title: selectedRecord.title ?? "", message: "", remind_at: "" });
  }, [selectedRecord, setReminderForm]);
}
