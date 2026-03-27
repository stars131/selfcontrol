"use client";

import type { LocationReviewStatusSelectProps } from "./location-review-status-select.types";

export function LocationReviewStatusSelect({
  canWriteWorkspace,
  onStatusChange,
  panelCopy,
  reviewForm,
}: LocationReviewStatusSelectProps) {
  return (
    <label className="field">
      <span className="field-label">{panelCopy.reviewStatus}</span>
      <select
        className="input"
        disabled={!canWriteWorkspace}
        value={reviewForm.status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="pending">{panelCopy.pending}</option>
        <option value="confirmed">{panelCopy.confirmed}</option>
        <option value="needs_review">{panelCopy.needsReview}</option>
      </select>
    </label>
  );
}
