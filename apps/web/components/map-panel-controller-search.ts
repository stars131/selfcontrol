"use client";

import {
  formatCoordinate,
  readLatitudeValue,
  readLongitudeValue,
} from "../lib/map-panel";
import type { SearchMapPanelLocationInput } from "./map-panel-controller-search.types";

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
  noMatchingLocationLabel,
  onDraftLocationChange,
  searchCoordinatesErrorLabel,
  searchFailedLabel,
}: SearchMapPanelLocationInput) {
  const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
    geocoder.getLocation?.(keyword, (status, geocodeResult) => {
      if (status !== "complete") {
        reject(new Error(searchFailedLabel));
        return;
      }
      resolve(geocodeResult);
    });
  });

  const firstItem = readFirstGeocode(result);
  if (!firstItem) {
    throw new Error(noMatchingLocationLabel);
  }

  const { longitude, latitude } = readSearchCoordinates(firstItem);
  if (latitude === null || longitude === null) {
    throw new Error(searchCoordinatesErrorLabel);
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
