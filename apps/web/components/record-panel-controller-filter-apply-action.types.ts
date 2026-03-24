import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";
export type RecordPanelControllerFilterApplyActionInput = { detailCopy: RecordPanelControllerDetailCopy; filterDraft: ControllerProps["recordFilter"]; onApplyRecordFilter: ControllerProps["onApplyRecordFilter"]; setError: (value: string) => void };
