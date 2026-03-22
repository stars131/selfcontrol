"use client";

import type { RecordFilterState, SearchPresetItem } from "../lib/types";

type SearchPresetListProps = {
  presets: SearchPresetItem[];
  filteringRecords: boolean;
  canWriteWorkspace: boolean;
  savedPresetLabel: string;
  applyPresetLabel: string;
  deletePresetLabel: string;
  emptyLabel: string;
  summarizeRecordFilterLabel: (filter: RecordFilterState) => string;
  onApplyPreset: (filter: RecordFilterState) => Promise<void>;
  onDeletePreset: (presetId: string) => Promise<void>;
};

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
