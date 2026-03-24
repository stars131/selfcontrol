import type { RecordPanelV2Props } from "./record-panel-v2.types";

export type BuildRecordBrowseWorkspacePropInput = Pick<
  RecordPanelV2Props,
  | "canWriteWorkspace"
  | "records"
  | "timelineDays"
  | "selectedRecordId"
  | "recordFilter"
  | "searchPresets"
  | "onApplyLocationFilter"
  | "onApplyRecordFilter"
  | "onResetFilter"
  | "onSelectRecord"
>;
