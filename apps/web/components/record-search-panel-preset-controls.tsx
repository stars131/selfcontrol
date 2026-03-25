"use client";

import type { RecordSearchPanelPresetControlsProps } from "./record-search-panel-preset-controls.types";

export function RecordSearchPanelPresetControls({
  canWriteWorkspace,
  onPresetNameChange,
  onSavePreset,
  panelCopy,
  presetName,
  savingSearchPreset,
}: RecordSearchPanelPresetControlsProps) {
  return (
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
  );
}
