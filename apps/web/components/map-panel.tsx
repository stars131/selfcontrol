"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  escapeHtml,
  extractAddress,
  formatCoordinate,
  loadAmapScript,
  parseDraftCoordinates,
  parseMappedRecords,
  readLatitudeValue,
  readLongitudeValue,
  type AMapClickEvent,
  type AMapGeocoderInstance,
  type AMapMapInstance,
  type LocationDraft,
} from "../lib/map-panel";
import type { LocationFilterState, RecordItem } from "../lib/types";
import { readLocationReview } from "../lib/location";

export type { LocationDraft } from "../lib/map-panel";

export function MapPanel({
  records,
  selectedRecordId,
  onSelectRecord,
  locationFilter,
  filteringRecords,
  onApplyLocationFilter,
  draftLocation,
  onDraftLocationChange,
}: {
  records: RecordItem[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string | null) => void;
  locationFilter: LocationFilterState;
  filteringRecords: boolean;
  onApplyLocationFilter: (nextFilter: LocationFilterState) => Promise<void>;
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
  const [filterDraft, setFilterDraft] = useState<LocationFilterState>(locationFilter);
  const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY;
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
    onDraftLocationChangeRef.current = onDraftLocationChange;
  }, [onDraftLocationChange]);

  useEffect(() => {
    setFilterDraft(locationFilter);
  }, [locationFilter]);

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

    const selectedMappedRecord = mappedRecords.find((item) => item.id === selectedRecordId) ?? null;

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
    } else if (selectedMappedRecord) {
      mapRef.current.setZoomAndCenter?.(15, [selectedMappedRecord.longitude, selectedMappedRecord.latitude]);
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
      <div className="tag-row">
        <span className="tag">{mappedRecords.length} mapped</span>
        <span className="tag">{confirmedCount} confirmed</span>
        <span className="tag">{needsReviewCount} need review</span>
      </div>
      <div className="record-card form-stack" style={{ marginTop: 12 }}>
        <div className="eyebrow">Map drill-down</div>
        <div className="inline-fields">
          <label className="field">
            <span className="field-label">Place query</span>
            <input
              className="input"
              value={filterDraft.placeQuery}
              onChange={(event) =>
                setFilterDraft((current) => ({
                  ...current,
                  placeQuery: event.target.value,
                }))
              }
              placeholder="Soup House / address / landmark"
            />
          </label>
          <label className="field">
            <span className="field-label">Map status</span>
            <select
              className="input"
              value={filterDraft.mappedOnly}
              onChange={(event) =>
                setFilterDraft((current) => ({
                  ...current,
                  mappedOnly: event.target.value as LocationFilterState["mappedOnly"],
                }))
              }
            >
              <option value="all">all records</option>
              <option value="mapped">mapped only</option>
              <option value="unmapped">unmapped only</option>
            </select>
          </label>
          <label className="field">
            <span className="field-label">Review</span>
            <select
              className="input"
              value={filterDraft.reviewStatus}
              onChange={(event) =>
                setFilterDraft((current) => ({
                  ...current,
                  reviewStatus: event.target.value as LocationFilterState["reviewStatus"],
                }))
              }
            >
              <option value="all">all</option>
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="needs_review">needs_review</option>
            </select>
          </label>
        </div>
        <div className="action-row">
          <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void handleApplyFilter()}>
            {filteringRecords ? "Filtering..." : "Apply location filter"}
          </button>
          <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void handleUseMappedOnly()}>
            Mapped only
          </button>
          <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void handleClearFilter()}>
            Clear location filter
          </button>
        </div>
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
      {mappedRecords.length ? (
        <div className="record-list compact-list" style={{ marginTop: 12 }}>
          {mappedRecords.slice(0, 8).map((record) => (
            <button
              className={`record-card selectable-card ${record.id === selectedRecordId ? "selected" : ""}`}
              key={record.id}
              type="button"
              onClick={() => onSelectRecord(record.id)}
            >
              <div className="eyebrow">{record.reviewStatus}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{record.placeName}</div>
              {record.address ? (
                <div className="muted" style={{ marginTop: 8 }}>
                  {record.address}
                </div>
              ) : null}
              <div className="muted" style={{ marginTop: 8 }}>
                {record.latitude.toFixed(5)}, {record.longitude.toFixed(5)}
              </div>
            </button>
          ))}
        </div>
      ) : null}
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

