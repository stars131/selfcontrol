"use client";

import { useState } from "react";

import { INITIAL_RECORD_FILTER } from "../lib/workspace-shell-refresh";
import type { RecordItem, SearchPresetItem, TimelineDay, Workspace } from "../lib/types";

export function useWorkspaceShellStateCoreValues() {
  const [token, setToken] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [visibleRecords, setVisibleRecords] = useState<RecordItem[]>([]);
  const [timelineDays, setTimelineDays] = useState<TimelineDay[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [recordFilter, setRecordFilter] = useState(INITIAL_RECORD_FILTER);
  const [searchPresets, setSearchPresets] = useState<SearchPresetItem[]>([]);
  const [filteringRecords, setFilteringRecords] = useState(false);
  const [savingSearchPreset, setSavingSearchPreset] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  return {
    token,
    setToken,
    workspace,
    setWorkspace,
    records,
    setRecords,
    visibleRecords,
    setVisibleRecords,
    timelineDays,
    setTimelineDays,
    selectedRecordId,
    setSelectedRecordId,
    recordFilter,
    setRecordFilter,
    searchPresets,
    setSearchPresets,
    filteringRecords,
    setFilteringRecords,
    savingSearchPreset,
    setSavingSearchPreset,
    loading,
    setLoading,
    error,
    setError,
  };
}
