"use client";

import type { MapDrilldownCardActionsProps } from "./map-drilldown-card-actions.types";

export function MapDrilldownCardActions({ applyLocationFilterLabel, clearLocationFilterLabel, filteringLabel, filteringRecords, mappedOnlyLabel, onApplyFilter, onClearFilter, onUseMappedOnly }: MapDrilldownCardActionsProps) {
  return <div className="action-row"><button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onApplyFilter()}>{filteringRecords ? filteringLabel : applyLocationFilterLabel}</button><button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onUseMappedOnly()}>{mappedOnlyLabel}</button><button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onClearFilter()}>{clearLocationFilterLabel}</button></div>;
}
