"use client";

import type { LocationReviewActionButtonsProps } from "./location-review-action-buttons.types";

export function LocationReviewActionButtons({
  canWriteWorkspace,
  onMarkConfirmed,
  onMarkNeedsReview,
  onResetReview,
  panelCopy,
}: LocationReviewActionButtonsProps) {
  return (
    <div className="action-row">
      <button className="button secondary" type="button" disabled={!canWriteWorkspace} onClick={onMarkConfirmed}>
        {panelCopy.markConfirmed}
      </button>
      <button className="button secondary" type="button" disabled={!canWriteWorkspace} onClick={onMarkNeedsReview}>
        {panelCopy.markNeedsReview}
      </button>
      <button className="button secondary" type="button" disabled={!canWriteWorkspace} onClick={onResetReview}>
        {panelCopy.resetReview}
      </button>
    </div>
  );
}
