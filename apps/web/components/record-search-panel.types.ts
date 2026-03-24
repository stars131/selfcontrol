"use client";

import type { PanelCopy } from "../lib/record-panel-ui";
import type { RecordFilterState } from "../lib/types";

export type RecordSearchPanelProps = {
  panelCopy: PanelCopy;
  canWriteWorkspace: boolean;
  filteringRecords: boolean;
  savingSearchPreset: boolean;
  filterDraft: RecordFilterState;
  presetName: string;
  currentFilterSummary: string;
  onQueryChange: (value: string) => void;
  onTypeCodeChange: (value: string) => void;
  onAvoidOnlyChange: (value: RecordFilterState["avoidOnly"]) => void;
  onPresetNameChange: (value: string) => void;
  onApplyFilter: () => Promise<void>;
  onResetFilter: () => Promise<void>;
  onSavePreset: () => Promise<void>;
};
