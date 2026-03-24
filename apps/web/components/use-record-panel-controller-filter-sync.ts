"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import type { RecordFilterState } from "../lib/types";
import type { UseRecordPanelControllerFilterSyncInput } from "./use-record-panel-controller-filter-sync.types";
export function useRecordPanelControllerFilterSync({ recordFilter, setFilterDraft }: UseRecordPanelControllerFilterSyncInput) {
  useEffect(() => {
    setFilterDraft(recordFilter);
  }, [recordFilter, setFilterDraft]);
}
