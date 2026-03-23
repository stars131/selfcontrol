"use client";

import { useEffect } from "react";

import type { LocationDraft } from "../lib/map-panel";
import type { LocationFilterState } from "../lib/types";

export function useMapPanelSync({
  draftLocation,
  locationFilter,
  selectedRecordId,
  setFilterDraft,
  setSearchQuery,
}: {
  draftLocation?: LocationDraft | null;
  locationFilter: LocationFilterState;
  selectedRecordId: string | null;
  setFilterDraft: (value: LocationFilterState) => void;
  setSearchQuery: (value: string) => void;
}) {
  useEffect(() => {
    setFilterDraft(locationFilter);
  }, [locationFilter, setFilterDraft]);

  useEffect(() => {
    setSearchQuery(draftLocation?.place_name || draftLocation?.address || "");
  }, [draftLocation?.address, draftLocation?.place_name, selectedRecordId, setSearchQuery]);
}
