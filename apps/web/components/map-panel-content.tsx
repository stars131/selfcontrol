"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import { MapDrilldownCard } from "./map-drilldown-card";
import { MapPanelHeader } from "./map-panel-header";
import { MapSearchForm } from "./map-search-form";
import { MapStatusNotices } from "./map-status-notices";
import { MappedRecordsList } from "./mapped-records-list";
import type { MapPanelContentProps } from "./map-panel-content.types";

export function MapPanelContent({
  containerRef,
  controller,
  draftLocation,
  onSelectRecord,
  selectedRecordId,
}: MapPanelContentProps) {
  const { locale } = useStoredLocale();
  const { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <section className="record-card" style={{ marginTop: 20 }}>
      <MapPanelHeader
        confirmedCount={controller.confirmedCount}
        confirmedCountLabel={panelCopy.confirmedCountLabel}
        editableDescription={panelCopy.mapEditableDescription}
        isEditable={controller.isEditable}
        mappedCount={controller.mappedRecords.length}
        mappedCountLabel={panelCopy.mappedCountLabel}
        needsReviewCount={controller.needsReviewCount}
        needsReviewCountLabel={panelCopy.needsReviewCountLabel}
        readonlyDescription={panelCopy.mapReadonlyDescription}
        title={panelCopy.mapTitle}
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
          searchActionLabel={panelCopy.searchPlace}
          searchLabel={panelCopy.locationSearch}
          searchPlaceholder={panelCopy.locationSearchPlaceholder}
          searchingLabel={panelCopy.searchingPlace}
          onSearchQueryChange={controller.setSearchQuery}
          onSubmit={controller.handleSearch}
          searchQuery={controller.searchQuery}
          searching={controller.searching}
        />
      ) : null}
      <MapStatusNotices
        currentPointLabel={panelCopy.currentPoint}
        draftCoordinates={controller.draftCoordinates}
        draftLocation={draftLocation}
        isEditable={controller.isEditable}
        loadError={controller.loadError}
        mappedRecordCount={controller.mappedRecords.length}
        noLocationSelectedLabel={panelCopy.noLocationSelected}
        noMappedRecordsLabel={panelCopy.noMappedRecords}
        searchError={controller.searchError}
      />
      <div className="map-canvas" ref={containerRef} />
      <MappedRecordsList
        confirmedLabel={panelCopy.confirmed}
        mappedRecords={controller.mappedRecords}
        needsReviewLabel={panelCopy.needsReview}
        onSelectRecord={onSelectRecord}
        pendingLabel={panelCopy.pending}
        selectedRecordId={selectedRecordId}
      />
    </section>
  );
}
