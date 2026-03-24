"use client";

import { useState } from "react";
import type { RecordFilterState } from "../lib/types";
import type { ViewMode } from "./record-panel-v2.types";

export function useRecordPanelControllerBrowseState(recordFilter: RecordFilterState) {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [filterDraft, setFilterDraft] = useState<RecordFilterState>(recordFilter);
  const [presetName, setPresetName] = useState("");
  return {
    viewMode,
    setViewMode,
    filterDraft,
    setFilterDraft,
    presetName,
    setPresetName,
  };
}
