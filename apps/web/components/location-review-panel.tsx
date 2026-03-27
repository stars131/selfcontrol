"use client";

import { LocationReviewActions } from "./location-review-actions";
import { LocationReviewDetails } from "./location-review-details";
import { LocationReviewFormFields } from "./location-review-form-fields";
import { LocationReviewIntro } from "./location-review-intro";
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
      <LocationReviewIntro panelCopy={panelCopy} />
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
      <LocationReviewDetails
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        formatReviewStatusLabel={formatReviewStatusLabel}
        hasSelectedRecord={hasSelectedRecord}
        panelCopy={panelCopy}
        selectedLocationHistory={selectedLocationHistory}
        selectedLocationReview={selectedLocationReview}
        summarizeHistoryActionLabel={summarizeHistoryActionLabel}
      />
    </div>
  );
}
