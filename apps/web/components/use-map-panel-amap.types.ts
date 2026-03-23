"use client";

import type {
  AMapGeocoderInstance,
  AMapMapInstance,
  LocationDraft,
  MappedRecord,
} from "../lib/map-panel";

export type UseMapPanelAmapProps = {
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
