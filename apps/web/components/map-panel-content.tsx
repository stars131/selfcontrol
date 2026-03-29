"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import { MapDrilldownCard } from "./map-drilldown-card";
import { buildMapPanelContentViewProps } from "./map-panel-content-view";
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
  const view = buildMapPanelContentViewProps({
    controller,
    draftLocation,
    onSelectRecord,
    panelCopy,
    selectedRecordId,
  });
  return (
    <section className="record-card" style={{ marginTop: 20 }}>
      <MapPanelHeader {...view.headerProps} />
      <MapDrilldownCard {...view.drilldownCardProps} />
      {view.showSearchForm ? (
        <MapSearchForm {...view.searchFormProps} />
      ) : null}
      <MapStatusNotices {...view.statusNoticesProps} />
      <div className="map-canvas" ref={containerRef} />
      <MappedRecordsList {...view.mappedRecordsListProps} />
    </section>
  );
}
