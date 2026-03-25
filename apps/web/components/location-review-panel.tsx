"use client";

import { LocationReviewActions } from "./location-review-actions";
import { LocationReviewFormFields } from "./location-review-form-fields";
import { LocationReviewHistoryList } from "./location-review-history-list";
import { LocationReviewStatusSummary } from "./location-review-status-summary";
import type { LocationReviewPanelProps } from "./location-review-panel.types";

export function LocationReviewPanel({
  panelCopy,
  canWriteWorkspace,
  hasSelectedRecord,
  reviewForm,
  selectedLocationReview,
  selectedLocationHistory,
  formatReviewStatusLabel,
  formatHistoryTimestampLabel,
  summarizeHistoryActionLabel,
  onStatusChange,
  onNoteChange,
  onMarkConfirmed,
  onMarkNeedsReview,
  onResetReview,
}: LocationReviewPanelProps) {
  return (
    <div className="record-card form-stack">
      <div className="eyebrow">{panelCopy.locationReview}</div>
      <div className="muted">{panelCopy.locationReviewDescription}</div>
      <LocationReviewFormFields
        canWriteWorkspace={canWriteWorkspace}
        onNoteChange={onNoteChange}
        onStatusChange={onStatusChange}
        panelCopy={panelCopy}
        reviewForm={reviewForm}
      />
      <LocationReviewActions
        canWriteWorkspace={canWriteWorkspace}
        onMarkConfirmed={onMarkConfirmed}
        onMarkNeedsReview={onMarkNeedsReview}
        onResetReview={onResetReview}
        panelCopy={panelCopy}
      />
      {hasSelectedRecord ? (
        <LocationReviewStatusSummary
          formatHistoryTimestampLabel={formatHistoryTimestampLabel}
          formatReviewStatusLabel={formatReviewStatusLabel}
          panelCopy={panelCopy}
          selectedLocationReview={selectedLocationReview}
        />
      ) : null}
      {hasSelectedRecord ? (
        <LocationReviewHistoryList
          formatHistoryTimestampLabel={formatHistoryTimestampLabel}
          formatReviewStatusLabel={formatReviewStatusLabel}
          panelCopy={panelCopy}
          selectedLocationHistory={selectedLocationHistory}
          summarizeHistoryActionLabel={summarizeHistoryActionLabel}
        />
      ) : null}
    </div>
  );
}
