"use client";

import { useEffect } from "react";

import { escapeHtml } from "../lib/map-panel";
import type { UseMapPanelAmapMarkersInput } from "./use-map-panel-amap-markers.types";

export function useMapPanelAmapMarkers({
  draftCoordinates,
  draftLocation,
  mappedRecords,
  mapRef,
  onSelectRecord,
  selectedRecordId,
}: UseMapPanelAmapMarkersInput) {
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
}
