"use client";

import { RecordSearchPanelFilterFields } from "./record-search-panel-filter-fields";
import { RecordSearchPanelPresetControls } from "./record-search-panel-preset-controls";
import type { RecordSearchPanelProps } from "./record-search-panel.types";

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
      <RecordSearchPanelFilterFields
        filterDraft={filterDraft}
        onAvoidOnlyChange={onAvoidOnlyChange}
        onQueryChange={onQueryChange}
        onTypeCodeChange={onTypeCodeChange}
        panelCopy={panelCopy}
      />
      <div className="action-row">
        <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onApplyFilter()}>
          {filteringRecords ? panelCopy.filtering : panelCopy.applyAdvancedFilter}
        </button>
        <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onResetFilter()}>
          {panelCopy.resetList}
        </button>
      </div>
      <div className="muted">{currentFilterSummary}</div>
      <RecordSearchPanelPresetControls
        canWriteWorkspace={canWriteWorkspace}
        onPresetNameChange={onPresetNameChange}
        onSavePreset={onSavePreset}
        panelCopy={panelCopy}
        presetName={presetName}
        savingSearchPreset={savingSearchPreset}
      />
    </div>
  );
}
