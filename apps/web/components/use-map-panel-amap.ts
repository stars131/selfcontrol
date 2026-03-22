"use client";

import { useEffect, useRef } from "react";

import {
  escapeHtml,
  extractAddress,
  formatCoordinate,
  loadAmapScript,
  readLatitudeValue,
  readLongitudeValue,
  type AMapGeocoderInstance,
  type AMapMapInstance,
  type LocationDraft,
  type MappedRecord,
} from "../lib/map-panel";

type UseMapPanelAmapProps = {
  amapKey?: string;
  containerRef: { current: HTMLDivElement | null };
  draftCoordinates: [number, number] | null;
  draftLocation?: LocationDraft | null;
  geocoderRef: { current: AMapGeocoderInstance | null };
  mappedRecords: MappedRecord[];
  mapRef: { current: AMapMapInstance | null };
  onDraftLocationChange?: (next: LocationDraft) => void;
  onSelectRecord: (recordId: string | null) => void;
  selectedRecordId: string | null;
  setLoadError: (value: string) => void;
};

export function useMapPanelAmap({
  amapKey,
  containerRef,
  draftCoordinates,
  draftLocation,
  geocoderRef,
  mappedRecords,
  mapRef,
  onDraftLocationChange,
  onSelectRecord,
  selectedRecordId,
  setLoadError,
}: UseMapPanelAmapProps) {
  const onDraftLocationChangeRef = useRef(onDraftLocationChange);

  useEffect(() => {
    onDraftLocationChangeRef.current = onDraftLocationChange;
  }, [onDraftLocationChange]);

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
  }, [amapKey, setLoadError]);

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
}
