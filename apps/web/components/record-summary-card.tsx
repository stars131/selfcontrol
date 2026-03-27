"use client";

import { buildRecordSummaryCardDerivedState } from "./record-summary-card-derived";
import type { RecordSummaryCardProps } from "./record-summary-card.types";

export function RecordSummaryCard({
  record,
  isSelected,
  untitledRecordLabel,
  noContentLabel,
  unknownPlaceLabel,
  ratingPrefixLabel,
  avoidLabel,
  formatRecordSourceLabel,
  formatRecordStatusLabel,
  mapPrefixLabel,
  formatRecordTimestampLabel,
  formatRecordTypeLabel,
  formatReviewStatusLabel,
  onSelectRecord,
}: RecordSummaryCardProps) {
  const derivedState = buildRecordSummaryCardDerivedState({
    formatReviewStatusLabel,
    mapPrefixLabel,
    record,
    unknownPlaceLabel,
  });

  return (
    <article
      className={`record-card selectable-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelectRecord(record.id)}
    >
      <div className="eyebrow">{formatRecordTypeLabel(record.type_code)}</div>
      <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{record.title || untitledRecordLabel}</h3>
      <div className="muted">
        {formatRecordTimestampLabel(record)} | {formatRecordSourceLabel(record.source_type)}
      </div>
      <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.content || noContentLabel}</p>
      {derivedState.showLocation ? (
        <div className="muted" style={{ marginTop: 10 }}>
          {derivedState.locationLabel}
          {derivedState.locationAddressSuffix}
        </div>
      ) : null}
      <div className="tag-row">
        <span className="tag">{formatRecordStatusLabel(record.status)}</span>
        {record.rating ? <span className="tag">{ratingPrefixLabel} {record.rating}</span> : null}
        {record.is_avoid ? <span className="tag">{avoidLabel}</span> : null}
        {derivedState.mapStatusLabel ? <span className="tag">{derivedState.mapStatusLabel}</span> : null}
      </div>
    </article>
  );
}
