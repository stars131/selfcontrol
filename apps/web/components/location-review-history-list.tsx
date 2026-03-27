"use client";

import { LocationReviewHistoryItem } from "./location-review-history-item";
import type { LocationReviewHistoryListProps } from "./location-review-history-list.types";

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
          <LocationReviewHistoryItem
            entry={entry}
            formatHistoryTimestampLabel={formatHistoryTimestampLabel}
            formatReviewStatusLabel={formatReviewStatusLabel}
            key={`${entry.changed_at}-${entry.action_code}`}
            panelCopy={panelCopy}
            summarizeHistoryActionLabel={summarizeHistoryActionLabel}
          />
        ))
      ) : (
        <div className="notice">{panelCopy.noLocationHistory}</div>
      )}
    </div>
  );
}
