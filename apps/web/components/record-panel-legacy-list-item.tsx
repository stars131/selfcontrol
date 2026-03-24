"use client";
import type { RecordPanelLegacyListItemProps } from "./record-panel-legacy-list.types";
export function RecordPanelLegacyListItem({ record, selected, onSelectRecord }: RecordPanelLegacyListItemProps) {
  return (
    <article
      className={`record-card selectable-card ${selected ? "selected" : ""}`}
      onClick={() => onSelectRecord(record.id)}
    >
      <div className="eyebrow">{record.type_code}</div>
      <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{record.title || "Untitled"}</h3>
      <div className="muted">
        {record.created_at} 璺?{record.source_type}
      </div>
      <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.content || "No content"}</p>
      <div className="tag-row">
        <span className="tag">{record.status}</span>
        {record.rating ? <span className="tag">rating {record.rating}</span> : null}
        {record.is_avoid ? <span className="tag">avoid</span> : null}
      </div>
    </article>
  );
}
