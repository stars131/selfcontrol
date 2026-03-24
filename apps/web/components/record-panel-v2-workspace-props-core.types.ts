import type { ComponentProps, Dispatch, SetStateAction } from "react";

import type { RecordFormState } from "../lib/record-panel-forms";
import type { PanelCopy } from "../lib/record-panel-ui";
import type { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordFilterState } from "../lib/types";
import { RecordBrowseWorkspace } from "./record-browse-workspace";
import { RecordEditorWorkspace } from "./record-editor-workspace";

export type RecordBrowseWorkspaceProps = ComponentProps<typeof RecordBrowseWorkspace>;
export type RecordEditorWorkspaceProps = ComponentProps<typeof RecordEditorWorkspace>;
export type RecordPanelDetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordBrowseWorkspaceTypeSupport = {
  filterDraft: RecordFilterState;
  form: RecordFormState;
  panelCopy: PanelCopy;
  setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  setPresetName: Dispatch<SetStateAction<string>>;
  setViewMode: Dispatch<SetStateAction<"timeline" | "list">>;
};
