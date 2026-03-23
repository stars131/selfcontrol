"use client";

import type { LocationFilterState } from "../lib/types";

export function buildMappedOnlyLocationFilter(
  filterDraft: LocationFilterState,
): LocationFilterState {
  return {
    ...filterDraft,
    mappedOnly: "mapped",
  };
}

export function buildClearedLocationFilter(): LocationFilterState {
  return {
    placeQuery: "",
    reviewStatus: "all",
    mappedOnly: "all",
  };
}
