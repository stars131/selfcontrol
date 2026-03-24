import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordPanelControllerRecordSaveActionInput = {
  detailCopy: DetailCopy;
  form: RecordFormState;
  locationReviewForm: LocationReviewFormState;
  onSaveRecord: ControllerProps["onSaveRecord"];
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;
  setSaving: (value: boolean) => void;
};
