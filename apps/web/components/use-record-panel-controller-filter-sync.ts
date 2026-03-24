"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import type { RecordFilterState } from "../lib/types";
export function useRecordPanelControllerFilterSync({ recordFilter, setFilterDraft }: {
  recordFilter: RecordFilterState;
  setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;
}) {
  useEffect(() => {
    setFilterDraft(recordFilter);
  }, [recordFilter, setFilterDraft]);
}
