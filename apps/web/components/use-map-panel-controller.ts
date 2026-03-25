"use client";

import { type AMapGeocoderInstance, type AMapMapInstance, type LocationDraft } from "../lib/map-panel";
import type { LocationFilterState, RecordItem } from "../lib/types";
import { createMapPanelControllerActions } from "./map-panel-controller-actions";
import { useMapPanelDerivedData } from "./use-map-panel-derived-data";
import { useMapPanelControllerState } from "./use-map-panel-controller-state";
import { useMapPanelSync } from "./use-map-panel-sync";

type UseMapPanelControllerProps = {
  records: RecordItem[];
  selectedRecordId: string | null;
  locationFilter: LocationFilterState;
  filteringRecords: boolean;
  onApplyLocationFilter: (nextFilter: LocationFilterState) => Promise<void>;
  draftLocation?: LocationDraft | null;
  onDraftLocationChange?: (next: LocationDraft) => void;
  geocoderRef: { current: AMapGeocoderInstance | null };
  mapRef: { current: AMapMapInstance | null };
};

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
