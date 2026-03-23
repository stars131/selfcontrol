"use client";

import { FormEvent, useState } from "react";

import { type AMapGeocoderInstance, type AMapMapInstance, type LocationDraft } from "../lib/map-panel";
import type { LocationFilterState, RecordItem } from "../lib/types";
import { buildClearedLocationFilter, buildMappedOnlyLocationFilter } from "./map-panel-controller-filter";
import { getMapPanelActionErrorMessage, searchMapPanelLocation } from "./map-panel-controller-search";
import { useMapPanelDerivedData } from "./use-map-panel-derived-data";
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

export type MapPanelControllerState = ReturnType<typeof useMapPanelController>;

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
  const [loadError, setLoadError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDraft, setFilterDraft] = useState<LocationFilterState>(locationFilter);
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
