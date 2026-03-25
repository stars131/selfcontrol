"use client";

import { readLocationReview } from "../lib/location";
import { readLocationForm } from "../lib/record-panel-forms";
import type { RecordSummaryCardProps } from "./record-summary-card.types";

export function RecordSummaryCard({
  record,
  isSelected,
  untitledRecordLabel,
  noContentLabel,
  unknownPlaceLabel,
  ratingPrefixLabel,
  avoidLabel,
  mapPrefixLabel,
  formatRecordTimestampLabel,
  formatReviewStatusLabel,
  onSelectRecord,
}: RecordSummaryCardProps) {
  const location = readLocationForm(record);
  const review = readLocationReview(record.extra_data);

  return (
    <article
      className={`record-card selectable-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelectRecord(record.id)}
    >
      <div className="eyebrow">{record.type_code}</div>
      <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{record.title || untitledRecordLabel}</h3>
      <div className="muted">
        {formatRecordTimestampLabel(record)} | {record.source_type}
      </div>
      <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.content || noContentLabel}</p>
      {location.place_name || location.address ? (
        <div className="muted" style={{ marginTop: 10 }}>
          {location.place_name || unknownPlaceLabel}
          {location.address ? ` | ${location.address}` : ""}
        </div>
      ) : null}
      <div className="tag-row">
        <span className="tag">{record.status}</span>
        {record.rating ? <span className="tag">{ratingPrefixLabel} {record.rating}</span> : null}
        {record.is_avoid ? <span className="tag">{avoidLabel}</span> : null}
        {location.latitude && location.longitude ? (
          <span className="tag">{mapPrefixLabel} {formatReviewStatusLabel(review?.status)}</span>
        ) : null}
      </div>
    </article>
  );
}
