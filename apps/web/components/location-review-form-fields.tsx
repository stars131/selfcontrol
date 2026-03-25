"use client";

import type { LocationReviewFormFieldsProps } from "./location-review-form-fields.types";

export function LocationReviewFormFields({
  canWriteWorkspace,
  onNoteChange,
  onStatusChange,
  panelCopy,
  reviewForm,
}: LocationReviewFormFieldsProps) {
  return (
    <div className="inline-fields">
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
      <label className="field" style={{ gridColumn: "span 2" }}>
        <span className="field-label">{panelCopy.reviewNote}</span>
        <input
          className="input"
          disabled={!canWriteWorkspace}
          value={reviewForm.note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder={panelCopy.reviewNotePlaceholder}
        />
      </label>
    </div>
  );
}
