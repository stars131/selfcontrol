"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ReminderFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelReminderErrorMessage, resolveRecordPanelReminderActionInput } from "./record-panel-controller-reminder-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

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
    const reminderInput = resolveRecordPanelReminderActionInput({
      detailCopy,
      reminderForm,
      selectedRecord,
    });
    if ("errorMessage" in reminderInput) {
      setError(reminderInput.errorMessage);
      return;
    }
    setSavingReminder(true);
    setError("");
    try {
      await onCreateReminder(reminderInput.payload);
      setReminderForm((prev) => ({ ...prev, message: "", remind_at: "" }));
    } catch (caught) {
      setError(getRecordPanelReminderErrorMessage(caught, detailCopy.createReminderError));
    } finally {
      setSavingReminder(false);
    }
  }

  return {
    handleCreateReminderSubmit,
  };
}
