import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";
import type { RecordPanelV2Props } from "./record-panel-v2.types";

export type BuildRecordBrowseWorkspacePropInputArgs = { props: RecordPanelShellInput["props"] };
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
