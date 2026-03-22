import { readLocationInfo, readLocationReview } from "./location";
import type { RecordItem } from "./types";

export type AMapMapInstance = {
  clearMap?: () => void;
  destroy?: () => void;
  on?: (event: string, handler: (event: AMapClickEvent) => void) => void;
  setFitView?: () => void;
  setZoomAndCenter?: (zoom: number, center: [number, number]) => void;
};

export type AMapMarkerInstance = {
  on?: (event: string, handler: () => void) => void;
  setMap?: (map: unknown) => void;
};

export type AMapGeocoderInstance = {
  getAddress?: (
    location: [number, number],
    callback: (status: string, result: Record<string, unknown>) => void,
  ) => void;
  getLocation?: (
    keyword: string,
    callback: (status: string, result: Record<string, unknown>) => void,
  ) => void;
};

export type AMapClickEvent = {
  lnglat?: {
    getLat?: () => number;
    getLng?: () => number;
    lat?: number;
    lng?: number;
  };
};

declare global {
  interface Window {
    AMap?: {
      Geocoder: new (options?: Record<string, unknown>) => AMapGeocoderInstance;
      Map: new (container: HTMLElement, options: Record<string, unknown>) => AMapMapInstance;
      Marker: new (options: Record<string, unknown>) => AMapMarkerInstance;
    };
  }
}

let amapLoaderPromise: Promise<void> | null = null;

export type LocationDraft = {
  place_name: string;
  address: string;
  latitude: string;
  longitude: string;
  source: string;
};

export type MappedRecord = {
  id: string;
  title: string;
  placeName: string;
  address: string;
  reviewStatus: string;
  latitude: number;
  longitude: number;
};

export function loadAmapScript(key: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("AMap is only available in the browser"));
  }

  if (window.AMap) {
    return Promise.resolve();
  }

  if (amapLoaderPromise) {
    return amapLoaderPromise;
  }

  amapLoaderPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}&plugin=AMap.Geocoder`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load AMap script"));
    document.body.appendChild(script);
  });

  return amapLoaderPromise;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatCoordinate(value: number): string {
  return value.toFixed(6);
}

function readNumericValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (typeof value === "object" && value !== null) {
    const objectValue = value as {
      getLat?: () => number;
      getLng?: () => number;
      lat?: number;
      lng?: number;
    };

    if (typeof objectValue.getLat === "function") {
      return objectValue.getLat();
    }

    if (typeof objectValue.getLng === "function") {
      return objectValue.getLng();
    }

    if (typeof objectValue.lat === "number") {
      return objectValue.lat;
    }

    if (typeof objectValue.lng === "number") {
      return objectValue.lng;
    }
  }

  return null;
}

export function readLatitudeValue(value: unknown): number | null {
  if (typeof value === "object" && value !== null) {
    const objectValue = value as {
      getLat?: () => number;
      lat?: number;
    };

    if (typeof objectValue.getLat === "function") {
      return objectValue.getLat();
    }

    if (typeof objectValue.lat === "number") {
      return objectValue.lat;
    }
  }

  return readNumericValue(value);
}

export function readLongitudeValue(value: unknown): number | null {
  if (typeof value === "object" && value !== null) {
    const objectValue = value as {
      getLng?: () => number;
      lng?: number;
    };

    if (typeof objectValue.getLng === "function") {
      return objectValue.getLng();
    }

    if (typeof objectValue.lng === "number") {
      return objectValue.lng;
    }
  }

  return readNumericValue(value);
}

export function parseMappedRecords(records: RecordItem[]): MappedRecord[] {
  return records
    .map((record) => {
      const location = readLocationInfo(record.extra_data);
      const reviewStatus = readLocationReview(record.extra_data)?.status ?? "pending";
      const latitude = readLatitudeValue(location.latitude);
      const longitude = readLongitudeValue(location.longitude);

      if (latitude === null || longitude === null) {
        return null;
      }

      return {
        id: record.id,
        title: record.title || record.content || "Untitled",
        placeName: location.place_name || "Unknown place",
        address: location.address || "",
        reviewStatus,
        latitude,
        longitude,
      };
    })
    .filter((item): item is MappedRecord => Boolean(item));
}

export function extractAddress(result: Record<string, unknown>): { address: string; placeName: string } {
  const geocode = typeof result.regeocode === "object" && result.regeocode !== null
    ? (result.regeocode as Record<string, unknown>)
    : {};
  const pois = Array.isArray(geocode.pois) ? geocode.pois : [];
  const firstPoi =
    pois[0] && typeof pois[0] === "object" && pois[0] !== null ? (pois[0] as Record<string, unknown>) : {};

  return {
    address:
      (typeof geocode.formattedAddress === "string" && geocode.formattedAddress) ||
      (typeof result.formattedAddress === "string" ? result.formattedAddress : ""),
    placeName: typeof firstPoi.name === "string" ? firstPoi.name : "",
  };
}

export function parseDraftCoordinates(draftLocation?: LocationDraft | null): [number, number] | null {
  if (!draftLocation) {
    return null;
  }

  const latitude = readLatitudeValue(draftLocation.latitude);
  const longitude = readLongitudeValue(draftLocation.longitude);
  if (latitude === null || longitude === null) {
    return null;
  }

  return [longitude, latitude];
}
