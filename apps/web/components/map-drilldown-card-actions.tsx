"use client";

import type { MapDrilldownCardActionsProps } from "./map-drilldown-card-actions.types";

export function MapDrilldownCardActions({ filteringRecords, onApplyFilter, onClearFilter, onUseMappedOnly }: MapDrilldownCardActionsProps) {
  return <div className="action-row"><button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onApplyFilter()}>{filteringRecords ? "Filtering..." : "Apply location filter"}</button><button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onUseMappedOnly()}>Mapped only</button><button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onClearFilter()}>Clear location filter</button></div>;
}
