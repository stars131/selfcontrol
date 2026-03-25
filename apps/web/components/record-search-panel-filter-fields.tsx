"use client";

import type { RecordSearchPanelFilterFieldsProps } from "./record-search-panel-filter-fields.types";

export function RecordSearchPanelFilterFields({
  filterDraft,
  onAvoidOnlyChange,
  onQueryChange,
  onTypeCodeChange,
  panelCopy,
}: RecordSearchPanelFilterFieldsProps) {
  return (
    <div className="inline-fields">
      <label className="field">
        <span className="field-label">{panelCopy.textQuery}</span>
        <input
          className="input"
          value={filterDraft.query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={panelCopy.textQueryPlaceholder}
        />
      </label>
      <label className="field">
        <span className="field-label">{panelCopy.type}</span>
        <select
          className="input"
          value={filterDraft.typeCode}
          onChange={(event) => onTypeCodeChange(event.target.value)}
        >
          <option value="all">{panelCopy.all}</option>
          <option value="memo">{panelCopy.memo}</option>
          <option value="food">{panelCopy.food}</option>
          <option value="snack">{panelCopy.snack}</option>
          <option value="bad_experience">{panelCopy.badExperience}</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">{panelCopy.avoid}</span>
        <select
          className="input"
          value={filterDraft.avoidOnly}
          onChange={(event) =>
            onAvoidOnlyChange(
              event.target.value as RecordSearchPanelFilterFieldsProps["filterDraft"]["avoidOnly"],
            )
          }
        >
          <option value="all">{panelCopy.allRecords}</option>
          <option value="avoid">{panelCopy.avoidOnlyOption}</option>
          <option value="normal">{panelCopy.nonAvoidOnly}</option>
        </select>
      </label>
    </div>
  );
}
