"use client";

import type { LocationReviewPanelProps } from "./location-review-panel.types";

type LocationReviewStatusSummaryProps = Pick<
  LocationReviewPanelProps,
  | "formatHistoryTimestampLabel"
  | "formatReviewStatusLabel"
  | "panelCopy"
  | "selectedLocationReview"
>;

export function LocationReviewStatusSummary({
  formatHistoryTimestampLabel,
  formatReviewStatusLabel,
  panelCopy,
  selectedLocationReview,
}: LocationReviewStatusSummaryProps) {
  if (!selectedLocationReview) {
    return null;
  }

  return (
    <div className="detail-grid">
      <div className="subtle-card">
        <div className="eyebrow">{panelCopy.storedStatus}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {formatReviewStatusLabel(selectedLocationReview.status)}
        </div>
      </div>
      <div className="subtle-card">
        <div className="eyebrow">{panelCopy.lastUpdated}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {formatHistoryTimestampLabel(selectedLocationReview.updated_at)}
        </div>
      </div>
      <div className="subtle-card">
        <div className="eyebrow">{panelCopy.confirmedAt}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {selectedLocationReview.confirmed_at
            ? formatHistoryTimestampLabel(selectedLocationReview.confirmed_at)
            : panelCopy.notConfirmed}
        </div>
      </div>
    </div>
  );
}
