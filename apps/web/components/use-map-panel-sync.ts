"use client";

import { useEffect } from "react";

import type { UseMapPanelSyncInput } from "./use-map-panel-sync.types";

export function useMapPanelSync({
  draftLocation,
  locationFilter,
  selectedRecordId,
  setFilterDraft,
  setSearchQuery,
}: UseMapPanelSyncInput) {
  useEffect(() => {
    setFilterDraft(locationFilter);
  }, [locationFilter, setFilterDraft]);

  useEffect(() => {
    setSearchQuery(draftLocation?.place_name || draftLocation?.address || "");
  }, [draftLocation?.address, draftLocation?.place_name, selectedRecordId, setSearchQuery]);
}
