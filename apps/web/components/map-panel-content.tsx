"use client";

import type { RefObject } from "react";

import type { LocationDraft } from "../lib/map-panel";
import { MapDrilldownCard } from "./map-drilldown-card";
import { MapPanelHeader } from "./map-panel-header";
import { MapSearchForm } from "./map-search-form";
import { MapStatusNotices } from "./map-status-notices";
import { MappedRecordsList } from "./mapped-records-list";
import type { MapPanelControllerState } from "./use-map-panel-controller";

type MapPanelContentProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  controller: MapPanelControllerState;
  draftLocation?: LocationDraft | null;
  onSelectRecord: (recordId: string | null) => void;
  selectedRecordId: string | null;
};

export function MapPanelContent({
  containerRef,
  controller,
  draftLocation,
  onSelectRecord,
  selectedRecordId,
}: MapPanelContentProps) {
  return (
    <section className="record-card" style={{ marginTop: 20 }}>
      <MapPanelHeader
        confirmedCount={controller.confirmedCount}
        isEditable={controller.isEditable}
        mappedCount={controller.mappedRecords.length}
        needsReviewCount={controller.needsReviewCount}
      />
      <MapDrilldownCard
        filterDraft={controller.filterDraft}
        filteringRecords={controller.filteringRecords}
        onApplyFilter={controller.handleApplyFilter}
        onClearFilter={controller.handleClearFilter}
        onFilterDraftChange={controller.setFilterDraft}
        onUseMappedOnly={controller.handleUseMappedOnly}
      />
      {controller.isEditable ? (
        <MapSearchForm
          onSearchQueryChange={controller.setSearchQuery}
          onSubmit={controller.handleSearch}
          searchQuery={controller.searchQuery}
          searching={controller.searching}
        />
      ) : null}
      <MapStatusNotices
        draftCoordinates={controller.draftCoordinates}
        draftLocation={draftLocation}
        isEditable={controller.isEditable}
        loadError={controller.loadError}
        mappedRecordCount={controller.mappedRecords.length}
        searchError={controller.searchError}
      />
      <div className="map-canvas" ref={containerRef} />
      <MappedRecordsList
        mappedRecords={controller.mappedRecords}
        onSelectRecord={onSelectRecord}
        selectedRecordId={selectedRecordId}
      />
    </section>
  );
}
