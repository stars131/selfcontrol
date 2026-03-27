"use client";
import type { FormEvent } from "react";
import { resolveRecordPanelRecordSaveActionInput } from "./record-panel-controller-record-save-helpers";
import type { RecordPanelControllerRecordSaveActionInput } from "./record-panel-controller-record-save-action-input.types";
import { runRecordPanelRecordSaveSubmit } from "./record-panel-controller-record-save-submit-runner";

export function createRecordPanelControllerRecordSaveSubmitAction({
  detailCopy,
  form,
  locationReviewForm,
  onSaveRecord,
  selectedRecord,
  setError,
  setForm,
  setSaving,
}: RecordPanelControllerRecordSaveActionInput) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const saveInput = resolveRecordPanelRecordSaveActionInput({
      detailCopy,
      form,
      locationReviewForm,
      selectedRecord,
    });
    if ("errorMessage" in saveInput) {
      setError(saveInput.errorMessage);
      return;
    }
    await runRecordPanelRecordSaveSubmit(
      { detailCopy, onSaveRecord, selectedRecord, setError, setForm, setSaving, form, locationReviewForm },
      saveInput.payload,
    );
  }

  return {
    handleSubmit,
  };
}
