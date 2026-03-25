"use client";

import type { MappedRecordsListProps } from "./mapped-records-list.types";

export function MappedRecordsList({
  mappedRecords,
  onSelectRecord,
  selectedRecordId,
}: MappedRecordsListProps) {
  if (!mappedRecords.length) {
    return null;
  }

  return (
    <div className="record-list compact-list" style={{ marginTop: 12 }}>
      {mappedRecords.slice(0, 8).map((record) => (
        <button
          className={`record-card selectable-card ${record.id === selectedRecordId ? "selected" : ""}`}
          key={record.id}
          type="button"
          onClick={() => onSelectRecord(record.id)}
        >
          <div className="eyebrow">{record.reviewStatus}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{record.placeName}</div>
          {record.address ? (
            <div className="muted" style={{ marginTop: 8 }}>
              {record.address}
            </div>
          ) : null}
          <div className="muted" style={{ marginTop: 8 }}>
            {record.latitude.toFixed(5)}, {record.longitude.toFixed(5)}
          </div>
        </button>
      ))}
    </div>
  );
}
