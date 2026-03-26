"use client";
import { MapPanel } from "./map-panel";
import { RecordResultsView } from "./record-results-view";
import { RecordSearchPanel } from "./record-search-panel";
import type { RecordBrowseWorkspaceProps } from "./record-browse-workspace.types";
import type { MapPanelProps } from "./map-panel.types";
import type { RecordResultsViewProps } from "./record-results-view.types";
import type { RecordSearchPanelProps } from "./record-search-panel.types";

export function buildRecordSearchPanelProps(
  props: RecordBrowseWorkspaceProps,
): RecordSearchPanelProps {
  return {
    panelCopy: props.panelCopy,
    canWriteWorkspace: props.canWriteWorkspace,
    filteringRecords: props.filteringRecords,
    savingSearchPreset: props.savingSearchPreset,
    filterDraft: props.filterDraft,
    presetName: props.presetName,
    currentFilterSummary: props.currentFilterSummary,
    onQueryChange: (value) =>
      props.setFilterDraft((current) => ({
        ...current,
        query: value,
      })),
    onTypeCodeChange: (value) =>
      props.setFilterDraft((current) => ({
        ...current,
        typeCode: value,
      })),
    onAvoidOnlyChange: (value) =>
      props.setFilterDraft((current) => ({
        ...current,
        avoidOnly: value,
      })),
    onPresetNameChange: props.setPresetName,
    onApplyFilter: props.onApplyFilter,
    onResetFilter: props.onResetFilter,
    onSavePreset: props.onSavePreset,
  };
}

export function buildMapPanelProps(props: RecordBrowseWorkspaceProps): MapPanelProps {
  return {
    records: props.records,
    selectedRecordId: props.selectedRecordId,
    onSelectRecord: props.onSelectRecord,
    filteringRecords: props.filteringRecords,
    locationFilter: props.recordFilter,
    onApplyLocationFilter: props.onApplyLocationFilter,
    draftLocation: props.draftLocation,
    onDraftLocationChange: props.onDraftLocationChange,
  };
}

export function buildRecordResultsViewProps(
  props: RecordBrowseWorkspaceProps,
): RecordResultsViewProps {
  return {
    avoidLabel: props.avoidRecordLabel,
    flatListViewLabel: props.flatListViewLabel,
    formatAvoidCountLabel: props.formatAvoidCountLabel,
    formatRecordSourceLabel: props.formatRecordSourceLabel,
    formatRecordStatusLabel: props.formatRecordStatusLabel,
    formatRecordTimestampLabel: props.formatRecordTimestampLabel,
    formatRecordTypeLabel: props.formatRecordTypeLabel,
    formatReviewStatusLabel: props.formatReviewStatusLabel,
    formatTimelineCountLabel: props.formatTimelineCountLabel,
    formatTimelineDateLabel: props.formatTimelineDateLabel,
    mapPrefixLabel: props.mapPrefixLabel,
    noContentLabel: props.noContentLabel,
    noRecordsLabel: props.noRecordsLabel,
    onSelectRecord: props.onSelectRecord,
    onViewModeChange: props.setViewMode,
    ratingPrefixLabel: props.ratingPrefixLabel,
    records: props.records,
    selectedRecordId: props.selectedRecordId,
    timelineDayLabel: props.timelineDayLabel,
    timelineDays: props.timelineDays,
    timelineViewLabel: props.timelineViewLabel,
    unknownPlaceLabel: props.unknownPlaceLabel,
    untitledRecordLabel: props.untitledRecordLabel,
    viewMode: props.viewMode,
  };
}
