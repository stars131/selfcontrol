"use client";

import type { MapSearchFormProps } from "./map-search-form.types";

export function MapSearchForm({
  onSearchQueryChange,
  onSubmit,
  searchActionLabel,
  searchLabel,
  searchPlaceholder,
  searchQuery,
  searching,
  searchingLabel,
}: MapSearchFormProps) {
  return (
    <form className="composer" style={{ marginTop: 12 }} onSubmit={onSubmit}>
      <div className="inline-fields">
        <label className="field" style={{ gridColumn: "span 2" }}>
          <span className="field-label">{searchLabel}</span>
          <input
            className="input"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder={searchPlaceholder}
          />
        </label>
        <div className="field" style={{ alignSelf: "end" }}>
          <button className="button secondary" disabled={searching || !searchQuery.trim()} type="submit">
            {searching ? searchingLabel : searchActionLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
