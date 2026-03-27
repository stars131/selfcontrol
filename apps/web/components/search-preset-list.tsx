"use client";

import { SearchPresetListItem } from "./search-preset-list-item";
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
        <SearchPresetListItem
          applyPresetLabel={applyPresetLabel}
          canWriteWorkspace={canWriteWorkspace}
          deletePresetLabel={deletePresetLabel}
          filteringRecords={filteringRecords}
          key={preset.id}
          onApplyPreset={onApplyPreset}
          onDeletePreset={onDeletePreset}
          preset={preset}
          savedPresetLabel={savedPresetLabel}
          summarizeRecordFilterLabel={summarizeRecordFilterLabel}
        />
      ))}
    </div>
  );
}
