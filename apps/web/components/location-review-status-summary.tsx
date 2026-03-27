"use client";

import { LocationReviewStatusCard } from "./location-review-status-card";
import type { LocationReviewStatusSummaryProps } from "./location-review-status-summary.types";

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
      <LocationReviewStatusCard
        label={panelCopy.storedStatus}
        value={formatReviewStatusLabel(selectedLocationReview.status)}
      />
      <LocationReviewStatusCard
        label={panelCopy.lastUpdated}
        value={formatHistoryTimestampLabel(selectedLocationReview.updated_at)}
      />
      <LocationReviewStatusCard
        label={panelCopy.confirmedAt}
        value={
          selectedLocationReview.confirmed_at
            ? formatHistoryTimestampLabel(selectedLocationReview.confirmed_at)
            : panelCopy.notConfirmed
        }
      />
    </div>
  );
}
