"use client";

import { RecordSearchPanelActions } from "./record-search-panel-actions";
import { RecordSearchPanelFilterFields } from "./record-search-panel-filter-fields";
import { RecordSearchPanelPresetControls } from "./record-search-panel-preset-controls";
import { RecordSearchPanelSummary } from "./record-search-panel-summary";
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
      <RecordSearchPanelActions
        filteringRecords={filteringRecords}
        onApplyFilter={onApplyFilter}
        onResetFilter={onResetFilter}
        panelCopy={panelCopy}
      />
      <RecordSearchPanelSummary currentFilterSummary={currentFilterSummary} />
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
