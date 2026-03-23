"use client";

import type { LocationReviewPanelProps } from "./location-review-panel.types";

type LocationReviewHistoryListProps = Pick<
  LocationReviewPanelProps,
  | "formatHistoryTimestampLabel"
  | "formatReviewStatusLabel"
  | "panelCopy"
  | "selectedLocationHistory"
  | "summarizeHistoryActionLabel"
>;

export function LocationReviewHistoryList({
  formatHistoryTimestampLabel,
  formatReviewStatusLabel,
  panelCopy,
  selectedLocationHistory,
  summarizeHistoryActionLabel,
}: LocationReviewHistoryListProps) {
  return (
    <div className="history-list">
      {selectedLocationHistory.length ? (
        selectedLocationHistory.slice(0, 6).map((entry) => (
          <article className="history-item" key={`${entry.changed_at}-${entry.action_code}`}>
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
              {entry.source ? <span className="tag">{entry.source}</span> : null}
              {entry.review_status ? <span className="tag">{formatReviewStatusLabel(entry.review_status)}</span> : null}
            </div>
            {entry.review_note ? (
              <div className="muted" style={{ marginTop: 8 }}>
                {entry.review_note}
              </div>
            ) : null}
          </article>
        ))
      ) : (
        <div className="notice">{panelCopy.noLocationHistory}</div>
      )}
    </div>
  );
}
