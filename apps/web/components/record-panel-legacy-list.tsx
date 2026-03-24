"use client";

import type { RecordItem } from "../lib/types";
import { RecordPanelLegacyListEmpty } from "./record-panel-legacy-list-empty";
import { RecordPanelLegacyListItem } from "./record-panel-legacy-list-item";

export function RecordPanelLegacyList({
  records,
  selectedRecordId,
  onSelectRecord,
}: {
  records: RecordItem[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string) => void;
}) {
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
