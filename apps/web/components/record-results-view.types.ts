"use client";

import type { RecordItem, TimelineDay } from "../lib/types";

export type RecordResultsViewProps = {
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
  formatRecordSourceLabel: (value?: string | null) => string;
  formatRecordStatusLabel: (value?: string | null) => string;
  formatRecordTimestampLabel: (record: RecordItem) => string;
  formatRecordTypeLabel: (value?: string | null) => string;
  formatReviewStatusLabel: (value?: string | null) => string;
  formatTimelineDateLabel: (value: string) => string;
  formatTimelineCountLabel: (count: number) => string;
  formatAvoidCountLabel: (count: number) => string;
};

export type RecordResultsSharedCardProps = Pick<
  RecordResultsViewProps,
  | "selectedRecordId"
  | "avoidLabel"
  | "mapPrefixLabel"
  | "noContentLabel"
  | "ratingPrefixLabel"
  | "unknownPlaceLabel"
  | "untitledRecordLabel"
  | "formatRecordSourceLabel"
  | "formatRecordStatusLabel"
  | "formatRecordTimestampLabel"
  | "formatRecordTypeLabel"
  | "formatReviewStatusLabel"
  | "onSelectRecord"
>;
