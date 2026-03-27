"use client";

import type { SearchPresetListItemProps } from "./search-preset-list-item.types";

export function SearchPresetListItem({
  applyPresetLabel,
  canWriteWorkspace,
  deletePresetLabel,
  filteringRecords,
  onApplyPreset,
  onDeletePreset,
  preset,
  savedPresetLabel,
  summarizeRecordFilterLabel,
}: SearchPresetListItemProps) {
  return (
    <article className="record-card">
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
  );
}
