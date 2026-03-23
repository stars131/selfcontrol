"use client";

import type { RecordItem } from "../lib/types";

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
          <article
            className={`record-card selectable-card ${record.id === selectedRecordId ? "selected" : ""}`}
            key={record.id}
            onClick={() => onSelectRecord(record.id)}
          >
            <div className="eyebrow">{record.type_code}</div>
            <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{record.title || "Untitled"}</h3>
            <div className="muted">
              {record.created_at} 路 {record.source_type}
            </div>
            <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.content || "No content"}</p>
            <div className="tag-row">
              <span className="tag">{record.status}</span>
              {record.rating ? <span className="tag">rating {record.rating}</span> : null}
              {record.is_avoid ? <span className="tag">avoid</span> : null}
            </div>
          </article>
        ))
      ) : (
        <div className="notice">
          No records yet. Save one from the chat panel or create one manually above.
        </div>
      )}
    </div>
  );
}
