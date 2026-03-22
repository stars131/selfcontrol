"use client";

import type { PanelCopy } from "../lib/record-panel-ui";
import type { RecordFilterState } from "../lib/types";

type RecordSearchPanelProps = {
  panelCopy: PanelCopy;
  canWriteWorkspace: boolean;
  filteringRecords: boolean;
  savingSearchPreset: boolean;
  filterDraft: RecordFilterState;
  presetName: string;
  currentFilterSummary: string;
  onQueryChange: (value: string) => void;
  onTypeCodeChange: (value: string) => void;
  onAvoidOnlyChange: (value: RecordFilterState["avoidOnly"]) => void;
  onPresetNameChange: (value: string) => void;
  onApplyFilter: () => Promise<void>;
  onResetFilter: () => Promise<void>;
  onSavePreset: () => Promise<void>;
};

export function RecordSearchPanel({
  panelCopy,
  canWriteWorkspace,
  filteringRecords,
  savingSearchPreset,
  filterDraft,
  presetName,
  currentFilterSummary,
  onQueryChange,
  onTypeCodeChange,
  onAvoidOnlyChange,
  onPresetNameChange,
  onApplyFilter,
  onResetFilter,
  onSavePreset,
}: RecordSearchPanelProps) {
  return (
    <div className="record-card form-stack" style={{ marginTop: 20 }}>
      <div className="eyebrow">{panelCopy.advancedSearch}</div>
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
            onChange={(event) => onAvoidOnlyChange(event.target.value as RecordFilterState["avoidOnly"])}
          >
            <option value="all">{panelCopy.allRecords}</option>
            <option value="avoid">{panelCopy.avoidOnlyOption}</option>
            <option value="normal">{panelCopy.nonAvoidOnly}</option>
          </select>
        </label>
      </div>
      <div className="action-row">
        <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onApplyFilter()}>
          {filteringRecords ? panelCopy.filtering : panelCopy.applyAdvancedFilter}
        </button>
        <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onResetFilter()}>
          {panelCopy.resetList}
        </button>
      </div>
      <div className="muted">{currentFilterSummary}</div>
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">{panelCopy.presetName}</span>
          <input
            className="input"
            disabled={!canWriteWorkspace}
            value={presetName}
            onChange={(event) => onPresetNameChange(event.target.value)}
            placeholder={panelCopy.presetPlaceholder}
          />
        </label>
        <div className="field" style={{ alignSelf: "end" }}>
          <button
            className="button secondary"
            disabled={savingSearchPreset || !canWriteWorkspace}
            type="button"
            onClick={() => void onSavePreset()}
          >
            {savingSearchPreset ? panelCopy.savingPreset : panelCopy.saveCurrentFilter}
          </button>
        </div>
      </div>
    </div>
  );
}
