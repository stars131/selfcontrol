"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  formatCoordinate,
  parseDraftCoordinates,
  parseMappedRecords,
  readLatitudeValue,
  readLongitudeValue,
  type AMapGeocoderInstance,
  type AMapMapInstance,
  type LocationDraft,
} from "../lib/map-panel";
import type { LocationFilterState, RecordItem } from "../lib/types";
import { readLocationReview } from "../lib/location";

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

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function useMapPanelController({
  records,
  selectedRecordId,
  locationFilter,
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
  const mappedRecords = useMemo(() => parseMappedRecords(records), [records]);
  const confirmedCount = useMemo(
    () => records.filter((record) => readLocationReview(record.extra_data)?.status === "confirmed").length,
    [records],
  );
  const needsReviewCount = useMemo(
    () => records.filter((record) => readLocationReview(record.extra_data)?.status === "needs_review").length,
    [records],
  );
  const draftCoordinates = parseDraftCoordinates(draftLocation);
  const isEditable = Boolean(onDraftLocationChange);

  useEffect(() => {
    setFilterDraft(locationFilter);
  }, [locationFilter]);

  useEffect(() => {
    setSearchQuery(draftLocation?.place_name || draftLocation?.address || "");
  }, [draftLocation?.address, draftLocation?.place_name, selectedRecordId]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!geocoderRef.current || !onDraftLocationChange || !searchQuery.trim()) {
      return;
    }

    setSearching(true);
    setSearchError("");

    try {
      const keyword = searchQuery.trim();
      const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
        geocoderRef.current?.getLocation?.(keyword, (status, geocodeResult) => {
          if (status !== "complete") {
            reject(new Error("Location search failed"));
            return;
          }
          resolve(geocodeResult);
        });
      });

      const geocodes = Array.isArray(result.geocodes) ? result.geocodes : [];
      const firstItem =
        geocodes[0] && typeof geocodes[0] === "object" && geocodes[0] !== null
          ? (geocodes[0] as Record<string, unknown>)
          : null;

      if (!firstItem) {
        throw new Error("No matching location found");
      }

      const location =
        typeof firstItem.location === "object" && firstItem.location !== null
          ? (firstItem.location as Record<string, unknown>)
          : {};
      const longitude = readLongitudeValue(location);
      const latitude = readLatitudeValue(location);

      if (latitude === null || longitude === null) {
        throw new Error("Failed to read coordinates from the search result");
      }

      onDraftLocationChange({
        place_name: draftLocation?.place_name || keyword,
        address: typeof firstItem.formattedAddress === "string" ? firstItem.formattedAddress : keyword,
        latitude: formatCoordinate(latitude),
        longitude: formatCoordinate(longitude),
        source: "search",
      });
      mapRef.current?.setZoomAndCenter?.(15, [longitude, latitude]);
    } catch (caught) {
      setSearchError(getActionErrorMessage(caught, "Location search failed"));
    } finally {
      setSearching(false);
    }
  };

  const handleApplyFilter = async () => {
    await onApplyLocationFilter(filterDraft);
  };

  const handleUseMappedOnly = async () => {
    const nextFilter: LocationFilterState = {
      ...filterDraft,
      mappedOnly: "mapped",
    };
    setFilterDraft(nextFilter);
    await onApplyLocationFilter(nextFilter);
  };

  const handleClearFilter = async () => {
    const nextFilter: LocationFilterState = {
      placeQuery: "",
      reviewStatus: "all",
      mappedOnly: "all",
    };
    setFilterDraft(nextFilter);
    await onApplyLocationFilter(nextFilter);
  };

  return {
    loadError,
    searchError,
    searching,
    searchQuery,
    filterDraft,
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
