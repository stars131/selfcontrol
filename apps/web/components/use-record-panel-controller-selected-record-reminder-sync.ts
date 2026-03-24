"use client";
import { useEffect } from "react";
import { createEmptyReminderForm } from "../lib/record-panel-forms";
import type { SelectedRecordReminderSyncInput } from "./use-record-panel-controller-selected-record-sync.types";
export function useRecordPanelControllerSelectedRecordReminderSync({
  selectedRecord,
  setReminderForm,
}: SelectedRecordReminderSyncInput) {
  useEffect(() => {
    if (!selectedRecord) {
      setReminderForm(createEmptyReminderForm());
      return;
    }
    setReminderForm({ title: selectedRecord.title ?? "", message: "", remind_at: "" });
  }, [selectedRecord, setReminderForm]);
}
