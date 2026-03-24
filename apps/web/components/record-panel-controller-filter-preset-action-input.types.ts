"use client";
import type { RecordFilterState } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export type RecordPanelControllerFilterPresetActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  filterDraft: RecordFilterState;
  onCreateSearchPreset: ControllerProps["onCreateSearchPreset"];
  onDeleteSearchPreset: ControllerProps["onDeleteSearchPreset"];
  presetName: string;
  setError: (value: string) => void;
  setPresetName: (value: string) => void;
};
