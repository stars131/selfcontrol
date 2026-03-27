"use client";

import { getLocationSourceLabel } from "../lib/location-source-display";
import type { LocationReviewHistoryItemProps } from "./location-review-history-item.types";

export function LocationReviewHistoryItem({
  entry,
  formatHistoryTimestampLabel,
  formatReviewStatusLabel,
  panelCopy,
  summarizeHistoryActionLabel,
}: LocationReviewHistoryItemProps) {
  return (
    <article className="history-item">
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">{summarizeHistoryActionLabel(entry)}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {entry.place_name || entry.address || panelCopy.unnamedLocation}
          </div>
        </div>
        <div className="muted">{formatHistoryTimestampLabel(entry.changed_at)}</div>
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        {entry.address || panelCopy.noAddress}
      </div>
      {(entry.latitude ?? null) !== null && (entry.longitude ?? null) !== null ? (
        <div className="muted" style={{ marginTop: 8 }}>
          {entry.latitude}, {entry.longitude}
        </div>
      ) : null}
      <div className="tag-row">
        {entry.source ? <span className="tag">{getLocationSourceLabel(entry.source, panelCopy)}</span> : null}
        {entry.review_status ? <span className="tag">{formatReviewStatusLabel(entry.review_status)}</span> : null}
      </div>
      {entry.review_note ? (
        <div className="muted" style={{ marginTop: 8 }}>
          {entry.review_note}
        </div>
      ) : null}
    </article>
  );
}
