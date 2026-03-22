"use client";

import { useRef } from "react";

import {
  type AMapGeocoderInstance,
  type AMapMapInstance,
  type LocationDraft,
} from "../lib/map-panel";
import type { LocationFilterState, RecordItem } from "../lib/types";
import { MapDrilldownCard } from "./map-drilldown-card";
import { MapPanelHeader } from "./map-panel-header";
import { MapSearchForm } from "./map-search-form";
import { MapStatusNotices } from "./map-status-notices";
import { MappedRecordsList } from "./mapped-records-list";
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
  const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY;
  const {
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
  } = useMapPanelController({
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
    draftCoordinates,
    draftLocation,
    geocoderRef,
    mappedRecords,
    mapRef,
    onDraftLocationChange,
    onSelectRecord,
    selectedRecordId,
    setLoadError,
  });

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
      <MapPanelHeader
        confirmedCount={confirmedCount}
        isEditable={isEditable}
        mappedCount={mappedRecords.length}
        needsReviewCount={needsReviewCount}
      />
      <MapDrilldownCard
        filterDraft={filterDraft}
        filteringRecords={filteringRecords}
        onApplyFilter={handleApplyFilter}
        onClearFilter={handleClearFilter}
        onFilterDraftChange={setFilterDraft}
        onUseMappedOnly={handleUseMappedOnly}
      />
      {isEditable ? (
        <MapSearchForm
          onSearchQueryChange={setSearchQuery}
          onSubmit={handleSearch}
          searchQuery={searchQuery}
          searching={searching}
        />
      ) : null}
      <MapStatusNotices
        draftCoordinates={draftCoordinates}
        draftLocation={draftLocation}
        isEditable={isEditable}
        loadError={loadError}
        mappedRecordCount={mappedRecords.length}
        searchError={searchError}
      />
      <div className="map-canvas" ref={containerRef} />
      <MappedRecordsList
        mappedRecords={mappedRecords}
        onSelectRecord={onSelectRecord}
        selectedRecordId={selectedRecordId}
      />
    </section>
  );
}

