"use client";

import { buildRecordResultsSharedCardProps } from "./record-results-shared-card-props";
import { RecordResultsListView } from "./record-results-list-view";
import { RecordResultsTimelineView } from "./record-results-timeline-view";
import { RecordResultsViewSwitcher } from "./record-results-view-switcher";
import type { RecordResultsViewProps } from "./record-results-view.types";

export function RecordResultsView(props: RecordResultsViewProps) {
  const sharedCardProps = buildRecordResultsSharedCardProps(props);

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
