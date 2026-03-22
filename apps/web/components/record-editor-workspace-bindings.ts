"use client";

import type { Dispatch, SetStateAction } from "react";

import type { LocationReviewFormState, RecordFormState } from "../lib/record-panel-forms";

export function createRecordEditorFieldBindings(setForm: Dispatch<SetStateAction<RecordFormState>>) {
  return {
    onAddressChange(value: string) {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, address: value, source: "manual" },
      }));
    },
    onAvoidChange(value: boolean) {
      setForm((prev) => ({
        ...prev,
        is_avoid: value,
      }));
    },
    onContentChange(value: string) {
      setForm((prev) => ({
        ...prev,
        content: value,
      }));
    },
    onLatitudeChange(value: string) {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, latitude: value, source: "manual" },
      }));
    },
    onLongitudeChange(value: string) {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, longitude: value, source: "manual" },
      }));
    },
    onOccurredAtChange(value: string) {
      setForm((prev) => ({
        ...prev,
        occurred_at: value,
      }));
    },
    onPlaceNameChange(value: string) {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, place_name: value, source: "manual" },
      }));
    },
    onRatingChange(value: string) {
      setForm((prev) => ({
        ...prev,
        rating: value,
      }));
    },
    onTitleChange(value: string) {
      setForm((prev) => ({
        ...prev,
        title: value,
      }));
    },
    onTypeCodeChange(value: string) {
      setForm((prev) => ({
        ...prev,
        type_code: value,
      }));
    },
  };
}

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
