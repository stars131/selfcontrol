"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import { MapDrilldownCardActions } from "./map-drilldown-card-actions";
import { MapDrilldownCardFields } from "./map-drilldown-card-fields";
import { MapDrilldownCardIntro } from "./map-drilldown-card-intro";
import type { MapDrilldownCardProps } from "./map-drilldown-card.types";

export function MapDrilldownCard({
  filterDraft,
  filteringRecords,
  onApplyFilter,
  onClearFilter,
  onFilterDraftChange,
  onUseMappedOnly,
}: MapDrilldownCardProps) {
  const { locale } = useStoredLocale();
  const { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <div className="record-card form-stack" style={{ marginTop: 12 }}>
      <MapDrilldownCardIntro title={panelCopy.mapDrilldown} />
      <MapDrilldownCardFields allLabel={panelCopy.all} allRecordsLabel={panelCopy.allRecords} confirmedLabel={panelCopy.confirmed} filterDraft={filterDraft} mapStatusLabel={panelCopy.mapStatus} mappedOnlyLabel={panelCopy.mappedOnly} needsReviewLabel={panelCopy.needsReview} onFilterDraftChange={onFilterDraftChange} pendingLabel={panelCopy.pending} placeQueryLabel={panelCopy.placeQuery} placeQueryPlaceholder={panelCopy.placeQueryPlaceholder} reviewStatusLabel={panelCopy.reviewStatus} unmappedOnlyLabel={panelCopy.unmappedOnly} />
      <MapDrilldownCardActions applyLocationFilterLabel={panelCopy.applyLocationFilter} clearLocationFilterLabel={panelCopy.clearLocationFilter} filteringLabel={panelCopy.filtering} filteringRecords={filteringRecords} mappedOnlyLabel={panelCopy.mappedOnly} onApplyFilter={onApplyFilter} onClearFilter={onClearFilter} onUseMappedOnly={onUseMappedOnly} />
    </div>
  );
}
