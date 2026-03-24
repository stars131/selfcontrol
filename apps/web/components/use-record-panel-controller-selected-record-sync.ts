"use client";
import { useRecordPanelControllerSelectedRecordFormSync } from "./use-record-panel-controller-selected-record-form-sync";
import { useRecordPanelControllerSelectedRecordReminderSync } from "./use-record-panel-controller-selected-record-reminder-sync";
type SelectedRecordSyncInput = Parameters<typeof useRecordPanelControllerSelectedRecordFormSync>[0] & Parameters<typeof useRecordPanelControllerSelectedRecordReminderSync>[0];

export function useRecordPanelControllerSelectedRecordSync({
  selectedRecord,
  setForm,
  setLocationReviewForm,
  setReminderForm,
}: SelectedRecordSyncInput) {
  useRecordPanelControllerSelectedRecordFormSync({ selectedRecord, setForm, setLocationReviewForm });
  useRecordPanelControllerSelectedRecordReminderSync({ selectedRecord, setReminderForm });
}
