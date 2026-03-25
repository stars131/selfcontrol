"use client";

import type { LocationReviewActionsProps } from "./location-review-actions.types";

export function LocationReviewActions({
  canWriteWorkspace,
  onMarkConfirmed,
  onMarkNeedsReview,
  onResetReview,
  panelCopy,
}: LocationReviewActionsProps) {
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
