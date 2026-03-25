"use client";

import { createMapPanelControllerActions } from "./map-panel-controller-actions";
import { useMapPanelDerivedData } from "./use-map-panel-derived-data";
import { useMapPanelControllerState } from "./use-map-panel-controller-state";
import type { UseMapPanelControllerProps } from "./use-map-panel-controller.types";
import { useMapPanelSync } from "./use-map-panel-sync";

export function useMapPanelController({
  records,
  selectedRecordId,
  locationFilter,
  filteringRecords,
  onApplyLocationFilter,
  draftLocation,
  onDraftLocationChange,
  geocoderRef,
  mapRef,
}: UseMapPanelControllerProps) {
  const {
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
  } = useMapPanelControllerState(locationFilter);
  const { draftCoordinates, mappedRecords, confirmedCount, needsReviewCount } = useMapPanelDerivedData({
    draftLocation,
    records,
  });
  const isEditable = Boolean(onDraftLocationChange);

  useMapPanelSync({
    draftLocation,
    locationFilter,
    selectedRecordId,
    setFilterDraft,
    setSearchQuery,
  });

  const { handleSearch, handleApplyFilter, handleUseMappedOnly, handleClearFilter } =
    createMapPanelControllerActions({
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
    });

  return {
    loadError,
    searchError,
    searching,
    searchQuery,
    filterDraft,
    filteringRecords,
    mappedRecords,
    confirmedCount,
    needsReviewCount,
    draftCoordinates,
    isEditable,
    setLoadError,
    setSearchQuery,
    setFilterDraft,
    handleSearch,
    handleApplyFilter,
    handleUseMappedOnly,
    handleClearFilter,
  };
}
