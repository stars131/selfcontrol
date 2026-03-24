"use client";
import type { RecordFilterState } from "../lib/types";
import { useRecordPanelControllerBrowseState } from "./use-record-panel-controller-browse-state";
import { useRecordPanelControllerFormState } from "./use-record-panel-controller-form-state";
import { useRecordPanelControllerMediaState } from "./use-record-panel-controller-media-state";

export function useRecordPanelControllerState(recordFilter: RecordFilterState) {
  const formState = useRecordPanelControllerFormState();
  const mediaState = useRecordPanelControllerMediaState();
  const browseState = useRecordPanelControllerBrowseState(recordFilter);
  return {
    ...formState,
    ...mediaState,
    ...browseState,
  };
}
