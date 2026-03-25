"use client";

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
      <div className="eyebrow">Map drill-down</div>
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">Place query</span>
          <input
            className="input"
            value={filterDraft.placeQuery}
            onChange={(event) =>
              onFilterDraftChange((current) => ({
                ...current,
                placeQuery: event.target.value,
              }))
            }
            placeholder="Soup House / address / landmark"
          />
        </label>
        <label className="field">
          <span className="field-label">Map status</span>
          <select
            className="input"
            value={filterDraft.mappedOnly}
            onChange={(event) =>
              onFilterDraftChange((current) => ({
                ...current,
                mappedOnly: event.target.value as MapDrilldownCardProps["filterDraft"]["mappedOnly"],
              }))
            }
          >
            <option value="all">all records</option>
            <option value="mapped">mapped only</option>
            <option value="unmapped">unmapped only</option>
          </select>
        </label>
        <label className="field">
          <span className="field-label">Review</span>
          <select
            className="input"
            value={filterDraft.reviewStatus}
            onChange={(event) =>
              onFilterDraftChange((current) => ({
                ...current,
                reviewStatus: event.target.value as MapDrilldownCardProps["filterDraft"]["reviewStatus"],
              }))
            }
          >
            <option value="all">all</option>
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="needs_review">needs_review</option>
          </select>
        </label>
      </div>
      <div className="action-row">
        <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onApplyFilter()}>
          {filteringRecords ? "Filtering..." : "Apply location filter"}
        </button>
        <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onUseMappedOnly()}>
          Mapped only
        </button>
        <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onClearFilter()}>
          Clear location filter
        </button>
      </div>
    </div>
  );
}
