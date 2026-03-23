"use client";

import { RecordResultsListView } from "./record-results-list-view";
import { RecordResultsTimelineView } from "./record-results-timeline-view";
import { RecordResultsViewSwitcher } from "./record-results-view-switcher";
import type { RecordResultsViewProps } from "./record-results-view.types";

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
      <RecordResultsViewSwitcher
        flatListViewLabel={props.flatListViewLabel}
        onViewModeChange={props.onViewModeChange}
        timelineViewLabel={props.timelineViewLabel}
        viewMode={props.viewMode}
      />
      {props.viewMode === "timeline" ? (
        <RecordResultsTimelineView
          formatAvoidCountLabel={props.formatAvoidCountLabel}
          formatTimelineCountLabel={props.formatTimelineCountLabel}
          formatTimelineDateLabel={props.formatTimelineDateLabel}
          noRecordsLabel={props.noRecordsLabel}
          sharedCardProps={sharedCardProps}
          timelineDayLabel={props.timelineDayLabel}
          timelineDays={props.timelineDays}
        />
      ) : (
        <RecordResultsListView
          noRecordsLabel={props.noRecordsLabel}
          records={props.records}
          sharedCardProps={sharedCardProps}
        />
      )}
    </>
  );
}
