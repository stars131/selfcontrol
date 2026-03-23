"use client";

import { renderRecordSummaryCard } from "./record-results-shared";
import type { RecordResultsSharedCardProps, RecordResultsViewProps } from "./record-results-view.types";

type RecordResultsListViewProps = Pick<RecordResultsViewProps, "noRecordsLabel" | "records"> & {
  sharedCardProps: RecordResultsSharedCardProps;
};

export function RecordResultsListView({
  noRecordsLabel,
  records,
  sharedCardProps,
}: RecordResultsListViewProps) {
  return (
    <div style={{ marginTop: 20 }} className="record-list">
      {records.length ? (
        records.map((record) => renderRecordSummaryCard(record, sharedCardProps))
      ) : (
        <div className="notice">{noRecordsLabel}</div>
      )}
    </div>
  );
}
