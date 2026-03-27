"use client";

import { RecordResultsTimelineDay } from "./record-results-timeline-day";
import type { RecordResultsTimelineViewProps } from "./record-results-timeline-view.types";

export function RecordResultsTimelineView({
  formatAvoidCountLabel,
  formatTimelineCountLabel,
  formatTimelineDateLabel,
  noRecordsLabel,
  sharedCardProps,
  timelineDayLabel,
  timelineDays,
}: RecordResultsTimelineViewProps) {
  return (
    <div style={{ marginTop: 20 }} className="record-list">
      {timelineDays.length ? (
        timelineDays.map((day) => (
          <RecordResultsTimelineDay
            day={day}
            formatAvoidCountLabel={formatAvoidCountLabel}
            formatTimelineCountLabel={formatTimelineCountLabel}
            formatTimelineDateLabel={formatTimelineDateLabel}
            key={day.date}
            sharedCardProps={sharedCardProps}
            timelineDayLabel={timelineDayLabel}
          />
        ))
      ) : (
        <div className="notice">{noRecordsLabel}</div>
      )}
    </div>
  );
}
