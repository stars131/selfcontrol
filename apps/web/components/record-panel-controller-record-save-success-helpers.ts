import { createEmptyForm, type RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";

export function applyRecordPanelRecordSaveSuccessState({
  selectedRecord,
  setForm,
}: {
  selectedRecord: RecordItem | null;
  setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;
}) {
  if (!selectedRecord) {
    setForm(createEmptyForm());
  }
}
