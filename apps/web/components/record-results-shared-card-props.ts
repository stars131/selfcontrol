"use client";
import type { BuildRecordResultsSharedCardPropsInput } from "./record-results-shared-card-props.types";
import type { RecordResultsSharedCardProps } from "./record-results-view.types";
export function buildRecordResultsSharedCardProps({
  avoidLabel,
  formatRecordSourceLabel,
  formatRecordStatusLabel,
  formatRecordTimestampLabel,
  formatRecordTypeLabel,
  formatReviewStatusLabel,
  mapPrefixLabel,
  noContentLabel,
  onSelectRecord,
  ratingPrefixLabel,
  selectedRecordId,
  unknownPlaceLabel,
  untitledRecordLabel,
}: BuildRecordResultsSharedCardPropsInput): RecordResultsSharedCardProps {
  return {
    selectedRecordId,
    avoidLabel,
    mapPrefixLabel,
    noContentLabel,
    ratingPrefixLabel,
    unknownPlaceLabel,
    untitledRecordLabel,
    formatRecordSourceLabel,
    formatRecordStatusLabel,
    formatRecordTimestampLabel,
    formatRecordTypeLabel,
    formatReviewStatusLabel,
    onSelectRecord,
  };
}
