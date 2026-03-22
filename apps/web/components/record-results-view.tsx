"use client";

import { RecordSummaryCard } from "./record-summary-card";
import type { RecordItem, TimelineDay } from "../lib/types";

type RecordResultsViewProps = {
  records: RecordItem[];
  timelineDays: TimelineDay[];
  selectedRecordId: string | null;
  viewMode: "timeline" | "list";
  onSelectRecord: (recordId: string) => void;
  onViewModeChange: (mode: "timeline" | "list") => void;
  timelineViewLabel: string;
  flatListViewLabel: string;
  timelineDayLabel: string;
  noRecordsLabel: string;
  avoidLabel: string;
  mapPrefixLabel: string;
  noContentLabel: string;
  ratingPrefixLabel: string;
  unknownPlaceLabel: string;
  untitledRecordLabel: string;
  formatRecordTimestampLabel: (record: RecordItem) => string;
  formatReviewStatusLabel: (value?: string | null) => string;
  formatTimelineDateLabel: (value: string) => string;
  formatTimelineCountLabel: (count: number) => string;
  formatAvoidCountLabel: (count: number) => string;
};

function renderRecordCard(
  record: RecordItem,
  props: Pick<
    RecordResultsViewProps,
    | "selectedRecordId"
    | "avoidLabel"
    | "mapPrefixLabel"
    | "noContentLabel"
    | "ratingPrefixLabel"
    | "unknownPlaceLabel"
    | "untitledRecordLabel"
    | "formatRecordTimestampLabel"
    | "formatReviewStatusLabel"
    | "onSelectRecord"
  >,
) {
  return (
    <RecordSummaryCard
      avoidLabel={props.avoidLabel}
      formatRecordTimestampLabel={props.formatRecordTimestampLabel}
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

export function RecordResultsView(props: RecordResultsViewProps) {
  const sharedCardProps = {
    selectedRecordId: props.selectedRecordId,
    avoidLabel: props.avoidLabel,
    mapPrefixLabel: props.mapPrefixLabel,
    noContentLabel: props.noContentLabel,
    ratingPrefixLabel: props.ratingPrefixLabel,
    unknownPlaceLabel: props.unknownPlaceLabel,
    untitledRecordLabel: props.untitledRecordLabel,
    formatRecordTimestampLabel: props.formatRecordTimestampLabel,
    formatReviewStatusLabel: props.formatReviewStatusLabel,
    onSelectRecord: props.onSelectRecord,
  };

  return (
    <>
      <div style={{ marginTop: 20 }} className="action-row">
        <button
          className={props.viewMode === "timeline" ? "button" : "button secondary"}
          type="button"
          onClick={() => props.onViewModeChange("timeline")}
        >
          {props.timelineViewLabel}
        </button>
        <button
          className={props.viewMode === "list" ? "button" : "button secondary"}
          type="button"
          onClick={() => props.onViewModeChange("list")}
        >
          {props.flatListViewLabel}
        </button>
      </div>

      {props.viewMode === "timeline" ? (
        <div style={{ marginTop: 20 }} className="record-list">
          {props.timelineDays.length ? (
            props.timelineDays.map((day) => (
              <section className="record-card" key={day.date}>
                <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="eyebrow">{props.timelineDayLabel}</div>
                    <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{props.formatTimelineDateLabel(day.date)}</h3>
                    <div className="muted">{props.formatTimelineCountLabel(day.count)}</div>
                  </div>
                  <div className="tag-row" style={{ marginTop: 0, justifyContent: "flex-end" }}>
                    <span className="tag">{day.date}</span>
                    {day.avoid_count ? <span className="tag">{props.formatAvoidCountLabel(day.avoid_count)}</span> : null}
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
                  {day.items.map((record) => renderRecordCard(record, sharedCardProps))}
                </div>
              </section>
            ))
          ) : (
            <div className="notice">{props.noRecordsLabel}</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: 20 }} className="record-list">
          {props.records.length ? (
            props.records.map((record) => renderRecordCard(record, sharedCardProps))
          ) : (
            <div className="notice">{props.noRecordsLabel}</div>
          )}
        </div>
      )}
    </>
  );
}
