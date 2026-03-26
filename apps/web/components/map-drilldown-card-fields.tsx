"use client";

import type { MapDrilldownCardFieldsProps } from "./map-drilldown-card-fields.types";
import type { MapDrilldownCardProps } from "./map-drilldown-card.types";

export function MapDrilldownCardFields({ filterDraft, onFilterDraftChange }: MapDrilldownCardFieldsProps) {
  return <div className="inline-fields"><label className="field"><span className="field-label">Place query</span><input className="input" value={filterDraft.placeQuery} onChange={(event) => onFilterDraftChange((current) => ({ ...current, placeQuery: event.target.value }))} placeholder="Soup House / address / landmark" /></label><label className="field"><span className="field-label">Map status</span><select className="input" value={filterDraft.mappedOnly} onChange={(event) => onFilterDraftChange((current) => ({ ...current, mappedOnly: event.target.value as MapDrilldownCardProps["filterDraft"]["mappedOnly"] }))}><option value="all">all records</option><option value="mapped">mapped only</option><option value="unmapped">unmapped only</option></select></label><label className="field"><span className="field-label">Review</span><select className="input" value={filterDraft.reviewStatus} onChange={(event) => onFilterDraftChange((current) => ({ ...current, reviewStatus: event.target.value as MapDrilldownCardProps["filterDraft"]["reviewStatus"] }))}><option value="all">all</option><option value="pending">pending</option><option value="confirmed">confirmed</option><option value="needs_review">needs_review</option></select></label></div>;
}
