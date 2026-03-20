"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import type { RecordItem } from "../lib/types";

type AMapMapInstance = {
  clearMap?: () => void;
  destroy?: () => void;
  on?: (event: string, handler: (event: AMapClickEvent) => void) => void;
  setFitView?: () => void;
  setZoomAndCenter?: (zoom: number, center: [number, number]) => void;
};

type AMapMarkerInstance = {
  on?: (event: string, handler: () => void) => void;
  setMap?: (map: unknown) => void;
};

type AMapGeocoderInstance = {
  getAddress?: (
    location: [number, number],
    callback: (status: string, result: Record<string, unknown>) => void,
  ) => void;
  getLocation?: (
    keyword: string,
    callback: (status: string, result: Record<string, unknown>) => void,
  ) => void;
};

type AMapClickEvent = {
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

type MappedRecord = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
};

function loadAmapScript(key: string): Promise<void> {
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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatCoordinate(value: number): string {
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

function readLatitudeValue(value: unknown): number | null {
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

function readLongitudeValue(value: unknown): number | null {
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

function parseMappedRecords(records: RecordItem[]): MappedRecord[] {
  return records
    .map((record) => {
      const raw = record.extra_data?.location;
      const location = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};
      const latitude = readLatitudeValue(location.latitude);
      const longitude = readLongitudeValue(location.longitude);

      if (latitude === null || longitude === null) {
        return null;
      }

      return {
        id: record.id,
        title: record.title || record.content || "Untitled",
        latitude,
        longitude,
      };
    })
    .filter((item): item is MappedRecord => Boolean(item));
}

function extractAddress(result: Record<string, unknown>): { address: string; placeName: string } {
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

function parseDraftCoordinates(draftLocation?: LocationDraft | null): [number, number] | null {
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

export function MapPanel({
  records,
  selectedRecordId,
  onSelectRecord,
  draftLocation,
  onDraftLocationChange,
}: {
  records: RecordItem[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string | null) => void;
  draftLocation?: LocationDraft | null;
  onDraftLocationChange?: (next: LocationDraft) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<AMapMapInstance | null>(null);
  const geocoderRef = useRef<AMapGeocoderInstance | null>(null);
  const onDraftLocationChangeRef = useRef(onDraftLocationChange);
  const [loadError, setLoadError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY;
  const mappedRecords = useMemo(() => parseMappedRecords(records), [records]);
  const draftCoordinates = parseDraftCoordinates(draftLocation);
  const isEditable = Boolean(onDraftLocationChange);

  useEffect(() => {
    onDraftLocationChangeRef.current = onDraftLocationChange;
  }, [onDraftLocationChange]);

  useEffect(() => {
    setSearchQuery(draftLocation?.place_name || draftLocation?.address || "");
  }, [draftLocation?.address, draftLocation?.place_name, selectedRecordId]);

  useEffect(() => {
    if (!amapKey || !containerRef.current) {
      return;
    }

    let isCancelled = false;

    void loadAmapScript(amapKey)
      .then(() => {
        if (isCancelled || !window.AMap || !containerRef.current) {
          return;
        }

        if (!mapRef.current) {
          const mapInstance = new window.AMap.Map(containerRef.current, {
            zoom: 4,
            center: [105, 35],
            viewMode: "2D",
          });

          mapInstance.on?.("click", (event) => {
            const changeLocation = onDraftLocationChangeRef.current;
            if (!changeLocation || !geocoderRef.current || !event.lnglat) {
              return;
            }

            const longitude = readLongitudeValue(event.lnglat);
            const latitude = readLatitudeValue(event.lnglat);

            if (latitude === null || longitude === null) {
              return;
            }

            geocoderRef.current.getAddress?.([longitude, latitude], (_status, result) => {
              const { address, placeName } = extractAddress(result);
              changeLocation({
                place_name: placeName,
                address,
                latitude: formatCoordinate(latitude),
                longitude: formatCoordinate(longitude),
                source: "map",
              });
              mapRef.current?.setZoomAndCenter?.(15, [longitude, latitude]);
            });
          });

          mapRef.current = mapInstance;
        }

        if (!geocoderRef.current) {
          geocoderRef.current = new window.AMap.Geocoder({});
        }

        setLoadError("");
      })
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : "Failed to load AMap");
      });

    return () => {
      isCancelled = true;
    };
  }, [amapKey]);

  useEffect(() => {
    if (!window.AMap || !mapRef.current) {
      return;
    }

    mapRef.current.clearMap?.();

    for (const record of mappedRecords) {
      const marker = new window.AMap.Marker({
        position: [record.longitude, record.latitude],
        title: record.title,
        label:
          selectedRecordId === record.id
            ? { content: `<div style="padding:4px 8px;">${escapeHtml(record.title)}</div>` }
            : undefined,
      });
      marker.on?.("click", () => onSelectRecord(record.id));
      marker.setMap?.(mapRef.current);
    }

    if (draftCoordinates) {
      const draftTitle = draftLocation?.place_name || draftLocation?.address || "Draft location";
      const draftMarker = new window.AMap.Marker({
        position: draftCoordinates,
        title: draftTitle,
        content:
          '<div style="width:18px;height:18px;border-radius:999px;background:#d0642b;border:3px solid #fff;box-shadow:0 6px 18px rgba(46,34,23,.22);"></div>',
      });
      draftMarker.setMap?.(mapRef.current);
      mapRef.current.setZoomAndCenter?.(15, draftCoordinates);
    } else if (mappedRecords.length) {
      mapRef.current.setFitView?.();
    }
  }, [draftCoordinates, draftLocation?.address, draftLocation?.place_name, mappedRecords, onSelectRecord, selectedRecordId]);

  useEffect(() => {
    return () => {
      mapRef.current?.destroy?.();
      mapRef.current = null;
      geocoderRef.current = null;
    };
  }, []);

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
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : "Location search failed");
    } finally {
      setSearching(false);
    }
  };

  if (!amapKey) {
    return (
      <section className="record-card" style={{ marginTop: 20 }}>
        <div className="eyebrow">Map</div>
        <div className="notice" style={{ marginTop: 12 }}>
          AMap key is not configured. Add `NEXT_PUBLIC_AMAP_KEY` to `.env`.
        </div>
      </section>
    );
  }

  return (
    <section className="record-card" style={{ marginTop: 20 }}>
      <div className="eyebrow">Map</div>
      <div className="muted" style={{ marginTop: 8 }}>
        {isEditable
          ? "Search an address or click the map to fill place details for the current record."
          : "Records with latitude and longitude appear here."}
      </div>
      {isEditable ? (
        <form className="composer" style={{ marginTop: 12 }} onSubmit={handleSearch}>
          <div className="inline-fields">
            <label className="field" style={{ gridColumn: "span 2" }}>
              <span className="field-label">Location search</span>
              <input
                className="input"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by shop name, address, or landmark"
              />
            </label>
            <div className="field" style={{ alignSelf: "end" }}>
              <button className="button secondary" disabled={searching || !searchQuery.trim()} type="submit">
                {searching ? "Searching..." : "Search place"}
              </button>
            </div>
          </div>
        </form>
      ) : null}
      {loadError ? (
        <div className="notice error" style={{ marginTop: 12 }}>
          {loadError}
        </div>
      ) : null}
      {searchError ? (
        <div className="notice error" style={{ marginTop: 12 }}>
          {searchError}
        </div>
      ) : null}
      <div className="map-canvas" ref={containerRef} />
      {draftLocation?.latitude && draftLocation?.longitude ? (
        <div className="muted" style={{ marginTop: 12 }}>
          Current point: {draftLocation.latitude}, {draftLocation.longitude}
          {draftLocation.source ? ` | ${draftLocation.source}` : ""}
        </div>
      ) : null}
      {!mappedRecords.length && !draftCoordinates ? (
        <div className="notice" style={{ marginTop: 12 }}>
          {isEditable
            ? "No location selected yet. Search a place or click on the map to set one."
            : "No mapped records yet. Add latitude and longitude in the record editor."}
        </div>
      ) : null}
    </section>
  );
}

