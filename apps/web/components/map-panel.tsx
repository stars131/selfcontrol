"use client";

import { useRef } from "react";

import {
  type AMapGeocoderInstance,
  type AMapMapInstance,
  type LocationDraft,
} from "../lib/map-panel";
import { MapPanelContent } from "./map-panel-content";
import type { MapPanelProps } from "./map-panel.types";
import { MapPanelUnavailableNotice } from "./map-panel-unavailable-notice";
import { useMapPanelAmap } from "./use-map-panel-amap";
import { useMapPanelController } from "./use-map-panel-controller";

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
}: MapPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<AMapMapInstance | null>(null);
  const geocoderRef = useRef<AMapGeocoderInstance | null>(null);
  const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY;
  const controller = useMapPanelController({
    records,
    selectedRecordId,
    locationFilter,
    filteringRecords,
    onApplyLocationFilter,
    draftLocation,
    onDraftLocationChange,
    geocoderRef,
    mapRef,
  });
  useMapPanelAmap({
    amapKey,
    containerRef,
    draftCoordinates: controller.draftCoordinates,
    draftLocation,
    geocoderRef,
    mappedRecords: controller.mappedRecords,
    mapRef,
    onDraftLocationChange,
    onSelectRecord,
    selectedRecordId,
    setLoadError: controller.setLoadError,
  });

  if (!amapKey) {
    return <MapPanelUnavailableNotice />;
  }

  return (
    <MapPanelContent
      containerRef={containerRef}
      controller={controller}
      draftLocation={draftLocation}
      onSelectRecord={onSelectRecord}
      selectedRecordId={selectedRecordId}
    />
  );
}

