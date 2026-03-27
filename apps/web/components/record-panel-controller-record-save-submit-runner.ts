"use client";

import type { RecordSavePayload } from "./record-panel-controller-record-save-payload.types";
import type { RecordPanelControllerRecordSaveActionInput } from "./record-panel-controller-record-save-action-input.types";
import { getRecordPanelRecordSaveErrorMessage } from "./record-panel-controller-record-save-helpers";
import { applyRecordPanelRecordSaveSuccessState } from "./record-panel-controller-record-save-success-helpers";

export async function runRecordPanelRecordSaveSubmit(
  {
    detailCopy,
    onSaveRecord,
    selectedRecord,
    setError,
    setForm,
    setSaving,
  }: RecordPanelControllerRecordSaveActionInput,
  payload: RecordSavePayload,
) {
  setSaving(true);
  setError("");
  try {
    await onSaveRecord(payload);
    applyRecordPanelRecordSaveSuccessState({ selectedRecord, setForm });
  } catch (caught) {
    setError(getRecordPanelRecordSaveErrorMessage(caught, detailCopy.saveRecordError));
  } finally {
    setSaving(false);
  }
}
