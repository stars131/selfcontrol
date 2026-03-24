"use client";
import { RecordPanelLegacyListEmpty } from "./record-panel-legacy-list-empty";
import { RecordPanelLegacyListItem } from "./record-panel-legacy-list-item";
import type { RecordPanelLegacyListProps } from "./record-panel-legacy-list.types";
export function RecordPanelLegacyList({ records, selectedRecordId, onSelectRecord }: RecordPanelLegacyListProps) {
  return (
    <div style={{ marginTop: 20 }} className="record-list">
      {records.length ? (
        records.map((record) => (
          <RecordPanelLegacyListItem
            key={record.id}
            onSelectRecord={onSelectRecord}
            record={record}
            selected={record.id === selectedRecordId}
          />
        ))
      ) : (
        <RecordPanelLegacyListEmpty />
      )}
    </div>
  );
}
