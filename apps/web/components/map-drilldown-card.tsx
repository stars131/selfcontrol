"use client";

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
  return (
    <div className="record-card form-stack" style={{ marginTop: 12 }}>
      <MapDrilldownCardIntro />
      <MapDrilldownCardFields filterDraft={filterDraft} onFilterDraftChange={onFilterDraftChange} />
      <MapDrilldownCardActions filteringRecords={filteringRecords} onApplyFilter={onApplyFilter} onClearFilter={onClearFilter} onUseMappedOnly={onUseMappedOnly} />
    </div>
  );
}
