"use client";
import type { FormEvent } from "react";
import { getRecordPanelRecordSaveErrorMessage, resolveRecordPanelRecordSaveActionInput } from "./record-panel-controller-record-save-helpers";
import type { RecordPanelControllerRecordSaveActionInput } from "./record-panel-controller-record-save-action-input.types";
import { applyRecordPanelRecordSaveSuccessState } from "./record-panel-controller-record-save-success-helpers";

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
    setSaving(true);
    setError("");
    try {
      await onSaveRecord(saveInput.payload);
      applyRecordPanelRecordSaveSuccessState({ selectedRecord, setForm });
    } catch (caught) {
      setError(getRecordPanelRecordSaveErrorMessage(caught, detailCopy.saveRecordError));
    } finally {
      setSaving(false);
    }
  }

  return {
    handleSubmit,
  };
}
