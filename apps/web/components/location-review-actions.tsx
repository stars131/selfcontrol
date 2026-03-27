"use client";

import { LocationReviewActionButtons } from "./location-review-action-buttons";
import type { LocationReviewActionsProps } from "./location-review-actions.types";

export function LocationReviewActions({
  canWriteWorkspace,
  onMarkConfirmed,
  onMarkNeedsReview,
  onResetReview,
  panelCopy,
}: LocationReviewActionsProps) {
  return <LocationReviewActionButtons canWriteWorkspace={canWriteWorkspace} onMarkConfirmed={onMarkConfirmed} onMarkNeedsReview={onMarkNeedsReview} onResetReview={onResetReview} panelCopy={panelCopy} />;
}
