"use client";

import { LocationReviewHistoryList } from "./location-review-history-list";
import { LocationReviewStatusSummary } from "./location-review-status-summary";
import type { LocationReviewDetailsProps } from "./location-review-details.types";

export function LocationReviewDetails({
  formatHistoryTimestampLabel,
  formatReviewStatusLabel,
  hasSelectedRecord,
  panelCopy,
  selectedLocationHistory,
  selectedLocationReview,
  summarizeHistoryActionLabel,
}: LocationReviewDetailsProps) {
  if (!hasSelectedRecord) {
    return null;
  }

  return (
    <>
      <LocationReviewStatusSummary
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        formatReviewStatusLabel={formatReviewStatusLabel}
        panelCopy={panelCopy}
        selectedLocationReview={selectedLocationReview}
      />
      <LocationReviewHistoryList
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        formatReviewStatusLabel={formatReviewStatusLabel}
        panelCopy={panelCopy}
        selectedLocationHistory={selectedLocationHistory}
        summarizeHistoryActionLabel={summarizeHistoryActionLabel}
      />
    </>
  );
}
