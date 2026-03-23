"use client";

import {
  formatCoordinate,
  readLatitudeValue,
  readLongitudeValue,
  type AMapGeocoderInstance,
  type AMapMapInstance,
  type LocationDraft,
} from "../lib/map-panel";

function readFirstGeocode(result: Record<string, unknown>) {
  const geocodes = Array.isArray(result.geocodes) ? result.geocodes : [];
  return geocodes[0] && typeof geocodes[0] === "object" && geocodes[0] !== null
    ? (geocodes[0] as Record<string, unknown>)
    : null;
}

function readSearchCoordinates(item: Record<string, unknown>) {
  const location =
    typeof item.location === "object" && item.location !== null
      ? (item.location as Record<string, unknown>)
      : {};

  return {
    longitude: readLongitudeValue(location),
    latitude: readLatitudeValue(location),
  };
}

export function getMapPanelActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export async function searchMapPanelLocation({
  draftLocation,
  geocoder,
  keyword,
  map,
  onDraftLocationChange,
}: {
  draftLocation?: LocationDraft | null;
  geocoder: AMapGeocoderInstance;
  keyword: string;
  map?: AMapMapInstance | null;
  onDraftLocationChange: (next: LocationDraft) => void;
}) {
  const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
    geocoder.getLocation?.(keyword, (status, geocodeResult) => {
      if (status !== "complete") {
        reject(new Error("Location search failed"));
        return;
      }
      resolve(geocodeResult);
    });
  });

  const firstItem = readFirstGeocode(result);
  if (!firstItem) {
    throw new Error("No matching location found");
  }

  const { longitude, latitude } = readSearchCoordinates(firstItem);
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
  map?.setZoomAndCenter?.(15, [longitude, latitude]);
}
