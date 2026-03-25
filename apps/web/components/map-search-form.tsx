"use client";

import type { MapSearchFormProps } from "./map-search-form.types";

export function MapSearchForm({
  onSearchQueryChange,
  onSubmit,
  searchQuery,
  searching,
}: MapSearchFormProps) {
  return (
    <form className="composer" style={{ marginTop: 12 }} onSubmit={onSubmit}>
      <div className="inline-fields">
        <label className="field" style={{ gridColumn: "span 2" }}>
          <span className="field-label">Location search</span>
          <input
            className="input"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Search by shop name, address, or landmark"
          />
        </label>
        <div className="field" style={{ alignSelf: "end" }}>
          <button className="button secondary" disabled={searching || !searchQuery.trim()} type="submit">
            {searching ? "Searching..." : "Search place"}
          </button>
        </div>
      </div>
    </form>
  );
}
