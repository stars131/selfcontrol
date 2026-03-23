"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createRecordPanelControllerReminderActions({
  detailCopy,
  onCreateReminder,
  reminderForm,
  selectedRecord,
  setError,
  setReminderForm,
  setSavingReminder,
}: {
  detailCopy: DetailCopy;
  onCreateReminder: ControllerProps["onCreateReminder"];
  reminderForm: ReminderFormState;
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setReminderForm: React.Dispatch<React.SetStateAction<ReminderFormState>>;
  setSavingReminder: (value: boolean) => void;
}) {
  async function handleCreateReminderSubmit() {
    if (!selectedRecord) {
      setError("Save or select a record before adding a reminder");
      return;
    }
    if (!reminderForm.remind_at) {
      setError(detailCopy.reminderTimeRequiredError);
      return;
    }

    setSavingReminder(true);
    setError("");
    try {
      await onCreateReminder({
        recordId: selectedRecord.id,
        title: reminderForm.title.trim() || selectedRecord.title || undefined,
        message: reminderForm.message.trim() || undefined,
        remind_at: new Date(reminderForm.remind_at).toISOString(),
        channel_code: "in_app",
      });
      setReminderForm((prev) => ({
        ...prev,
        message: "",
        remind_at: "",
      }));
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.createReminderError));
    } finally {
      setSavingReminder(false);
    }
  }

  return {
    handleCreateReminderSubmit,
  };
}
