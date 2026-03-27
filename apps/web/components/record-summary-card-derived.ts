"use client";

import { readLocationReview } from "../lib/location";
import { readLocationForm } from "../lib/record-panel-forms";
import type { BuildRecordSummaryCardDerivedStateInput } from "./record-summary-card-derived.types";

export function buildRecordSummaryCardDerivedState({
  formatReviewStatusLabel,
  mapPrefixLabel,
  record,
  unknownPlaceLabel,
}: BuildRecordSummaryCardDerivedStateInput) {
  const location = readLocationForm(record);
  const review = readLocationReview(record.extra_data);
  return {
    locationAddressSuffix: location.address ? ` | ${location.address}` : "",
    locationLabel: location.place_name || unknownPlaceLabel,
    mapStatusLabel:
      location.latitude && location.longitude
        ? `${mapPrefixLabel} ${formatReviewStatusLabel(review?.status)}`
        : null,
    showLocation: Boolean(location.place_name || location.address),
  };
}
