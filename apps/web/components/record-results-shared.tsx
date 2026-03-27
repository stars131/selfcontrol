"use client";

import { buildRecordSummaryCardProps } from "./record-results-summary-card-props";
import { RecordSummaryCard } from "./record-summary-card";
import type { RecordResultsSharedCardProps } from "./record-results-view.types";
import type { RecordItem } from "../lib/types";

export function renderRecordSummaryCard(record: RecordItem, props: RecordResultsSharedCardProps) {
  return <RecordSummaryCard key={record.id} {...buildRecordSummaryCardProps(record, props)} />;
}
