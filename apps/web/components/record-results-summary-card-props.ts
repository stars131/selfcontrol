"use client";

import type { RecordItem } from "../lib/types";
import type { RecordSummaryCardProps } from "./record-summary-card.types";
import type { RecordResultsSharedCardProps } from "./record-results-view.types";

export function buildRecordSummaryCardProps(
  record: RecordItem,
  props: RecordResultsSharedCardProps,
): RecordSummaryCardProps {
  return {
    avoidLabel: props.avoidLabel,
    formatRecordSourceLabel: props.formatRecordSourceLabel,
    formatRecordStatusLabel: props.formatRecordStatusLabel,
    formatRecordTimestampLabel: props.formatRecordTimestampLabel,
    formatRecordTypeLabel: props.formatRecordTypeLabel,
    formatReviewStatusLabel: props.formatReviewStatusLabel,
    isSelected: record.id === props.selectedRecordId,
    mapPrefixLabel: props.mapPrefixLabel,
    noContentLabel: props.noContentLabel,
    onSelectRecord: props.onSelectRecord,
    ratingPrefixLabel: props.ratingPrefixLabel,
    record,
    unknownPlaceLabel: props.unknownPlaceLabel,
    untitledRecordLabel: props.untitledRecordLabel,
  };
}
