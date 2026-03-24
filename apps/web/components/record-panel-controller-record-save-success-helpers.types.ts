import type { RecordFormState } from "../lib/record-panel-forms";
import type { RecordItem } from "../lib/types";

export type ApplyRecordPanelRecordSaveSuccessStateInput = { selectedRecord: RecordItem | null; setForm: React.Dispatch<React.SetStateAction<RecordFormState>> };
