"use client";
import type { FormEvent } from "react";
import { createEmptyForm, type LocationReviewFormState, type RecordFormState } from "../lib/record-panel-forms";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelRecordSaveErrorMessage, resolveRecordPanelRecordSaveActionInput } from "./record-panel-controller-record-save-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerRecordSaveActions({
  detailCopy,
  form,
  locationReviewForm,
  onSaveRecord,
  selectedRecord,
  setError,
  setForm,
  setSaving,
}: {
  detailCopy: DetailCopy;
  form: RecordFormState;
  locationReviewForm: LocationReviewFormState;
  onSaveRecord: ControllerProps["onSaveRecord"];
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;
  setSaving: (value: boolean) => void;
}) {
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
      if (!selectedRecord) {
        setForm(createEmptyForm());
      }
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
