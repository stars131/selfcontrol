"use client";

import { useState } from "react";

import type { LocationFilterState } from "../lib/types";

export function useMapPanelControllerState(locationFilter: LocationFilterState) {
  const [loadError, setLoadError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDraft, setFilterDraft] = useState<LocationFilterState>(locationFilter);

  return {
    loadError,
    setLoadError,
    searchError,
    setSearchError,
    searching,
    setSearching,
    searchQuery,
    setSearchQuery,
    filterDraft,
    setFilterDraft,
  };
}
