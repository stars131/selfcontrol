"use client";
import { useStoredLocale } from "../lib/locale";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordPanelLegacyListItemProps } from "./record-panel-legacy-list.types";
export function RecordPanelLegacyListItem({ record, selected, onSelectRecord }: RecordPanelLegacyListItemProps) {
  const { locale } = useStoredLocale();
  const detail = getRecordPanelDetailBundle(locale);
  return (
    <article
      className={`record-card selectable-card ${selected ? "selected" : ""}`}
      onClick={() => onSelectRecord(record.id)}
    >
      <div className="eyebrow">{detail.formatRecordTypeLabel(record.type_code)}</div>
      <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{record.title || detail.copy.untitledRecord}</h3>
      <div className="muted">
        {detail.formatRecordTimestampLabel(record)} | {detail.formatRecordSourceLabel(record.source_type)}
      </div>
      <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.content || detail.copy.noContent}</p>
      <div className="tag-row">
        <span className="tag">{detail.formatRecordStatusLabel(record.status)}</span>
        {record.rating ? <span className="tag">{detail.copy.ratingPrefix} {record.rating}</span> : null}
        {record.is_avoid ? <span className="tag">{detail.copy.avoidLabel}</span> : null}
      </div>
    </article>
  );
}
