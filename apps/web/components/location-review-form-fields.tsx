"use client";

import { LocationReviewNoteField } from "./location-review-note-field";
import { LocationReviewStatusSelect } from "./location-review-status-select";
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
      <LocationReviewStatusSelect
        canWriteWorkspace={canWriteWorkspace}
        onStatusChange={onStatusChange}
        panelCopy={panelCopy}
        reviewForm={reviewForm}
      />
      <LocationReviewNoteField
        canWriteWorkspace={canWriteWorkspace}
        onNoteChange={onNoteChange}
        panelCopy={panelCopy}
        reviewForm={reviewForm}
      />
    </div>
  );
}
