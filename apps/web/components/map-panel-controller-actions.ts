import type { FormEvent } from "react";

import type { AMapGeocoderInstance, AMapMapInstance, LocationDraft } from "../lib/map-panel";
import type { LocationFilterState } from "../lib/types";
import { buildClearedLocationFilter, buildMappedOnlyLocationFilter } from "./map-panel-controller-filter";
import { getMapPanelActionErrorMessage, searchMapPanelLocation } from "./map-panel-controller-search";

type CreateMapPanelControllerActionsInput = {
  draftLocation?: LocationDraft | null;
  filterDraft: LocationFilterState;
  geocoderRef: { current: AMapGeocoderInstance | null };
  mapRef: { current: AMapMapInstance | null };
  onApplyLocationFilter: (nextFilter: LocationFilterState) => Promise<void>;
  onDraftLocationChange?: (next: LocationDraft) => void;
  searchQuery: string;
  setFilterDraft: (nextFilter: LocationFilterState) => void;
  setSearchError: (value: string) => void;
  setSearching: (value: boolean) => void;
};

export function createMapPanelControllerActions({
  draftLocation,
  filterDraft,
  geocoderRef,
  mapRef,
  onApplyLocationFilter,
  onDraftLocationChange,
  searchQuery,
  setFilterDraft,
  setSearchError,
  setSearching,
}: CreateMapPanelControllerActionsInput) {
  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!geocoderRef.current || !onDraftLocationChange || !searchQuery.trim()) {
      return;
    }

    setSearching(true);
    setSearchError("");

    try {
      const keyword = searchQuery.trim();
      await searchMapPanelLocation({
        draftLocation,
        geocoder: geocoderRef.current,
        keyword,
        map: mapRef.current,
        onDraftLocationChange,
      });
    } catch (caught) {
      setSearchError(getMapPanelActionErrorMessage(caught, "Location search failed"));
    } finally {
      setSearching(false);
    }
  };

  const handleApplyFilter = async () => {
    await onApplyLocationFilter(filterDraft);
  };

  const handleUseMappedOnly = async () => {
    const nextFilter = buildMappedOnlyLocationFilter(filterDraft);
    setFilterDraft(nextFilter);
    await onApplyLocationFilter(nextFilter);
  };

  const handleClearFilter = async () => {
    const nextFilter = buildClearedLocationFilter();
    setFilterDraft(nextFilter);
    await onApplyLocationFilter(nextFilter);
  };

  return {
    handleSearch,
    handleApplyFilter,
    handleUseMappedOnly,
    handleClearFilter,
  };
}
