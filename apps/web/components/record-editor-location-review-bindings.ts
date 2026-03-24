"use client";

import type { Dispatch, SetStateAction } from "react";

import type { LocationReviewFormState } from "../lib/record-panel-forms";

export function createLocationReviewBindings(
  setLocationReviewForm: Dispatch<SetStateAction<LocationReviewFormState>>,
) {
  return {
    onMarkConfirmed() {
      setLocationReviewForm((prev) => ({
        ...prev,
        status: "confirmed",
      }));
    },
    onMarkNeedsReview() {
      setLocationReviewForm((prev) => ({
        ...prev,
        status: "needs_review",
      }));
    },
    onNoteChange(value: string) {
      setLocationReviewForm((prev) => ({
        ...prev,
        note: value,
      }));
    },
    onResetReview() {
      setLocationReviewForm({
        status: "pending",
        note: "",
      });
    },
    onStatusChange(value: string) {
      setLocationReviewForm((prev) => ({
        ...prev,
        status: value,
      }));
    },
  };
}
