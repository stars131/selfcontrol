"use client";
import { useRecordPanelControllerSelectedRecordFormSync } from "./use-record-panel-controller-selected-record-form-sync";
import { useRecordPanelControllerSelectedRecordReminderSync } from "./use-record-panel-controller-selected-record-reminder-sync";
import type { SelectedRecordSyncInput } from "./use-record-panel-controller-selected-record-sync.types";

export function useRecordPanelControllerSelectedRecordSync({
  selectedRecord,
  setForm,
  setLocationReviewForm,
  setReminderForm,
}: SelectedRecordSyncInput) {
  useRecordPanelControllerSelectedRecordFormSync({ selectedRecord, setForm, setLocationReviewForm });
  useRecordPanelControllerSelectedRecordReminderSync({ selectedRecord, setReminderForm });
}
