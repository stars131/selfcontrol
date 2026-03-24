import { createEmptyForm, type RecordFormState } from "../lib/record-panel-forms";
import type { ApplyRecordPanelRecordSaveSuccessStateInput } from "./record-panel-controller-record-save-success-helpers.types";

export function applyRecordPanelRecordSaveSuccessState({
  selectedRecord,
  setForm,
}: ApplyRecordPanelRecordSaveSuccessStateInput) {
  if (!selectedRecord) {
    setForm(createEmptyForm());
  }
}
