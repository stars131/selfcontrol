"use client";

import type { SearchPresetListProps } from "./search-preset-list.types";

export function SearchPresetList({
  presets,
  filteringRecords,
  canWriteWorkspace,
  savedPresetLabel,
  applyPresetLabel,
  deletePresetLabel,
  emptyLabel,
  summarizeRecordFilterLabel,
  onApplyPreset,
  onDeletePreset,
}: SearchPresetListProps) {
  if (!presets.length) {
    return <div className="notice">{emptyLabel}</div>;
  }

  return (
    <div className="record-list compact-list">
      {presets.map((preset) => (
        <article className="record-card" key={preset.id}>
          <div className="eyebrow">{savedPresetLabel}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{preset.name}</div>
          <div className="muted" style={{ marginTop: 8 }}>
            {summarizeRecordFilterLabel(preset.filters)}
          </div>
          <div className="action-row" style={{ marginTop: 12 }}>
            <button
              className="button secondary"
              disabled={filteringRecords}
              type="button"
              onClick={() => void onApplyPreset(preset.filters)}
            >
              {applyPresetLabel}
            </button>
            {canWriteWorkspace ? (
              <button className="button secondary" type="button" onClick={() => void onDeletePreset(preset.id)}>
                {deletePresetLabel}
              </button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
