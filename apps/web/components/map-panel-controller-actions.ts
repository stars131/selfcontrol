import type { FormEvent } from "react";

import { buildClearedLocationFilter, buildMappedOnlyLocationFilter } from "./map-panel-controller-filter";
import { getMapPanelActionErrorMessage, searchMapPanelLocation } from "./map-panel-controller-search";
import type { CreateMapPanelControllerActionsInput } from "./map-panel-controller-actions.types";

export function createMapPanelControllerActions({
  draftLocation,
  filterDraft,
  geocoderRef,
  mapRef,
  noMatchingLocationLabel,
  onApplyLocationFilter,
  onDraftLocationChange,
  searchCoordinatesErrorLabel,
  searchFailedLabel,
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
        noMatchingLocationLabel,
        onDraftLocationChange,
        searchCoordinatesErrorLabel,
        searchFailedLabel,
      });
    } catch (caught) {
      setSearchError(getMapPanelActionErrorMessage(caught, searchFailedLabel));
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
