"use client";

import { renderRecordSummaryCard } from "./record-results-shared";
import type { RecordResultsSharedCardProps, RecordResultsViewProps } from "./record-results-view.types";

type RecordResultsTimelineViewProps = Pick<
  RecordResultsViewProps,
  | "formatAvoidCountLabel"
  | "formatTimelineCountLabel"
  | "formatTimelineDateLabel"
  | "noRecordsLabel"
  | "timelineDayLabel"
  | "timelineDays"
> & {
  sharedCardProps: RecordResultsSharedCardProps;
};

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
          <section className="record-card" key={day.date}>
            <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="eyebrow">{timelineDayLabel}</div>
                <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{formatTimelineDateLabel(day.date)}</h3>
                <div className="muted">{formatTimelineCountLabel(day.count)}</div>
              </div>
              <div className="tag-row" style={{ marginTop: 0, justifyContent: "flex-end" }}>
                <span className="tag">{day.date}</span>
                {day.avoid_count ? <span className="tag">{formatAvoidCountLabel(day.avoid_count)}</span> : null}
              </div>
            </div>
            {day.top_places.length ? (
              <div className="tag-row" style={{ marginTop: 14 }}>
                {day.top_places.map((place) => (
                  <span className="tag" key={place}>
                    {place}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="record-list compact-list" style={{ marginTop: 14 }}>
              {day.items.map((record) => renderRecordSummaryCard(record, sharedCardProps))}
            </div>
          </section>
        ))
      ) : (
        <div className="notice">{noRecordsLabel}</div>
      )}
    </div>
  );
}
