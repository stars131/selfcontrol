"use client";

import type { LocationReviewNoteFieldProps } from "./location-review-note-field.types";

export function LocationReviewNoteField({
  canWriteWorkspace,
  onNoteChange,
  panelCopy,
  reviewForm,
}: LocationReviewNoteFieldProps) {
  return (
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
  );
}
