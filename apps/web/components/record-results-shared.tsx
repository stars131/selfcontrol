"use client";

import { RecordSummaryCard } from "./record-summary-card";
import type { RecordResultsSharedCardProps } from "./record-results-view.types";
import type { RecordItem } from "../lib/types";

export function renderRecordSummaryCard(record: RecordItem, props: RecordResultsSharedCardProps) {
  return (
    <RecordSummaryCard
      avoidLabel={props.avoidLabel}
      formatRecordSourceLabel={props.formatRecordSourceLabel}
      formatRecordStatusLabel={props.formatRecordStatusLabel}
      formatRecordTimestampLabel={props.formatRecordTimestampLabel}
      formatRecordTypeLabel={props.formatRecordTypeLabel}
      formatReviewStatusLabel={props.formatReviewStatusLabel}
      isSelected={record.id === props.selectedRecordId}
      key={record.id}
      mapPrefixLabel={props.mapPrefixLabel}
      noContentLabel={props.noContentLabel}
      onSelectRecord={props.onSelectRecord}
      ratingPrefixLabel={props.ratingPrefixLabel}
      record={record}
      unknownPlaceLabel={props.unknownPlaceLabel}
      untitledRecordLabel={props.untitledRecordLabel}
    />
  );
}
