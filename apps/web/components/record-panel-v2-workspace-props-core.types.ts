import type { Dispatch, SetStateAction } from "react";

import type { RecordFormState } from "../lib/record-panel-forms";
import type { PanelCopy } from "../lib/record-panel-ui";
import type { RecordFilterState } from "../lib/types";
import type { RecordPanelDetailCopy as RecordPanelDetailCopyValue } from "./record-panel-detail-copy.types";
import type { RecordBrowseWorkspaceProps as RecordBrowseWorkspacePropsValue } from "./record-browse-workspace.types";
import type { RecordEditorWorkspaceProps as RecordEditorWorkspacePropsValue } from "./record-editor-workspace.types";

export type RecordBrowseWorkspaceProps = RecordBrowseWorkspacePropsValue;
export type RecordEditorWorkspaceProps = RecordEditorWorkspacePropsValue;
export type RecordPanelDetailCopy = RecordPanelDetailCopyValue;

export type RecordBrowseWorkspaceTypeSupport = {
  filterDraft: RecordFilterState;
  form: RecordFormState;
  panelCopy: PanelCopy;
  setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  setPresetName: Dispatch<SetStateAction<string>>;
  setViewMode: Dispatch<SetStateAction<"timeline" | "list">>;
};
