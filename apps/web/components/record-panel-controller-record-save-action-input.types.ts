import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export type RecordPanelControllerRecordSaveActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  form: RecordFormState;
  locationReviewForm: LocationReviewFormState;
  onSaveRecord: ControllerProps["onSaveRecord"];
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;
  setSaving: (value: boolean) => void;
};
